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
    console.log('suppepperrrr adminnnn: ' + state.is_student);
    if (state.is_superadmin === 'true') {
      return <Navigate to="/admin/dashboard" />;
    }
    if (state.is_student === 'true') {
      return <Navigate to="/student/dashboard" />;
    }
    return <Navigate to="/login" />;
  }
  return <Navigate to="/login" />;

  // return (
  //   <>
  //     <Grid pt={3} container spacing={2}>
  //       <Grid item xs={2}></Grid>
  //       <Grid item xs={10}>
  //         <h3>made by group 5 </h3>

  //         <i>version: 1.0 </i>
  //       </Grid>
  //     </Grid>
  //   </>
  // );
}

export default AuthWrapper;
