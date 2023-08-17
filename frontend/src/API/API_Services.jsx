export const createEnhancementRequest = async (title, description, token) => {
    const requestData = {
      title,
      description,
    };
  
    const response = await fetch('/api/enhancement-requests/', {
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
  
  export const createComment = async (enhancementRequestId, content, token) => {
    const requestData = {
      content,
    };
  
    const response = await fetch(`/api/enhancement-requests/${enhancementRequestId}/comments/create/`, {
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
  
    return response.json();
  };
  
  export const voteForEnhancementRequest = async (enhancementRequestId, token) => {
    const response = await fetch(`/api/enhancement-requests/${enhancementRequestId}/vote/`, {
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
    const response = await fetch('/api/enhancement-requests/');
  
    if (!response.ok) {
      throw new Error('Error fetching enhancement requests');
    }
  
    return response.json();
  };
  