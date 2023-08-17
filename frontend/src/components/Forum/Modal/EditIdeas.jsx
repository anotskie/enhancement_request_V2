import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "../../../App.css";




function ModalComponentEdit({
    showEdit, handleCloseEdit, editArticle, article
}) {

    const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setContent(article.content);
    }
  }, [article]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Call the editArticle function here with the updated title and content
    editArticle(article.id, title, content);
    handleCloseEdit();
  };

  return (
    <Modal show={showEdit} onHide={handleCloseEdit}>
    {/* Modal content */}
    <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
    </Modal.Header>
  
    <Modal.Body>

            <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={title} onChange={handleTitleChange} />
            </Form.Group>
            <Form.Group controlId="content">
                <Form.Label>Description</Form.Label>
                <Form.Control
                as="textarea"
                rows={4}
                value={content}
                onChange={handleContentChange}
                />
            </Form.Group>
            
            </Form>

    </Modal.Body>
    <Modal.Footer>

    <Button type="submit">Save Changes</Button>

    </Modal.Footer>
    
  </Modal>
  );
}

export default ModalComponentEdit;