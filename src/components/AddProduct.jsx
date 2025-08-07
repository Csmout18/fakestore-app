import { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AddProduct() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setConfirmation('');
    try {
      await axios.post('https://fakestoreapi.com/products', {
        title: formData.title,
        price: formData.price,
        description: formData.description,
        category: formData.category
      });
      setConfirmation('Product created successfully!');
      setFormData({
        title: '',
        price: '',
        description: '',
        category: ''
      });
    } catch (error) {
      setError(`Failed to create product: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Add Product</h2>
      {confirmation && <Alert variant="success">{confirmation}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="title" label="Product Title" className="mb-3">
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="price" label="Price" className="mb-3">
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
            min="0"
            step="1.00"
          />
        </FloatingLabel>
        <FloatingLabel controlId="description" label="Description" className="mb-3">
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
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
            placeholder="Enter category"
            required
          />
        </FloatingLabel>
        <Row>
          <Col className="d-grid">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Add Product'}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default AddProduct;