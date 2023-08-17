import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEnhancementRequests, voteForEnhancementRequest, createEnhancementRequest } from '../API/API_Services';
import CommentSection from './comment';
import { Button, Modal, Form } from 'react-bootstrap';

const EnhancementRequestList = () => {
  const [enhancementRequests, setEnhancementRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRequestTitle, setNewRequestTitle] = useState('');
  const [newRequestDescription, setNewRequestDescription] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    try {
      fetchEnhancementRequests()
        .then(data => setEnhancementRequests(data))
        .catch(error => console.error('Error fetching enhancement requests:', error));
    } catch (error) {
      console.error('Error fetching enhancement requests:', error);
    }
  }, []);

  const handleVote = async (enhancementRequestId) => {
    try {
      const token = localStorage.getItem('access_token');
      await voteForEnhancementRequest(enhancementRequestId, token);
      fetchEnhancementRequests()
        .then(data => setEnhancementRequests(data))
        .catch(error => console.error('Error fetching enhancement requests:', error));
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const handleCreateEnhancementRequest = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await createEnhancementRequest(newRequestTitle, newRequestDescription, token);
      setShowModal(false);
      fetchEnhancementRequests()
        .then(data => setEnhancementRequests(data))
        .catch(error => console.error('Error fetching enhancement requests:', error));
    } catch (error) {
      console.error('Error creating enhancement request:', error);
    }
  };

  return (
    <div className=''>
      <h1>Enhancement Requests</h1>
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

      <div className='d-flex justify-content-center align-items-center'>
        {enhancementRequests.map(request => (
          <div key={request.id}>
            <h2>{request.title}</h2>
            <p>{request.description}</p>
            <p>Votes: {request.votes}</p>
            <button onClick={() => handleVote(request.id)}>Vote</button>
            <CommentSection enhancementRequestId={request.id} />

            <div>
              <h3>Comments of the Users:</h3>
              {request.comments.map(comment => (
                <div key={comment.id}>
                  <p>{comment.content}</p>
                  <p>Posted by: {comment.username}</p>
                  <p>Created at: {comment.created_at}</p>
                  <hr />
                </div>
              ))}
            </div>

            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnhancementRequestList;
