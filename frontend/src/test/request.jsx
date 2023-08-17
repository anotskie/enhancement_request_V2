import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEnhancementRequests, voteForEnhancementRequest, createComment } from '../API/API_Services'; // Import createComment
import CommentSection from './comment';

const EnhancementRequestList = () => {
  const [enhancementRequests, setEnhancementRequests] = useState([]);
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
      // Update the enhancement requests after voting
      fetchEnhancementRequests()
        .then(data => setEnhancementRequests(data))
        .catch(error => console.error('Error fetching enhancement requests:', error));
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div>
      <h1>Enhancement Requests</h1>
      {enhancementRequests.map(request => (
        <div key={request.id}>
          <h2>{request.title}</h2>
          <p>{request.description}</p>
          <p>Votes: {request.votes}</p>
          <button onClick={() => handleVote(request.id)}>Vote</button>
          <CommentSection enhancementRequestId={request.id} />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default EnhancementRequestList;
