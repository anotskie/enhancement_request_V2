import React, { useState, useEffect } from 'react';
import { fetchEnhancementRequests, voteForEnhancementRequest } from '../API/API_Services';

const EnhancementRequestList = () => {
  const [enhancementRequests, setEnhancementRequests] = useState([]);

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
          <button onClick={() => handleVote(request.id)}>Vote</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default EnhancementRequestList;
