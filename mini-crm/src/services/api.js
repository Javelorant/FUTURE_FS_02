import axios from 'axios';

const API_URL = '/api';

// Contact API calls
export const contactAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/contacts`);
    return response.data.data;
  },
  
  create: async (contactData) => {
    const response = await axios.post(`${API_URL}/contacts`, contactData);
    return response.data.data;
  },
  
  update: async (id, contactData) => {
    const response = await axios.put(`${API_URL}/contacts/${id}`, contactData);
    return response.data.data;
  },
  
  delete: async (id) => {
    await axios.delete(`${API_URL}/contacts/${id}`);
  }
};

// Deal API calls
export const dealAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/deals`);
    return response.data.data;
  },
  
  create: async (dealData) => {
    const response = await axios.post(`${API_URL}/deals`, dealData);
    return response.data.data;
  },
  
  update: async (id, dealData) => {
    const response = await axios.put(`${API_URL}/deals/${id}`, dealData);
    return response.data.data;
  },
  
  delete: async (id) => {
    await axios.delete(`${API_URL}/deals/${id}`);
  }
};

// Activity API calls
export const activityAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/activities`);
    return response.data.data;
  },
  
  create: async (activityData) => {
    const response = await axios.post(`${API_URL}/activities`, activityData);
    return response.data.data;
  },
  
  update: async (id, activityData) => {
    const response = await axios.put(`${API_URL}/activities/${id}`, activityData);
    return response.data.data;
  },
  
  delete: async (id) => {
    await axios.delete(`${API_URL}/activities/${id}`);
  }
};