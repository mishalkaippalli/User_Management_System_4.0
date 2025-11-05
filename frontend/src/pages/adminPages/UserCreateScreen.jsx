import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Mocked for preview
import { useSelector, useDispatch } from 'react-redux'; // Mocked for preview
import { createUser, reset } from '../../features/admin/adminSlice'; // Mocked for preview
import { toast } from 'react-toastify'; // Mocked for preview

const UserCreateScreen = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  useEffect(() => {
    if (isSuccess) {
      toast.success('User created successfully');
      dispatch(reset());
      navigate('/admin/userlist');
    }
    if (isError) {
      toast.error(message || 'An error occurred');
      dispatch(reset());
    }
  }, [isSuccess, isError, message, navigate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    dispatch(createUser({ name, email, password, role }));
  };

  // This will reset the isSuccess/isError flags when the component unmounts
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 pt-8 md:p-8">
      <div className="mx-auto max-w-lg">
        <Link
          to="/admin/userlist"
          className="mb-4 inline-block text-sm text-gray-700 hover:text-black"
        >
          &larr; Go Back to User List
        </Link>
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">Create New User</h1>
          {isLoading && <p>Loading...</p>}
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="flex w-full shrink-0 items-center justify-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create User'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserCreateScreen;