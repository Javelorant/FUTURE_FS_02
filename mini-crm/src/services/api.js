import axios from 'axios';

const API_URL = '/api';

// Helper to get config with JWT token
const getConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
};

// Contact API calls
export const contactAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/contacts`, getConfig());
    return response.data.data;
  },

  create: async (contactData) => {
    const response = await axios.post(`${API_URL}/contacts`, contactData, getConfig());
    return response.data.data;
  },

  update: async (id, contactData) => {
    const response = await axios.put(`${API_URL}/contacts/${id}`, contactData, getConfig());
    return response.data.data;
  },

  delete: async (id) => {
    await axios.delete(`${API_URL}/contacts/${id}`, getConfig());
  }
};

// Deal API calls
export const dealAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/deals`, getConfig());
    return response.data.data;
  },

  create: async (dealData) => {
    const response = await axios.post(`${API_URL}/deals`, dealData, getConfig());
    return response.data.data;
  },

  update: async (id, dealData) => {
    const response = await axios.put(`${API_URL}/deals/${id}`, dealData, getConfig());
    return response.data.data;
  },

  delete: async (id) => {
    await axios.delete(`${API_URL}/deals/${id}`, getConfig());
  }
};

// Activity API calls
export const activityAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/activities`, getConfig());
    return response.data.data;
  },

  create: async (activityData) => {
    const response = await axios.post(`${API_URL}/activities`, activityData, getConfig());
    return response.data.data;
  },

  update: async (id, activityData) => {
    const response = await axios.put(`${API_URL}/activities/${id}`, activityData, getConfig());
    return response.data.data;
  },

  delete: async (id) => {
    await axios.delete(`${API_URL}/activities/${id}`, getConfig());
  }
};
