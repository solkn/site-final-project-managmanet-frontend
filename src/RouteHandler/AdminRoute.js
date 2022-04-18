import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminPrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem('user_id');
  console.log('user_ID: ', isAuthenticated);

  const is_admin = localStorage.getItem('is_superadmin');

  return isAuthenticated && is_admin === 'true' ? children : <Navigate to="/login" />;
}
export default AdminPrivateRoute;
