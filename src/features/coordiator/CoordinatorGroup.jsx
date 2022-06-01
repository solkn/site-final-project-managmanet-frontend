
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listGroups } from './Redux/FetchGrpoup/action';
import ReactLoading from 'react-loading';
import { TextField } from '@mui/material';

const im = [
  '/static/mock-images/groups/group_1.jpg',
  '/static/mock-images/groups/group_2.jpg',
  '/static/mock-images/groups/group_3.jpg',
  '/static/mock-images/groups/group_4.jpg',
  '/static/mock-images/groups/group_5.jpg',
  '/static/mock-images/groups/group_6.jpg',
  '/static/mock-images/groups/group_7.jpg',
  '/static/mock-images/groups/group_8.jpg',
  '/static/mock-images/groups/group_9.jpg',


]

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 300,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 10,
  right: 10,
  top: 10,
  bottom: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function CoordinatorGroup() {



  let navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => state.co_group)
  console.log(state);
  React.useEffect(() => {
    dispatch(listGroups());
  }, [dispatch])
  console.log("groups:    ", state);

  return (
    <>
      {state.isLoading ? (
        <Box mt="20%" ml="45%" style={{ textAlign: 'center', justifyContent: 'center', alignSelf: 'center' }}>
          <ReactLoading
            type={"spinningBubbles"}
            color={"#3B7BBC"}
            height='10%'
            width='10%'
          />
        </Box>
      ) : state.errMsg !== '' ? (
        <Box mt="20%" ml="45%" style={{ textAlign: 'center', justifyContent: 'center', alignSelf: 'center' }}>
          {state.errMsg}
        </Box>
      ) :

        (<>
          {
            state?.groups.results.length === 0 ? <Typography variant='h4' >no group formed</Typography> : <Typography variant='h4' >Groups</Typography>
          }

          <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 200, width: '100%', justifyContent: 'center' }}>
            {state?.groups.results.map((group, index) => (
              <ImageButton 
                data-cy="groups"
                focusRipple
                key={group?.group_name + index}
                sx={{ margin: 1, }}
                style={{
                  width: 320,
                }}
                onClick={() => navigate('/coordinator/group/detail', {
                  state: {
                    id: group?.id,
                    members: group?.members,
                    g_name: group?.group_name,
                    advisors: group?.advisors,
                    examiners: group?.examiners
                  },
                })}

              >
                <ImageSrc style={{ backgroundImage: `url(${im[Math.floor(Math.random() * im.length)]})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: 'relative',
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {group?.group_name}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
              </ImageButton>
            ))}
          </Box></>)}
    </>
  );
}
