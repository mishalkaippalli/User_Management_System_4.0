import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  // Select the 'user' object from your 'auth' slice state
  const { user } = useSelector((state) => state.auth);

  // Check if user is logged in AND is an admin
  if (user && user.role === 'admin') {
    return <Outlet />; // Render the child route (e.g., AdminDashboard)
  } else {
    // Redirect to home page (or login page) if not an admin
    return <Navigate to="/" replace />;
  }
};

export default AdminRoute;