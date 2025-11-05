import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUserDetails,
  updateUser,
  reset,
  resetAdminUser,
} from '../../features/admin/adminSlice';
// import Loader from '../../components/Loader';
// import Message from '../../components/Message';

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');

  const {
    user,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    if (isSuccess && !user) {
      // This means an update was successful, and we can navigate away
      dispatch(reset());
      navigate('/admin/userlist');
    } else {
      if (!user || user._id !== userId) {
        // Fetch user details if not in state or if it's the wrong user
        dispatch(getUserDetails(userId));
      } else {
        // Populate form with user details from state
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      }
    }
  }, [dispatch, userId, user, isSuccess, navigate]);

  // Clean up user details from state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetAdminUser());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = { name, email, role };
    dispatch(updateUser({ userId, userData }));
    // The useEffect will handle the redirect on success
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">{message}</p>;

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <Link to="/admin/userlist" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Go Back
      </Link>
      <h1 className="text-3xl font-bold mb-4">Edit User</h1>
      <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <select
            id="role"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default UserEditScreen;