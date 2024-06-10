// frontend/src/services/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Update with your backend URL

export const register = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, formData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const login = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, formData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
