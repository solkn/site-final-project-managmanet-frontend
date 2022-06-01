import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function AuthWrapper() {
  const isAuthenticated = localStorage.getItem('user_id');
  console.log('user_ID: ', isAuthenticated);
  const state = useSelector((state) => state.auth);
  console.log(state);
  console.log('helloooooo..... ');
  if (isAuthenticated) {
    if (state.is_superadmin === 'true') {
      console.log('is_adminnnn: ' + state.is_superadmin);
      return <Navigate to="/admin/dashboard" />;
    }
    if (state.is_student === 'true') {
      console.log('is_student: ' + state.is_student);
      return <Navigate to="/student/dashboard" />;
    }
    if (
      (state.advisor_to?.length !== 0 || state.examiner_to?.length !== 0) && state.is_staff === 'true'
    ) {
      return <Navigate to="/staff/dashboard" />;
    }
    if (state.is_coordinator === 'true') {
      return <Navigate to="/coordinator/dashboard" />;
    }
    return <Navigate to="/login" />;
  }
  return <Navigate to="/login" />;
}

export default AuthWrapper;
