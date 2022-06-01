import { Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Page from 'src/components/Page';
import { faker } from '@faker-js/faker';
import DashboardCard from './adminComponent/DashboardCard';
import CoordinatorCard from './adminComponent/CoordinatorCard';
import TopTrandingProject from './adminComponent/TopTrandingProject';
import { fetchStaffAsync } from '../Redux';
import { listStudent } from '../Redux/staff/action';
import { useNavigate } from 'react-router-dom';

import { Link as RouterLink } from 'react-router-dom';
function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.admin);
  console.log(state.students.length);
  const studnet_state = useSelector((state) => state.ad_student);
  console.log(studnet_state?.students?.length);

  useEffect(() => {
    dispatch(fetchStaffAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listStudent());
  }, [dispatch]);
  return state.loading ? (
    <h1>Loading...</h1>
  ) : state.error ? (
    <h2>{state.error}</h2>
  ) : (
    <motion.div
      initial={{ y: -10, opacity: 0, azimuth: 0 }}
      animate={{ y: 10, opacity: 1, azimuth: 100 }}
      transition={{ delay: 0.1, type: 'tween', stiffness: 0 }}
    >
      <Page title="Dashboard">
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi, Welcome back
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <RouterLink id='tostudent'
                style={{ textDecoration: 'none' }}
                to={'/admin/students'} >
                <DashboardCard
                  title="Students"
                  total={studnet_state?.students?.length}
                  icon={'noto:man-student-light-skin-tone'}
                />   
                </RouterLink>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <RouterLink data-cy='tostaff' style={{ textDecoration: 'none' }} to={'/admin/staff'} >
                <DashboardCard
                  title="Staff"
                  total={state.staffs.length}
                  color="warning"
                  icon={'icon-park:file-staff'}
                />
              </RouterLink >
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DashboardCard
                title="Projects"
                total={0}
                color="info"
                icon={'carbon:exam-mode'}
              />

            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <CoordinatorCard
                title="Coordinator"
                list={[...Array(1)].map((_, index) => ({
                  id: faker.datatype.uuid(),
                  title: 'Coordinator',
                  description: 'Account',
                  image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                }))}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <TopTrandingProject
                title="Trading Projects"
                list={[...Array(3)].map((_, index) => ({
                  id: faker.datatype.uuid(),
                  title: [
                    'SiTE Final Proect repo System',
                    'Augmented Reality',
                    'Blochain Idtegrated LI'
                  ][index],
                  type: `order${index + 1}`,
                  time: faker.date.past()
                }))}
              />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </motion.div>
  );
}

export default AdminDashboard;
