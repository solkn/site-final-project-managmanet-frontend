import { Typography } from '@mui/material';
import React from 'react';
import Iconify from '../../../../components/Iconify';

const NoGroupsFormed = () => {
  return (
    <div style={{textAlign: "center", margin: "3em"}}>
        <div><Iconify icon="ic:baseline-groups" sx={{width: 80, height: 80}} /></div>
        <Typography variant="h4">You do not have a Group yet...</Typography>
    </div>
  );
};

export default NoGroupsFormed;