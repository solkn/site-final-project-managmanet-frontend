import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Login from './features/auth/views/Login';
import NotFound from './pages/Page404';
import Groups from './features/advisor/views/Groups';
import ChatRoom from './features/advisor/views/ChatRoom';
import AdminDashboard from './features/admin/Views/AdminDashboard';
import adminsidebarConfig from './features/admin/Views/adminComponent/AdminSidebarConfig';
import AdminPrivateRoute from './RouteHandler/AdminRoute';
import AuthWrapper from './RouteHandler/PrivateRoute';
import StudentPrivateRoute from './RouteHandler/StudentRoute';
import AdminGetStaffList from './features/admin/Views/AdminStaffList';
import AdminGetStudentList from './features/admin/Views/AdminStudentList';
import studentsidebarConfig from './features/student/views/studentComponent/SidebarConfig';
import StudentDashboard from './features/student/StudentDashboard';
import AdminCoordinator from './features/admin/Views/AdminCoordinator';
// ----------------------------------------------------------------------

export default function AppRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <AuthWrapper /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    {
      path: '/admin',
      element: (
        <AdminPrivateRoute>
          <DashboardLayout item={adminsidebarConfig} initiator="a" />,
        </AdminPrivateRoute>
      ),
      children: [
        { path: 'dashboard', element: <AdminDashboard /> },
        { path: 'staff', element: <AdminGetStaffList /> },
        { path: 'students', element: <AdminGetStudentList /> },
        { path: 'coordinator', element: <AdminCoordinator /> }

      ]
    },
    {
      path: '/student',
      element: (
        <StudentPrivateRoute>
          <DashboardLayout item={studentsidebarConfig} initiator="s" />
        </StudentPrivateRoute>
      ),
      children: [
        { path: 'dashboard', element: <StudentDashboard /> },
        { path: 'groups', element: <Groups /> },
        { path: 'chat', element: <ChatRoom /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
