import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "../../../App.css";
import { editEnhancementRequest } from "../../../API/API_Services";
import axios from "axios";

function ModalComponentEdit({
  showEdit,
  handleCloseEdit,
  article,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

    useEffect(() => {
    if (article) {
      setTitle(article.title);
      setDescription(article.description); 
      console.log(article)
    }
  }, [article]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

 const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        owner: article.owner,
        title: title,
        description: description, 
      };

      const token = localStorage.getItem("access_token"); 
      await editEnhancementRequest(article.id, requestData, token);

      handleCloseEdit();
    } catch (error) {
      console.error("Error editing request:", error);
    }
  };

  return (
    <Modal show={showEdit} onHide={handleCloseEdit}>
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEditSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseEdit}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleEditSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponentEdit;
