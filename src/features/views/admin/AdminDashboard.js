import { Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents, fetchStaffs } from '../Redux/AdminAction';
import { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import { faker } from '@faker-js/faker';
import DashboardCard from './adminComponent/DashboardCard';
import CoordinatorCard from './adminComponent/CoordinatorCard';
import TopTrandingProject from './adminComponent/TopTrandingProject';
import axios from 'axios';
import { COMMON_URL } from 'src/common/api';
function AdminDashboard() {
  const [first, setfirst] = useState('');

  const dispatch = useDispatch();

  const vall = useSelector((state) => state.admin);
  console.log(vall);

  //  const dispatcher=()=>{
  //   dispatch(fetchStudents());
  //   dispatch(fetchStaffs());
  //  }
  console.log(localStorage.getItem('user_id'));

  const fetchProfile = async () => {
    setfirst(
      await axios.get(`${COMMON_URL}/admins/${localStorage.getItem('user_id')}`, {
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      }).data.username
    );
  };

  useEffect(() => {
    dispatch(fetchStudents());
    fetchProfile();
  }, []);

  console.log(first);

  return vall.loading ? (
    <h1>Loading...</h1>
  ) : vall.error ? (
    <h2>{vall.error}</h2>
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
              <DashboardCard
                title="Students"
                total={23456}
                icon={'noto:man-student-light-skin-tone'}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <DashboardCard
                title="Staff"
                total={1352831}
                color="warning"
                icon={'icon-park:file-staff'}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <DashboardCard
                title="Examiner"
                total={1723315}
                color="info"
                icon={'carbon:exam-mode'}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <CoordinatorCard
                title="Coordinator"
                list={[...Array(1)].map((_, index) => ({
                  id: faker.datatype.uuid(),
                  title: faker.name.jobTitle(),
                  description: faker.name.jobTitle(),
                  image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                  postedAt: faker.date.recent()
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
