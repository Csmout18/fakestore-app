import { useState, useEffect } from 'react';
import { Container, Carousel, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function HomePage() {
    const [products, setProducts] = useState([])

     useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => setProducts(response.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <Container className="mt-5 text-center border p-5 bg-dark text-white">
            <Row>
                <h3> Hello, and Welcome to my Fake Store API Website!</h3>
                <p> This app is designed to allow users to view, create, update, and delete products dynamically using API calls.
                    This app is built with React, React Router, and Bootstrap for styling. Enjoy!
                </p>
            </Row>

            <Row>
                <Col>
                    <Carousel>
                        {products.slice(0, 3).map(product => (
                            <Carousel.Item key={product.id}>
                                <img
                                    className="d-block w-100"
                                    src={product.image}
                                    alt={product.title}
                                    style={{ maxHeight: '300px', objectFit: 'contain' }}
                                />
                                <Carousel.Caption style={{ textShadow: '2px 2px black' }}>
                                    <h3>{product.title}</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;