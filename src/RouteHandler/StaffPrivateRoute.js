import { Navigate, useLocation } from 'react-router-dom';

function StaffPrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem('user_id');
  console.log('user_ID: ', isAuthenticated);
  const is_staff = localStorage.getItem('is_staff');
  const is_advisor = localStorage.getItem('is_advisor');
  const is_examiner = localStorage.getItem('is_examiner');
  const location = useLocation();
  console.log(location.pathname);
  return isAuthenticated && is_staff && (is_examiner || is_advisor)? children : <Navigate to="/login" />;
}
export default StaffPrivateRoute;
