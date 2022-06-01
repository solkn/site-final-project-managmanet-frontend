// component
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const examinersidebarConfig = [
  {
    title: 'dashboard',
    path: '/staff/dashboard',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'groups',
    path: '/staff/groups',
    icon: getIcon('ic:outline-groups')
  },
  {
    title: 'chat',
    path: '/staff/chat',
    icon: getIcon('bi:chat-left-dots-fill')
  },
];

export default examinersidebarConfig;
