// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const coordinatorsidebarConfig = [
 {
    title: 'Home',
    path: '/coordinator/dashboard',
    icon: getIcon('eva:pie-chart-2-fill')
  }, 
  {
    title: 'Group',
    path: '/coordinator/group',
    icon: getIcon('la:chalkboard-teacher')
  },

  {
    title: 'Submissions',
    path: '/coordinator/submissions',
    icon: getIcon('icons8:student')
  },
  {
    title: 'Channels',
    path: '/coordinator/channels',
    icon: getIcon('fluent:channel-alert-28-regular')
  },
];

export default coordinatorsidebarConfig;
