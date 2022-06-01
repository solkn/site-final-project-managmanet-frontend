// component
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const studentsidebarConfig = [
  {
    title: 'dashboard',
    path: '/student/dashboard',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'groups',
    path: '/student/groups',
    icon: getIcon('ic:outline-groups')
  },
  {
    title: 'chat',
    path: '/student/chat',
    icon: getIcon('bi:chat-left-dots-fill')
  },
  {
    title: 'submission',
    path: '/student/submission',
    icon: getIcon('ant-design:file-done-outlined')
  }

  // {
  //   title: 'Settings',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill')
  // },

  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill')
  // }
];

export default studentsidebarConfig;
