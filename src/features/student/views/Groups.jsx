import React, { useState } from 'react';
import { Button, Modal, Box, Typography, Autocomplete, TextField } from '@mui/material';
import Iconify from '../../../components/Iconify';
import Page from 'src/components/Page';
import NoGroupsFormed from './studentGroupComponent/NoGroupsFormed';

const style = {
  margin: "auto",
  width: 700,
  bgcolor: 'background.paper',
  borderRadius: "12px",
  boxShadow: 24,
  p: 4, 
};

const films =[
  {title: 'ATR/2260/10'},
  {title: 'ATR/2261/10'},
  {title: 'ATR/2262/10'},
  {title: 'ATR/2263/10'},
  {title: 'ATR/2264/10'},
  {title: 'ATR/2265/10'}
]

const Groups = () => {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    setOpen(false);
    setGroupName("");
    setGroupMembers([]);
  };
  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };
  const handleGroupMemberChange = (e, value) => {
    setGroupMembers(value);
  };
  const handleSubmit = (e) => {
    console.log(groupName);
    console.log(groupMembers);
  };

  return (
    <Page title="Group chat : Site-Repo">
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <h1>Groups</h1>
        <Button onClick={handleOpen} variant="contained" startIcon={<Iconify icon="carbon:add" sx={{width: 24, height: 24}} />}>Create Group</Button>
      </div>
      <NoGroupsFormed />
      {open && 
        <Modal 
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{display:"flex", alignItems:"center", jusitifyContent:"center"}}
        >
          <Box sx={style}>
            <div style={{display:"flex"}}>
              <Iconify icon="ant-design:usergroup-add-outlined" sx={{width: 28, height: 28}} />
              <Typography id="modal-modal-title" variant="h6" component="h2" style={{marginLeft: "1em"}}>
                Create Group
              </Typography>
            </div>
            <TextField  value={groupName} onChange={handleGroupNameChange} id="outlined-group-name" label="Group Name" variant="outlined" sx={{width: "30em", marginTop: "1em"}}/>
            <Autocomplete
              multiple
              id="outlined-multi"
              options={films}
              isOptionEqualToValue={(option, value) => option.title === value.title}
              getOptionLabel={(option) => option.title}
              defaultValue={[]}
              value={groupMembers}
              onChange={handleGroupMemberChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Add Group Members"
                  placeholder="Add Group Members"
                />
              )}
              sx={{marginTop: "1em"}}
            />
            <div style={{display:"flex", marginTop: "2em", justifyContent: "right"}}>
              <Button onClick={handleCancel} variant="contained" color="error">Cancel</Button>
              <Button onClick={handleSubmit} variant="contained" sx={{marginLeft: "1em"}}>Save</Button>
            </div>
          </Box>
        </Modal>
      }
    </Page>
  );
}

export default Groups;
