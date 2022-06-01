import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import Page from 'src/components/Page';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { adGetGroups } from '../redux/action';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    maxHeight: '450px',
    maxWidth: '850px',
    minHeight: '450px',
    minWidth: '150px',
    justifyContent: 'space-between',
    padding: '30px',
    margin: 'auto'
  },
  imagestyle: {
    position: 'absolute',
    color: 'white',
    top: 90,
    left: '50%',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    justifyItems: 'center',
    transform: 'translateX(-50%)'
  }
});

function AdvisorGroups() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ad_group);
  console.log(state);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(adGetGroups());
  }, []);

  return (
    <Page title="Group : Site-Repo">
      {state.groups.map((group) => (
        <Card className={classes.card} >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {group.group_name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {group.batch}
              </Typography>
              {group.members.map((member, index) => (
                // <Card sx={{ minWidth: 275 ,pl: 1, pb: 1, }} padding={1}>
                //   <CardContent>
                //     <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                //       {index+1 + " . " +   member.username}

                //     </Typography>
                //   </CardContent>
                // </Card>

                <Box sx={{ alignItems: 'center', pl: 1, pb: 1, direction: 'column' }}>
                  <Typography padding={0} variant="subtitle1" color="text.secondary">
                    {index + 1 + ' . ' + member.email}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Box>

          <div style={{ position: 'relative' }}>
            <CardMedia
              sx={{
                maxWidth: 420,
                minWidth:200,
                borderRadius: 2,
                height: '100%',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                filter: 'blur(0.5px)'
              }}
              component="img"
              image={'/static/mock-images/products/groups.jpg'}
              title="group"
              alt="group"
            />
            <div className={classes.imagestyle}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography component="div" variant="h2">
                    Augumented reality
                  </Typography>
                </Grid>
                <Grid md={12} xs={12} lg={12}>
                  <Typography component="div" variant="body">
                    Lorem Ipsum is simply dummy text of the printing
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={() => navigate('/advisor/chat')}
                    variant="contained"
                    type="submit"
                    color="primary"
                    sx={{ borderRadius: 28 }}
                  >
                    go to chat room
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </Card>
      ))}
    </Page>
  );
}

export default AdvisorGroups;
