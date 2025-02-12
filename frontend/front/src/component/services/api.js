// services/api.js
import axios from 'axios';

export const resgiterUser = async (data) => {
  const response = await axios.post('http://localhost:5000/userRoutes/register', data); // Update the URL to match your route
  return response.data;
};

export const loginUser = async (credentials) => {
    const response = await axios.post('http://localhost:5000/userRoutes/Login', credentials); // Update the URL
    return response.data;
  };