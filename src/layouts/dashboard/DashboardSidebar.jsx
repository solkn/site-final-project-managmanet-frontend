import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// mocks_
import account from '../../_mocks_/studentAccount';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUser } from 'src/common/redux/Profile/action';

// import adminsidebarConfig from '../../../../layouts/dashboard/SidebarConfig';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  item: PropTypes.object,
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ from, item, isOpenSidebar, onCloseSidebar }) {

  const is_superadmin = localStorage.getItem('is_superadmin');
  const is_advisor = localStorage.getItem('is_advisor');
  // const user_id = localStorage.getItem('user_id');
  const is_coordinator = localStorage.getItem('is_coordinator');
  const is_staff = localStorage.getItem('is_staff');
  const is_examiner = localStorage.getItem('is_examiner');
  const is_student = localStorage.getItem('is_student');

  const { pathname } = useLocation();
  console.log('from  ', from);
  const isDesktop = useResponsive('up', 'lg');
  const dispatch = useDispatch();

  const state = useSelector(state => state.oneUser);
  console.log(state.user?.username);
  useEffect(() => {
    console.log(from);
    dispatch(getOneUser())
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>
      <Box sx={{ mb: 5, mx: 2.5 }}>
        {/* <Link underline="none" component={RouterLink} to="dashboarad"> */}
        <AccountStyle>
          <Avatar src={account.photoURL} alt="photoURL" />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              {state.user?.username}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {
                is_superadmin === "true" ? "ADMIN" :
                  (is_advisor === "true" || is_examiner === "true") ? "Staff" :
                    is_coordinator === "true" ? "Coordinator" :"Student"
              }
            </Typography>
          </Box>
        </AccountStyle>
        {/* </Link> */}
      </Box>
      <NavSection navConfig={item} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed'
            }
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
