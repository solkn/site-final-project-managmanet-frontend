import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Login from './features/auth/views/Login';
import NotFound from './pages/Page404';
import Groups from './features/student/views/Groups';
import StudentChatRoom from './features/student/views/ChatRoom';
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
import StudentSubmissions from './features/student/views/Submissions';
import ProjectTitleSubmission from './features/student/views/ProjectTitleSubmission';
import AdminSettings from './features/admin/Views/AdminSettings';
import CoordinatorPrivateRoute from './RouteHandler/CoordinatorRoute';
import coordinatorsidebarConfig from './features/coordiator/coordinatorComponent/SidebarConfig';
import CoordinatorDashboard from './features/coordiator/CoordinatorDashboard';
import AdvisorPrivateRoute from './RouteHandler/AdvisorRoute';
import advisorsidebarConfig from './features/advisor/views/advisorComponent/SidebarConfig';
import AdvisorGroups from './features/advisor/views/AdvisorGroups';
import AdvisorChatRoom from './features/advisor/views/AdvisorChatRoom';
import AdvisorDashboard from './features/advisor/views/AdvisorDashboard';
import examinersidebarConfig from './features/examiner/views/examinerComponent/SidebarConfig';

import CoordinatorGroupDetailPage from './features/coordiator/views/GroupDetailPage';
import CoordinatorChannel from './features/coordiator/CoordinatorChannel';
import CoordinatorGroup from './features/coordiator/CoordinatorGroup';
import ExaminerChatRoom from './features/examiner/views/ExaminerChatRoom';
import ExaminerDashboard from './features/examiner/views/ExaminerDashboard';
import ExaminerGroups from './features/examiner/views/ExaminerGroups';
import NoInternetConnection from './utils/noInternetConnection';
import ExaminePage from './features/examiner/views/examinerComponent/ExaminePage';
import CoordinatorSubmissions from './features/coordiator/CoordinatorSubmissions';
import StaffPrivateRoute from './RouteHandler/StaffPrivateRoute';
import StaffDashboard from './features/staff/views/StaffDashboard';
import StaffGroups from './features/staff/views/StaffGroups';
import StaffChatRoom from './features/staff/views/StaffChatRoom';
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
        { path: 'coordinator', element: <AdminCoordinator /> },
        { path: 'setting', element: <AdminSettings /> }
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
        { path: 'chat', element: <StudentChatRoom /> },
        { path: 'submission', element: <StudentSubmissions /> },
        { path: 'project-title-submission', element: <ProjectTitleSubmission /> }
      ]
    },
    {
      path: '/coordinator',
      element: (
        <CoordinatorPrivateRoute>
          <DashboardLayout item={coordinatorsidebarConfig} initiator="c" />
        </CoordinatorPrivateRoute>
      ),
      children: [
        { path: 'dashboard', element: <CoordinatorDashboard /> },
        { path: 'group', element: <CoordinatorGroup /> },
        { path: 'channels', element: <CoordinatorChannel /> },
        { path: 'group/detail', element: <CoordinatorGroupDetailPage /> },
        { path: 'submissions', element: <CoordinatorSubmissions /> }
      ]
    },
    {
      path: '/staff',
      element: (
        <StaffPrivateRoute>
          <DashboardLayout item={examinersidebarConfig} initiator="e" />
        </StaffPrivateRoute>
      ),
      children: [
        { path: 'dashboard', element: <StaffDashboard /> },
        { path: 'groups', element: <StaffGroups /> },
        { path: 'chat', element: <StaffChatRoom /> },
        { path: 'examin', element: <ExaminePage /> },
        { path: 'dashboard', element: <AdvisorDashboard /> },
        { path: 'groups', element: <AdvisorGroups /> },
        { path: 'chat', element: <AdvisorChatRoom /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
