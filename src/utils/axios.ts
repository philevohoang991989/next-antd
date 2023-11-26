// utils/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://nsk-api-dev.demo.bnksolution.com', // Replace with your API base URL
});

export const setAuthToken = (token: any) => {
  
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;
