// component
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const adminsidebarConfig = [
  {
    title: 'dashboard',
    path: '/admin/dashboard',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'Staff',
    path: '/admin/staff',
    icon: getIcon('la:chalkboard-teacher')
  },
  {
    title: 'Students',
    path: '/admin/students',
    icon: getIcon('icons8:student')
  },
];

export default adminsidebarConfig;
