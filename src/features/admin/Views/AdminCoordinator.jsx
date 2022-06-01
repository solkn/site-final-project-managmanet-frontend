// import React from 'react'

// function AdminCoordinator() {
//   return (
//     <div>AdminCoordinator</div>
//   )
// }

// export default AdminCoordinator

// @mui
import PropTypes from 'prop-types';
import {
  Box,
  Stack,
  Link,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
  Grid,
  CircularProgress,
} from '@mui/material';
import Iconify from 'src/components/Iconify';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCoordinator, listCoordinator } from '../Redux/assignCoordinator/action';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

// import Iconify from 'src/components/Iconify';
// import { fToNow } from 'src/utils/formatTime';
// utils
// components
// import Scrollbar from '../../../components/Scrollbar';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme =>({
  card: {
    // minWidth: 275,
    // border: "1px solid",
    // padding: "10px",
    // backgroundImage:`url('https://image.shutterstock.com/image-photo/green-figure-person-unites-other-260nw-1422676361.jpg')`,
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: 'contain',
    // boxShadow: `2px 2px ${theme.palette.mode === 'dark' ? 'red' : 'grey'}`,
    // backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity)
  }
}));

export default function AdminCoordinator() {
const classes=useStyles();

  const dispatch = useDispatch();
  const data = useSelector((state) => state.assign);
  console.log(data);
  useEffect(() => {
    dispatch(listCoordinator());
  }, [dispatch]);

  const deleteClick = (id) => {
    dispatch(deleteCoordinator(id));
    dispatch(listCoordinator());
  };

  console.log('length................  ', data.msg);

  return data.msg.count === 0 ? (
    <Typography variant="h3" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
      {/* {fToNow(postedAt)} */} No coordinator Added
    </Typography>
  ) : data.msg?.count >= 1 ? (
    <Grid container spacing={3}>
      {
        data.msg.results?.map((data, index) => (
          <>
            <Grid item xs={10} md={6}>
              <Card className={classes.card}>
                {/* <CardHeader title="coordinator" subheader="" /> */}
                <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                  <NewsItem key={1} news={data.user} />
                </Stack>
                <Divider />
                <Box sx={{ p: 2, textAlign: 'right' }}>
                  <Button
                    size="small"
                    color="error"
                    endIcon={<Iconify icon={'fluent:delete-16-regular'} />}
                    onClick={() => deleteClick(data.id)}
                  >
                    delete
                  </Button>
                </Box>
              </Card>
            </Grid>
          </>))}
    </Grid>
  ) : (
    <Typography variant="h3" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
      {/* {fToNow(postedAt)} */}
    </Typography>
  );
}

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.shape({
    description: PropTypes.string,
    // image: PropTypes.string,
    // postedAt: PropTypes.instanceOf(Date),
    title: PropTypes.string
  })
};

function NewsItem({ news }) {
  const title = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src="/static/mock-images/avatars/avatar_1.jpg"
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" noWrap>
          Account
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {title}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {/* {fToNow(postedAt)} */} 2014
      </Typography>
    </Stack>
  );
}
