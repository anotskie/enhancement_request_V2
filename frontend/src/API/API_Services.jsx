import axios from 'axios';
export const createEnhancementRequest = async (title, description, token) => {
    const requestData = {
      title,
      description,
    };
  
    const response = await fetch('http://127.0.0.1:8000/enhancement-requests/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });
  
    if (!response.ok) {
      throw new Error('Error creating request');
    }
  
    return response.json();
  };
  
  export const createComment = async (enhancementRequestId, content, userId, token) => {
    const requestData = {
      enhancement_request: enhancementRequestId,
      user: userId, // Use the provided userId
      content,
    };
  
    const response = await fetch(`http://127.0.0.1:8000/enhancement-requests/${enhancementRequestId}/comments/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });
  
    if (!response.ok) {
      throw new Error('Error creating comment');
    }
  
    const responseData = await response.json();
  
    // Fetch the username associated with the user ID in the comment
    const username = await fetchUsername(userId);
  
    return {
      ...responseData,
      username,
    };
  };
  
  const fetchUsername = async (userId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/users/${userId}/`);
      return response.data.username; // Assuming 'username' is the field for the username in user model
    } catch (error) {
      throw error;
    }
  };
  
  
  
  
  export const voteForEnhancementRequest = async (enhancementRequestId, token) => {
    const response = await fetch(`http://127.0.0.1:8000/enhancement-requests/${enhancementRequestId}/vote/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Error voting');
    }
  
    return response.json();
  };
  
  export const fetchEnhancementRequests = async () => {
    const response = await fetch('http://127.0.0.1:8000/enhancement-requests/');
  
    if (!response.ok) {
      throw new Error('Error fetching enhancement requests');
    }
  
    return response.json();
  };
  
  export const fetchCommentsForEnhancementRequest = async (enhancementRequestId, token) => {
    const response = await fetch(`http://127.0.0.1:8000/enhancement-requests/${enhancementRequestId}/comments/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Error fetching comments');
    }
  
    return response.json();
  };