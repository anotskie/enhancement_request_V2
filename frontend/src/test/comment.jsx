import React, { useState } from 'react';
import { createComment } from '../API/API_Services';

const CommentSection = ({ enhancementRequestId }) => {
  const [content, setContent] = useState('');
  const userId = localStorage.getItem('user_id'); // Get the user ID from local storage

  const handleCommentSubmit = async () => {
    if (!userId) {
      console.error('User ID not available. Please log in.');
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      await createComment(enhancementRequestId, content, userId, token);

      // Clear the comment input and refresh enhancement requests
      setContent('');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
      />
      <button onClick={handleCommentSubmit}>Submit Comment</button>
    </div>
  );
};

export default CommentSection;
