import { Button, Stack } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Page from 'src/components/Page';
import { Send } from '@mui/icons-material';

function StudentDashboard() {
  const navigate = useNavigate()
  return (
    <>
      <Page title="Student | Site-Repo">
        <Stack direction="column" spacing={2}>
          <Button onClick=
            {() => navigate('/student/groups')}
            data-cy='gotogroup'
            variant="contained"
            endIcon={<Send />}>
            Group
          </Button>
        </Stack>
      </Page>
    </>
  );
}

export default StudentDashboard;
