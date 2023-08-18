import React, { useState } from 'react';
import { createComment } from '../API/API_Services';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const CommentSection = ({ enhancementRequestId }) => {
  const [content, setContent] = useState('');
  const userId = localStorage.getItem('user_id');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCommentSubmit = async () => {
    if (!userId) {
      console.error('User ID not available. Please log in.');
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      await createComment(enhancementRequestId, content, userId, token);
      setContent('');
    } catch (error) {




      console.error('Error creating comment:', error);
    }
  };

  return (
      <Row>
        <Col>
          <h3>Comments</h3>
          <Form.Group controlId="commentTextarea">
            <Form.Control
              as="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a comment..."
              
              rows={4}
            />
          </Form.Group>

          

          <Button className='d-flex justify-content-end mt-2' variant="primary" onClick={handleCommentSubmit}>
            Submit Comment
          </Button>
        </Col>
      </Row>
  );
};

export default CommentSection;
