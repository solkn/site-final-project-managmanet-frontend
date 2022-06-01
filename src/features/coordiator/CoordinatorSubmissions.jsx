import { Box, Grid, Typography, Link, Button, Stack } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import Page from 'src/components/Page'
import { useDispatch, useSelector } from 'react-redux';
import { listDeadlines, listSubmissionType } from './Redux/Submission/action';
import ReactLoading from 'react-loading';
import Deadlines from './coordinatorComponent/Deadlines';
import Semister from './coordinatorComponent/Semister';
import SubmissionType from './coordinatorComponent/SubmissionType';
import Iconify from 'src/components/Iconify';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    // display:'flex',
    // flexDirection:'row'
  },
  sidebar: {
    height: 'auto',
    borderLeft: `1px solid ${theme.palette.grey[300]}`
  },
  cardContent: {
    backgroundColor: `${theme.palette.grey[200]}`,
    textAlign: 'center'
  }
}));

function CoordinatorSubmissions() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [active, setactive] = useState(true);

  const { isLoading, errorMsg, deadlines } = useSelector(state => state.co_deadline);
  const co_submissionT = useSelector(state => state.co_submissionT);
  console.log(deadlines);
  console.log(co_submissionT);

  useEffect(() => {
    dispatch(listDeadlines())
    dispatch(listSubmissionType())
  }, [dispatch])


  const changePage = (value) => {
    setPage(value);
  }

  return (
    <>
      <Page title="Submission | Site-Repo" >
        <Box className={classes.root}>
          <Grid container spacing={2} sx={{ height: 'auto', mx: 'auto', }}>
            <Grid item xs={12} sm={10} p={1}>
              {
                page === 1 ? <Semister /> : page === 2 ? 
               
                  <Deadlines />
              : <SubmissionType />
              }
            </Grid>
            <Grid item sx={{ direction: 'column' }} xs={12} sm={2} className={classes.sidebar} >
              <Typography variant="subtitle2">
                <Link
                  data-cy='semister'
                  underline="none"
                  component="button"
                  variant="body2"
                  onClick={() => {
                    changePage(1)
                  }}
                  sx={{
                    color: page === 1 ? 'primary.main' : 'primary.dark',
                  }}
                >
                  Semister
                </Link>
              </Typography>


              <Typography variant="h6" >
                <Link
                  data-cy='submissiontype'
                  underline="none"
                  component="button"
                  variant="body2"
                  onClick={() => {
                    changePage(3)
                  }}
                  sx={{
                    color: page === 3 ? 'primary.main' : 'primary.dark',
                    // '&:hover': {
                    //   color: 'primary.main',
                    // opacity: [0.9, 0.8, 0.7],
                    //     },
                  }}
                >
                  Submission types
                </Link>
              </Typography>
              <Typography variant="subtitle2" >
                <Link
                  underline="none"
                  component="button"
                  variant="body2"
                  onClick={() => {
                    changePage(2)
                  }}
                  sx={{
                    color: page === 2 ? 'primary.main' : 'primary.dark',
                    // '&:hover': {
                    //   color: 'primary.main',
                    //   opacity: [0.9, 0.8, 0.7],
                    // },
                  }}
                >
                  Deadlines
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Page>
    </>
  )
}

export default CoordinatorSubmissions