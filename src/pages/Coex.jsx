// import { motion } from 'framer-motion';
// import { Link as RouterLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
// // material
// import { styled } from '@mui/material/styles';
// import { Box, Button, Typography, Container, Grid } from '@mui/material';
// // components
// import { MotionContainer, varBounceIn } from '../components/animate';
// import Page from '../components/Page';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import { CardActionArea } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { signOut } from 'src/features/auth/AuthAction';
// // ----------------------------------------------------------------------

// const RootStyle = styled(Page)(({ theme }) => ({
//   display: 'flex',
//   minHeight: '90%',
//   alignItems: 'center',
//   paddingTop: theme.spacing(15),
//   paddingBottom: theme.spacing(10)
// }));
// function Coex() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { state } = useLocation();
//   if (state === null) {
//     dispatch(signOut())
//     return < Navigate to='/login' />;

//   }
//   const { types } = state;

//   const onback = () => {
//     dispatch(signOut())
//     navigate('/login')
//   }

//   const goToPages = (url) => {
//     const url_lower = String(url).toLowerCase();
//     navigate(`/${url_lower}/dashboard`)
//   }
//   return (
//     <RootStyle title="Account Type | Site-Repo">
//       <Container>
//         <MotionContainer initial="initial" open>
//           <Box sx={{ maxWidth: 680, margin: 'auto', textAlign: 'center' }}>
//             <motion.div variants={varBounceIn}>
//               <Typography variant="h3" paragraph>
//                 Choose Account Type
//               </Typography>
//             </motion.div>
//             <Typography sx={{ color: 'text.secondary' }}>
//               We noticed that you have more than one Account, we kindly request you to choose a type of account you want to login!
//             </Typography>
//             <Grid container spacing={2} sx={{ height: 'auto', mx: 'auto', my: { xs: 3, sm: 5 } }}>

//               {
//                 types?.map((val, index) => (
//                   <Grid onClick={() => goToPages(Object.keys(val))
//                   } key={index} item xs={12} md={6}>
//                     <motion.div variants={varBounceIn}>
//                       <Card sx={{ maxWidth: 'auto' }}>
//                         <CardActionArea>
//                           <CardMedia
//                             component="img"
//                             height="140"
//                             image={`/static/mock-images/groups/${Object.keys(val)}.jpg`}
//                             alt="examiner"
//                           />
//                           <CardContent>
//                             <Typography gutterBottom variant="h5" component="div">
//                               {Object.keys(val)}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                               {Object.values(val)}
//                             </Typography>
//                           </CardContent>
//                         </CardActionArea>
//                       </Card>
//                     </motion.div>
//                   </Grid>
//                 ))
//               }
//             </Grid>
//             <Button onClick={() => onback()} to="/login" size="large" variant="contained" component={RouterLink}>
//               Go to Home
//             </Button>
//           </Box>
//         </MotionContainer>
//       </Container>
//     </RootStyle >
//   )
// }

// export default Coex