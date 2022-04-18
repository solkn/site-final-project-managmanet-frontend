// component
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const coordinatorsidebarConfig = [
  {
    title: 'coordinator',
    path: '/coo/dashboard',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'coo-staff',
    path: '/coo/staff',
    icon: getIcon('la:chalkboard-teacher')
  },
  {
    title: 'coo-student',
    path: '/coo/students',
    icon: getIcon('icons8:student')
  },
];

export default coordinatorsidebarConfig;
