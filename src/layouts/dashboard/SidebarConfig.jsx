// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/admin/app',
    icon: getIcon('eva:pie-chart-2-fill')
  },

  {
    title:'staff',
    path:'/admin/staff',
    icon: getIcon('eva:lock-fill')

  },

  {
    title:'student',
    path:'/admin/students',
    icon: getIcon('eva:lock-fill')

  }
];

export default sidebarConfig;
