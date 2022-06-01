import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Box, Grid, Typography, Divider, Paper } from '@mui/material';
import SettingBlackBox from './adminComponent/ColorTabs';
import { makeStyles } from '@mui/styles';
import Iconify from 'src/components/Iconify';
import ColorTabs from './adminComponent/ColorTabs';

const useStyles = makeStyles({
  firstBox: {
    marginTop: '10px',
    minWidth: 30,
    height: 30,
    borderRadius: '6px',
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

function AdminSettings() {
  const classes = useStyles();

  return (
    <Stack direction="column">
      <Typography variant="h4" gutterBottom>
        Setting
      </Typography>
       <ColorTabs />
    </Stack>
  );
}

export default AdminSettings;
