// component
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const advisorsidebarConfig = [
  {
    title: 'dashboard',
    path: '/advisor/dashboard',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'groups',
    path: '/advisor/groups',
    icon: getIcon('ic:outline-groups')
  },
  {
    title: 'chat',
    path: '/advisor/chat',
    icon: getIcon('bi:chat-left-dots-fill')
  },
];

export default advisorsidebarConfig;
