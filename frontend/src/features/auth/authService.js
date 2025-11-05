import axios from 'axios'

const API_URL = '/api/users/'


const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//logout user
const logout = () => {
    localStorage.removeItem('user')
}

const updateProfile = async (formData) => {
  // 1. Get user (with token) from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // 2. Set up the auth headers
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data', // Important for file uploads
    },
  };

  if (user && user.token) {
    config.headers['Authorization'] = `Bearer ${user.token}`;
  }

  // 3. Make the PUT request to the new backend route
  const response = await axios.put(API_URL + 'profile', formData, config);

  // 4. Update localStorage with the new user data (e.g., new name, new image URL)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
    register,
    logout,
    login,
    updateProfile
}
export default authService