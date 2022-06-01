import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Iconify from '../../../components/Iconify';
import Page from 'src/components/Page';
import { alphaNumerical } from 'src/utils/formRegexp';
import NoGroupsFormed from './studentComponent/NoGroupsFormed';
import { createStudentGroupAsync, fetchStudentAsync, fetchStudentGroupAsync} from '../Redux/StudentAction';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, Button, Modal, Box, Typography, Autocomplete, TextField, CircularProgress, TableBody } from '@mui/material';
import {Loading} from '../../../utils/loading';

const style = {
  margin: "auto",
  width: "80%",
  maxWidth: 700,
  bgcolor: 'background.paper',
  borderRadius: "12px",
  boxShadow: 24,
  p: 4, 
};

const Groups = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);
  

  const [errors, setErrors] = useState({ groupName: '', groupMembers: '' });

  const {students, group, fetchStudentGroupLoading, fetchStudentsSuccess} = useSelector((state) => state.student);
  const loading =  fetchStudentsSuccess && options.length === 0;
  

  useEffect(()=>{
    dispatch(fetchStudentGroupAsync());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchStudentAsync());
  // }, [dispatch]);

  useEffect(() => {
    setOptions([...students]);
  }, [fetchStudentsSuccess, students]);

  const handleOpen = () => {
    setOpen(true);
    dispatch(fetchStudentAsync())
  };
  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    setOpen(false);
    setGroupName("");
    setGroupMembers([]);
  };
  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
    setErrors({...errors, groupName: ""});
  };
  const handleGroupMembersChange = (e, value) => {
    setGroupMembers(value);
    setErrors({...errors, groupMembers: ""});
  };
  const handleSubmit = (e) => {
    if(groupName === ""){
      setErrors({...errors, groupName: "Please Give Name To Your Group"});
    }else if(alphaNumerical(groupName) === false){
      setErrors({...errors, groupName: "Special Characters Not allowed"});
    }else if(groupMembers.length < 2){
      setErrors({...errors, groupMembers: "Please Add More Than 2 Group Members At Least"});
    }else if(groupMembers.length > 5){
      setErrors({...errors, groupMembers: "Exceeded the allowed number of members in a group"});
    }else{
      let group_members = []
      groupMembers.filter((member) => {
        group_members.push(member.username);
      });
      dispatch(createStudentGroupAsync({group_name: groupName, group_members: group_members}));
      dispatch(fetchStudentGroupAsync());
      setErrors({...errors, groupName: "", groupMembersError: ""});
      setOpen(false);
    }
  };

  return (
    <Page title="Group chat : Site-Repo" >
      <div style={{display: "flex", justifyContent: "space-between", padding: "2em"}}>
        <h1>Groups</h1>
        { fetchStudentGroupLoading 
          ? (<CircularProgress color="inherit" size={40} />) 
          : group.length === 1 
          ? <></>
          :(<Button 
              data-cy="creategroupbtn"
              onClick={handleOpen} 
              variant="contained" 
              startIcon={<Iconify icon="carbon:add" sx={{width: 24, height: 24}} />}
              >Create Group
            </Button>)
        }
      </div>
      <div sx={{padding: '1em', justifyContent: 'center'}}>
        { fetchStudentGroupLoading ? <Loading></Loading> : group.length === 1 ? <GroupTableDisplay group={group} /> : <NoGroupsFormed />}
      </div>
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
            <TextField  
              data-cy="groupname"
              value={groupName}
              onChange={handleGroupNameChange}
              error={Boolean(errors.groupName)}
              helperText={errors.groupName}
              id="outlined-group-name" 
              label="Group Name" 
              variant="outlined" 
              sx={{width: "30em", maxWidth: "100%", marginTop: "1em", paddingRight: "2em"}}/>
            <Autocomplete
             data-cy="studentauto"
              multiple
              limitTags={4}
              id="outlined-multi"
              options={options}
              loading={loading}
              isOptionEqualToValue={(option, value) => option.username === value.username}
              getOptionLabel={(option) => option.username}
              defaultValue={[]}
              value ={groupMembers}
              onChange={handleGroupMembersChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(errors.groupMembers)}
                  helperText={errors.groupMembers}
                  variant="outlined"
                  label="Add Group Members"
                  placeholder="Add Group Members"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment:(
                      <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                      </>
                    )
                  }}
                />
              )}
              sx={{marginTop: "1em"}}
            />
            <div style={{display:"flex", marginTop: "2em", justifyContent: "right"}}>
              <Button onClick={handleCancel} variant="contained" color="error">Cancel</Button>
              <Button data-cy="addbtn" onClick={handleSubmit} variant="contained" sx={{marginLeft: "1em"}}>Save</Button>
            </div>
          </Box>
        </Modal>
      }
    </Page>
  );
}

const GroupTableDisplay = (group) => {
  return (
    <div>
      <TableContainer component={Paper} sx={{ maxWidth: '90%', marginLeft: '1em', marginRight: '1em'}} elevation={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Group Name</TableCell> 
              <TableCell>Group Members ID</TableCell>
              <TableCell align="left">Group Members Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {group.group[0].members.map((stud) => (
              <TableRow
                key={stud.username}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell>{group.group[0].group_name}</TableCell>
                <TableCell>{stud.username}</TableCell>
                <TableCell>{stud.email}</TableCell>
              </TableRow>
            ))

            }
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{display: 'flex', maxWidth: '90%', margin: '1em', justifyContent: 'space-between'}}>
        { group.group[0].advisors.length > 0 
          ? <TableContainer component={Paper} sx={{maxWidth: '30%', textAlign: 'center'}} elevation={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Advisors</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { group.group[0].advisors.map((adv) => (
                    <TableRow>
                      <TableCell>
                        <Typography variant="overline">{adv.username}</Typography>
                      </TableCell>
                    </TableRow>
                  ))

                  }
                </TableBody>
              </Table>
            </TableContainer>
          : <></>
        }
        { group.group[0].examiners.length > 0 
          ? <TableContainer component={Paper} sx={{maxWidth: '30%', textAlign: 'center'}} elevation={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Examiners</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { group.group[0].examiners.map((exam) => (
                    <TableRow>
                      <TableCell>
                        <Typography variant='overline'>{exam.username}</Typography>
                      </TableCell>
                    </TableRow>
                  ))

                  }
                </TableBody>
              </Table>
            </TableContainer>
          : <></>
        }
      </div>
    </div>
  );
}

export default Groups;
