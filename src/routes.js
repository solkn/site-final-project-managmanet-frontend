import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Others';
import User from './pages/User';
import AdminGetStaffList from './features/admin/Views/admin_staff_list';
import AdminGetStudentList from './features/admin/Views/admin_student_list';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'others', element: <Products /> },
        { path: 'staffs',element:<AdminGetStaffList />},
        { path: 'students',element:<AdminGetStudentList />},

      ]
    },
    
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
