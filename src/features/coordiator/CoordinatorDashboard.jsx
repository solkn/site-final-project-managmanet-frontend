import { Button,Stack } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Page from 'src/components/Page'
import SendIcon from '@mui/icons-material/Send';

function CoordinatorDashboard() {
  const navigate = useNavigate()
  return (
    <Page title="Coordinator | Site-Repo" >
      <Stack direction="row" spacing={2}>
        <Button onClick={() => navigate('/coordinator/group')} data-cy='gotogroup' variant="contained" endIcon={<SendIcon />}>
          Group
        </Button>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button onClick={() => navigate('/coordinator/submissions')} data-cy='gotosubmission' variant="contained" endIcon={<SendIcon />}>
          Submission
        </Button>
      </Stack>
    </Page>
  );
}

export default CoordinatorDashboard