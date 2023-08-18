import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "../../../App.css";
import { createEnhancementRequest, fetchEnhancementRequests } from "../../../API/API_Services";

function ModalComponent({
  setRefreshed,
  refreshed,
  show,
  onClose
}) {

  const [showModal, setShowModal] = useState(false);
  const [newRequestTitle, setNewRequestTitle] = useState('');
  const [newRequestDescription, setNewRequestDescription] = useState('');

  const handleCreateEnhancementRequest = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await createEnhancementRequest(newRequestTitle, newRequestDescription, token);
      setShowModal(false);
      setRefreshed(!refreshed)
      
    } catch (error) {
      console.error('Error creating enhancement request:', error);
    }
  };

  return (
    <div>
    <Button className='mb-5' onClick={() => setShowModal(true)}>Add Enhancement Request</Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Enhancement Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newRequestTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newRequestTitle}
                onChange={(e) => setNewRequestTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="newRequestDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newRequestDescription}
                onChange={(e) => setNewRequestDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleCreateEnhancementRequest}>Create</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalComponent;