import React, { useEffect, useState } from 'react'
import { Menu, Container, Modal, TextField, Button, Stack, MenuItem, Box, Card, CardHeader, IconButton, Avatar, Typography, Autocomplete } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Page from 'src/components/Page'
import { Link as RouterLink } from 'react-router-dom';
import Iconify from 'src/components/Iconify';
import { Form, Formik, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { listSubmissionType, AddSubmissionType, listSemister } from '../Redux/Submission/action'
import ReactLoading from 'react-loading';
import { forEach } from 'lodash';

const style = {
  margin: 'auto',
  width: 700,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4
};


function SubmissionType() {

  const [anchor, setAnchor] = useState(null);
  const options = ["Edit", "Delete"];
  const [selected, setSelected] = useState(-1);
  const [open, setOpen] = useState(false, 'a');
  const [groupName, setGroupName] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);
  const [semister, setsemister] = useState('')
  const dispatch = useDispatch();

  const {
    listSubTResponse,
    listSubTLoading,
    listSubTErrMsg, listSemisterResponse,
    listSemisterLoading,
    listSemisterErrMsg } = useSelector(state => state.co_deadline);
  // console.log(listSemisterResponse?.results);

  // const handlechange = (index) => {
  //   console.log(index.target.value);
  // };
  // const RegisterSchema = Yup.object().shape({
  //   name: Yup.string().required('name is Empty'),
  //   // max_mark: Yup.string().required('max_mark is Empty'),
  //   // semister: Yup.string().required('semister is Empty')
  // });
  // const formik = useFormik({
  //   initialValues: {
  //     name: '',
  //     // max_mark: '',
  //     // semister: ''
  //   },
  //   validationSchema: RegisterSchema,
  //   onSubmit: (values) => {
  //     const data = {
  //       name: values.name,
  //       // max_mark: values.max_mark,
  //       // semister: ''
  //     };
  //     console.log('data:', values.name);
  //     // dispatch(StaffRegisterWithForm(data));
  //     formik.resetForm();
  //   }
  // });
  // const { errors, touched, handleSubmit, getFieldProps } = formik;


  useEffect(() => {
    dispatch(listSubmissionType())
    dispatch(listSemister())
  }, [dispatch])


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    setOpen(false);
    setGroupName('');
    setGroupMembers([]);
  };

  // const handleSubmit = (e) => {
  //   console.log(groupName);
  //   console.log(groupMembers);
  // };



  const openMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchor(null);
  };

  const onMenuItemClick = (event, index) => {
    setAnchor(null);
    setSelected(index);
  };
  const handleGroupMemberChange = (e, value) => {
    // console.log(value);
    // console.log(value[0].name);
    setsemister(value[0].id)
    setGroupMembers(value);
    // console.log(groupMembers)
  };

  const validationSchema = Yup.object({

  });

  const formik = useFormik({
    initialValues: {
      name: '',
      max_mark: '',
      semister: ''

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data={
        name: values.name,
        max_mark: values.max_mark,
        semister: semister
      }
      dispatch(AddSubmissionType(data))
      // alert(JSON.stringify(values, null, 2));
    },
  });
  const { resetForm, errors, handleChange, touched, handleSubmit, getFieldProps } = formik;


  return (
    <>
      {listSubTLoading ? (
        <Box mt="20%" ml="45%" style={{ textAlign: 'center', justifyContent: 'center', alignSelf: 'center' }}>
          <ReactLoading
            type={"spinningBubbles"}
            color={"#3B7BBC"}
            height='10%'
            width='10%'
          />
        </Box>
      ) : listSubTErrMsg !== '' ? (
        <Box mt="20%" ml="45%" style={{ textAlign: 'center', justifyContent: 'center', alignSelf: 'center' }}>
          {listSubTErrMsg}
        </Box>
      ) :
        <Page title='submission type'>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Submission Type
              </Typography>
              <Button
                data-cy='submisiontypebtn'
                variant="contained"
                component={RouterLink}
                to="#"
                onClick={() => handleOpen()}
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                New Submission Type
              </Button>
            </Stack>

            {
              listSubTResponse?.results?.map((type, index) => (
                <Box >
                  <Card sx={{ maxWidth: '100%', margin: 1.5 }}>
                    <CardHeader
                      sx={{ p: 3 }}
                      avatar={
                        <Avatar sx={{ bgcolor: 'red[500]' }} aria-label="recipe">
                          T
                        </Avatar>
                      }
                      action={
                        <IconButton onClick={openMenu} aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={type.name}

                      subheader={<Typography variant="body" gutterBottom>
                        Max. mark: {type.max_mark} </Typography>}

                    />
                  </Card>
                  <Menu
                    open={Boolean(anchor)}
                    anchorEl={anchor}
                    onClose={closeMenu}
                    keepMounted
                  >
                    {options.map((option, index) => (
                      <MenuItem
                        key={index}
                        onClick={(event) => onMenuItemClick(event, index)}
                        selected={index === selected}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ))
            }

          </Container>
          {open &&
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              style={{ display: 'flex', alignItems: 'center', jusitifyContent: 'center' }}
            >
              <Box sx={style}>
                <div style={{ display: 'flex' }}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    style={{ marginLeft: '1em' }}
                  >
                    Submission Type
                  </Typography>
                </div>
                {/* 
                <TextField
                  fullWidth
                  type="text"
                  // name="name"
                  // value={touched.name}
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{ marginTop: '1em' }} label="name"/>

                <TextField
                  fullWidth
                  type="number"
                  // name="max_mark"
                  // value={touched.max_mark}
                  {...getFieldProps('max_mark')}
                  error={Boolean(touched.max_mark && errors.max_mark)}
                  helperText={touched.max_mark && errors.max_mark}
                  sx={{ marginTop: '1em' }} label="max_mark" />

                <Autocomplete
                  multiple
                  id="outlined-multi"
                  options={listSemisterResponse?.results}
                  isOptionEqualToValue={(option, value) => option.name === value.name}
                  getOptionLabel={(option) => option.name}
                  defaultValue={[]}
                  value={groupMembers}
                  onChange={handleGroupMemberChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="semisters"
                      placeholder="select semisters"
                    />
                  )}
                  sx={{ marginTop: '1em' }}
                /> */}
                {/* 
                <TextField
                  style={{ marginRight: '10px', marginBottom: '1em' }}
                  fullWidth
                  autoComplete="first name"
                  type="text"
                  label="first name"
                  onChange={(e)=>handlechange(e)}
                  {...getFieldProps('first_name')}
                  error={Boolean(touched.first_name && errors.first_name)}
                  helperText={touched.first_name && errors.first_name}
                /> */}



                <form onSubmit={handleSubmit}>
                  {/* <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  /> */}
                  <TextField
                    data-cy='name'
                    required='true'
                    fullWidth
                    type="text"
                    id="name"
                    minlength="3"
                    // name="name"
                    // value={touched.name}
                    onChange={handleChange}
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    sx={{ marginTop: '1em' }} label="name" />

                  <TextField
                    data-cy='mark'
                    fullWidth
                    type="number"
                    id="max"
                    // name="max_mark"
                    // value={touched.max_mark}
                    onChange={handleChange}
                    {...getFieldProps('max_mark')}
                    error={Boolean(touched.max_mark && errors.max_mark)}
                    helperText={touched.max_mark && errors.max_mark}
                    sx={{ marginTop: '1em' }} label="max_mark" />

                  <Autocomplete
                    data-cy='semister'
                    multiple
                    id="outlined-multi"
                    options={listSemisterResponse?.results}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    getOptionLabel={(option) => option.name}
                    defaultValue={[]}
                    value={groupMembers}
                    onChange={handleGroupMemberChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="semisters"
                        placeholder="select semisters"
                      />
                    )}
                    sx={{ marginTop: '1em' }}
                  />
                  <Button data-cy='submitbtnsubmissiontype' color="primary" variant="contained" fullWidth type="submit">
                    Submit
                  </Button>
                </form>
                <div style={{ display: 'flex', marginTop: '2em', justifyContent: 'right' }}>
                  <Button data-cy='cancel' onClick={handleCancel} variant="contained" color="error">
                    Cancel
                  </Button>
                  {/* <Button type='submit' variant="contained" sx={{ marginLeft: '1em' }}>
                    Save
                  </Button> */}
                </div>
              </Box>
            </Modal>
          }
        </Page>
      } </>
  );
}

export default SubmissionType