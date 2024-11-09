import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Card, Alert, InputGroup, Container } from "react-bootstrap";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [low, setLow] = useState("");
  const [normal, setNormal] = useState("");
  const [high, setHigh] = useState("");
  const [search, setSearch] = useState("");

  // Load items from localStorage on component mount
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(savedItems);
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleAddClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSave = () => {
    if (name && low && normal && high) {
      const newItem = { name, low, normal, high };
      setItems([...items, newItem]);
      setName("");
      setLow("");
      setNormal("");
      setHigh("");
      setShowModal(false);
    } else {
      alert("Please fill all fields.");
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <h2>Item Manager</h2>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="primary" onClick={handleAddClick}>
          Add
        </Button>
      </InputGroup>

      <div>
        {filteredItems.map((item, index) => (
          <Card className="mb-2" key={index}>
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>Low Range: {item.low}</Card.Text>
              <Card.Text>Normal Range: {item.normal}</Card.Text>
              <Card.Text>High Range: {item.high}</Card.Text>
              <Button variant="danger" onClick={() => handleDelete(index)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
        {filteredItems.length === 0 && <Alert variant="info">No items found.</Alert>}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Low Range</Form.Label>
              <Form.Control
                type="number"
                value={low}
                onChange={(e) => setLow(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Normal Range</Form.Label>
              <Form.Control
                type="number"
                value={normal}
                onChange={(e) => setNormal(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>High Range</Form.Label>
              <Form.Control
                type="number"
                value={high}
                onChange={(e) => setHigh(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default App;

