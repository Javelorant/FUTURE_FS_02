import axios from 'axios';

const API_URL = '/api';

// Add token to all requests
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Contact API calls
export const contactAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/contacts`, {
      headers: getAuthHeader()
    });
    return response.data.data;
  },
  
  create: async (contactData) => {
    const response = await axios.post(`${API_URL}/contacts`, contactData, {
      headers: getAuthHeader()
    });
    return response.data.data;
  },
  
  update: async (id, contactData) => {
    const response = await axios.put(`${API_URL}/contacts/${id}`, contactData, {
      headers: getAuthHeader()
    });
    return response.data.data;
  },
  
  delete: async (id) => {
    await axios.delete(`${API_URL}/contacts/${id}`, {
      headers: getAuthHeader()
    });
  }
};

// Deal API calls
export const dealAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/deals`, {
      headers: getAuthHeader()
    });
    return response.data.data;
  },
  
  create: async (dealData) => {
    const response = await axios.post(`${API_URL}/deals`, dealData, {
      headers: getAuthHeader()
    });
    return response.data.data;
  },
  
  update: async (id, dealData) => {
    const response = await axios.put(`${API_URL}/deals/${id}`, dealData, {
      headers: getAuthHeader()
    });
    return response.data.data;
  },
  
  delete: async (id) => {
    await axios.delete(`${API_URL}/deals/${id}`, {
      headers: getAuthHeader()
    });
  }
};

// Activity API calls
export const activityAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/activities`, {
      headers: getAuthHeader()
    });
    return response.data.data;
  },
  
  create: async (activityData) => {
    const response = await axios.post(`${API_URL}/activities`, activityData, {
      headers: getAuthHeader()
    });
    return response.data.data;
  },
  
  update: async (id, activityData) => {
    const response = await axios.put(`${API_URL}/activities/${id}`, activityData, {
      headers: getAuthHeader()
    });
    return response.data.data;
  },
  
  delete: async (id) => {
    await axios.delete(`${API_URL}/activities/${id}`, {
      headers: getAuthHeader()
    });
  }
};