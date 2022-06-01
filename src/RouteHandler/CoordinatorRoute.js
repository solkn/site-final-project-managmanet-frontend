import { Navigate, useLocation } from 'react-router-dom';

function CoordinatorPrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem('user_id');
  console.log('user_ID: ', isAuthenticated);
  
  const is_coordinator = localStorage.getItem('is_coordinator');
  const location = useLocation();
  console.log(location.pathname);

  return isAuthenticated && is_coordinator ? children : <Navigate to="/login" />;
}
export default CoordinatorPrivateRoute;
