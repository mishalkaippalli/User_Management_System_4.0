
import axios from 'axios';

// The API URL for admin actions
const ADMIN_API_URL = '/api/admin/users';

// --- Helper function to get the auth token ---
// This function reads from localStorage, just like your authService
const getConfig = () => {
  // Get user (which includes the token) from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Base config object
  const config = {
    headers: {},
    params: {}, // For search queries
  };

  // If user and token exist, add the Authorization header
  // This is the part that solves the 401 error
  if (user && user.token) {
    config.headers['Authorization'] = `Bearer ${user.token}`;
  }

  return config;
};

// Get all users (with search)
const getUsers = async (searchTerm = '') => {
  const config = getConfig();
  config.params = { search: searchTerm }; // Add search param to the config

  const response = await axios.get(ADMIN_API_URL, config);
  return response.data;
};

// Get user details by ID
const getUserDetails = async (userId) => {
  const config = getConfig();
  // We use the ID-specific URL and pass the auth config
  const response = await axios.get(ADMIN_API_URL + '/' + userId, config);
  return response.data;
};

// Create a new user (admin)
const createUser = async (userData) => {
  const config = getConfig();
  // We POST the data and pass the auth config
  const response = await axios.post(ADMIN_API_URL, userData, config);
  return response.data;
};

// Update a user (admin)
const updateUser = async (userId, userData) => {
  const config = getConfig();
  // We PUT the data and pass the auth config
  const response = await axios.put(
    ADMIN_API_URL + '/' + userId,
    userData,
    config
  );
  return response.data;
};

// Delete a user (admin)
const deleteUser = async (userId) => {
  const config = getConfig();
  // We call DELETE and pass the auth config
  const response = await axios.delete(ADMIN_API_URL + '/' + userId, config);
  return response.data;
};

// Export all functions
const adminService = {
  getUsers,
  getUserDetails,
  createUser,
  updateUser,
  deleteUser,
};

export default adminService;
