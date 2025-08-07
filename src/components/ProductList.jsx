import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
       axios.get('https://fakestoreapi.com/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            })
        }, []);

    if (loading) {
        return (
            <Container>
                <h3>
             <Spinner animation="border" variant="info" style={{ marginRight: '15px' }} role="status"/>
             Loading Products...
                </h3>
            </Container>
        )
    }

    if (error) return <p>{error}</p>;

    return (
    <Container>
    <h3>Product List</h3>
    <Row>
      {products.map(product => (
        <Col key={product.id} className="mt-4">
          <Card style={{ width: '18rem' }}>
            <Card.Img
              variant="top"
              src={product.image}
              alt={product.title}
              style={{ height: '200px', objectFit: 'contain', padding: '1rem' }}
            />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                <strong>Price:</strong> ${product.price}
              </Card.Text>
              <Link to={`/products/${product.id}`}>
                <Button variant="primary m-2">View Details</Button>
              </Link>
              <Link to={`/edit-product/${product.id}`}>
                <Button variant="warning m-2">Edit</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        ))}
        </Row>
    </Container>

    );
}

export default ProductList;