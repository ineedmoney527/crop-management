import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap"; // You need to install react-bootstrap

const AddEvent = ({ show, handleClose, handleAddEvent, initialDate }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(initialDate); // Set the initial date when the modal is shown
  }, [initialDate]);

  const handleSave = () => {
    const newEvent = { title, start: new Date(date), allDay: true };
    handleAddEvent(newEvent);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEvent;
