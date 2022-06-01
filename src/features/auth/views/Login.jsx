import { Link as RouterLink, Navigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// layouts
// components
import Page from '../../../components/Page';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const auth = useSelector((state) => state.auth);
  const user_id = localStorage.getItem('user_id');
  const is_student = localStorage.getItem('is_student');
  const is_staff = localStorage.getItem('is_staff');
  const is_superadmin = localStorage.getItem('is_superadmin');
  const is_coordinator = localStorage.getItem('is_coordinator');
  const is_advisor = localStorage.getItem('is_advisor');
  const is_examiner = localStorage.getItem('is_examiner');

  console.log(auth);
  if (user_id) {
    console.log('suppepperrrr adminnnn: ' + auth.is_superadmin);
    if (is_superadmin === 'true') {
      return <Navigate to="/admin/dashboard" />;
    } if (is_student === 'true') {
      return <Navigate to="/student/dashboard" />;
    }
    if (is_coordinator === 'true') {
      return <Navigate to="/coordinator/dashboard" />;
    }
    if ((is_advisor === 'true' || is_examiner === 'true') && is_staff === 'true') {
      return <Navigate to="/staff/dashboard" />;
    }

  }

  return (
    <RootStyle title="Login | Site-Repo">
      <>
        {/* <AuthLayout /> */}
        <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome!
          </Typography>
          <img src="/static/illustrations/illustration_log.png" alt="login" />
        </SectionStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <LoginForm />
            <Typography
              variant="body2"
              align="center"
              sx={{
                mt: 3,
                display: { sm: 'none' }
              }}
            >
              Don’t have an account?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="register" underline="hover">
                Get started
              </Link>
            </Typography>
          </ContentStyle>
        </Container>
      </>
    </RootStyle>
  );
}
