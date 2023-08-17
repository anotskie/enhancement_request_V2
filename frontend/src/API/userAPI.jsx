import axios from 'axios';

const ApiService = {
  login: async (username, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', { username, password });
      const { access_token, user_id, name } = response.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user_id', user_id); // Store the user ID in local storage
      localStorage.setItem('name', username); // Store the user ID in local storage
      return access_token;
    } catch (error) {
      throw error;
    }
  },

  register: async (username, password, email) => {
    try {
      await axios.post('http://127.0.0.1:8000/users/', { username, password, email });
    } catch (error) {
      throw error;
    }
  },

  logout: async (refreshToken) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/logout/', { refresh_token: refreshToken });
      return response.data.message;
    } catch (error) {
      throw error;
    }
  }
};

export default ApiService;
