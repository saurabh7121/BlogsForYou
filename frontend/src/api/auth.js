import axios from "axios";

// --- API Service ---
// This part handles all communication with your backend.
const API_URL = "http://localhost:5000/api"; // Ensure this port is correct

const AuthService = {
  signup: (userData) => {
    return axios.post(`${API_URL}/auth/signup`, userData);
  },
  login: (userData) => {
    return axios.post(`${API_URL}/auth/login`, userData);
  },
  getUserData: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/protected/user`, {
        headers: { "x-auth-token": token },
      });
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Token is invalid or expired, clear it
        localStorage.removeItem("token");
      }
      throw err; // Re-throw to be caught by the component
    }
  },
  deleteAccount: (token) => {
    return axios.delete(`${API_URL}/auth/delete-account`, {
      headers: { "x-auth-token": token },
    });
  },
  updateProfile: (token, userData) => {
    return axios.put(`${API_URL}/auth/update-profile`, userData, {
      headers: { "x-auth-token": token },
    });
  },
};

export default AuthService;
