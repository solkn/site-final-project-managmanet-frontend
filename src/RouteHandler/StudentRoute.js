import { Navigate, useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';

function StudentPrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem('user_id');
  console.log('user_ID: ', isAuthenticated);
  
  const is_student = localStorage.getItem('is_student');
  const location = useLocation();
  console.log(location.pathname);

  return isAuthenticated && is_student ? children : <Navigate to="/login" />;
}
export default StudentPrivateRoute;
