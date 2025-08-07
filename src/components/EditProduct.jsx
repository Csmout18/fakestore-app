import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function EditProduct() {
  const { productId } = useParams(); // Get product ID from URL
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: ''
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Fetch existing product data on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`); 
        console.log(response.data);
        // Set form data with fetched product details
        setFormData({
          title: response.data.title,
          price: response.data.price,
          description: response.data.description,
          category: response.data.category
        });
      } catch (error) {
        setError(`Failed to fetch product data. ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission (PUT request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.put(`https://fakestoreapi.com/products/${productId}`, formData);
      setSuccess('Product updated successfully!');
    } catch (error) {
      setError(`Failed to update product. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Edit Product</h2>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="title" label="Product Title" className="mb-3">
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="price" label="Price" className="mb-3">
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </FloatingLabel>
          <FloatingLabel controlId="description" label="Description" className="mb-3">
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ height: '100px' }}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="category" label="Category" className="mb-3">
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <Row>
            <Col className="d-grid">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Product'}
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Container>
  );
}

export default EditProduct;