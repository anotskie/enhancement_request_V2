import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "../../../App.css";


function ModalComponent({
    show, 
    onClose,
  handleCreateArticle,
  editArticle,
  setArticles,
  articles,
}) {
 
  

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
         Text
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <Form >
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"

            />
          </Form.Group>
          <Form.Group className="mt-2" controlId="content">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter description"

            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="mt-2 d-flex justify-content-end"
          type="submit"
        >
            Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;