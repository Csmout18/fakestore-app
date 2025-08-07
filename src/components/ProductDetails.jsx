import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        setError(`Failed to fetch product details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <p>{error}</p>;

  const handleDelete = async () => {
    try {
        await axios.delete(`https://fakestoreapi.com/products/${productId}`);
        alert('Product deleted successfully');
    } catch (error) {
        alert(`Failed to delete product: ${error.message}`);
  }}


if (loading) return <Spinner animation="border" />;
if (error) return <p>{error}</p>;
if (!product) return null; // Prevent rendering before product is loaded

  return (
    <Container>
         <img 
        src={product.image} 
        alt={product.title} 
        style={{ maxWidth: '200px', marginBottom: '1rem' }} 
      />
      <ListGroup className="mt-4" as="ul">
        <ListGroup.Item as="li">Description: {product.description}</ListGroup.Item>
        <ListGroup.Item as="li">Price: ${product.price}</ListGroup.Item>
        <ListGroup.Item as="li">Category: {product.category}</ListGroup.Item>
      </ListGroup> 
      <Button variant="danger" onClick={handleDelete}>Delete Product</Button> 
    </Container>
  );
}

export default ProductDetails;