import { Avatar, Box, Button, Card, Container, Divider, Modal, Stack, Switch, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Page from 'src/components/Page'
import { Link as RouterLink } from 'react-router-dom';
import Iconify from 'src/components/Iconify';
import { Form, Formik, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import { listSemister, AddSemister } from '../Redux/Submission/action'
const style = {
  margin: 'auto',
  width: 700,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4
};

function Semister() {


  const [open, setOpen] = useState(false, 'a');
  const [groupName, setGroupName] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);
  const dispatch = useDispatch();
  const {
    listSemisterResponse,
    listSemisterLoading,
    listSemisterErrMsg } = useSelector(state => state.co_deadline);
  console.log(listSemisterResponse.results);

  useEffect(() => {
    dispatch(listSemister())
  }, [dispatch])


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    setOpen(false);
    setGroupName('');
    setGroupMembers([]);
  };


  const handleSubmitt = (e) => {
    console.log(groupName);
    console.log(groupMembers);
  };



  const schema = Yup.object().shape({
    name: Yup.string().required('name is Empty')
  });

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values.name);
      dispatch(AddSemister({ name: values.name }));
      handleClose()
    }
  });
  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <>
      {listSemisterLoading ? (
        <Box mt="20%" ml="45%" style={{ textAlign: 'center', justifyContent: 'center', alignSelf: 'center' }}>
          <ReactLoading
            type={"spinningBubbles"}
            color={"#3B7BBC"}
            height='10%'
            width='10%'
          />
        </Box>
      ) : listSemisterErrMsg !== '' ? (
        <Box mt="20%" ml="45%" style={{ textAlign: 'center', justifyContent: 'center', alignSelf: 'center' }}>
          {listSemisterErrMsg}
        </Box>
      ) :
        <Page title='semister'>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Semister
              </Typography>
              <Button
                data-cy='addnewsemister'
                variant="contained"
                component={RouterLink}
                to="#"
                onClick={() => handleOpen()}
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Add New Semister
              </Button>
            </Stack>

            {
              listSemisterResponse?.results?.map((semister, index) => (
                <Card>
                  <Box sx={{ p: 2, mt: 2, display: 'flex' }}>
                    <Avatar sx={{ bgcolor: 'theme.primary' }}>S</Avatar>
                    <Typography sx={{ p: 1 }} fontWeight={700}>{semister.name}</Typography>
                  </Box>
                  <Divider />
                  <Stack
                    direction="row"
                    alignItems="end"
                    sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
                  >
                    {/* <Switch /> */}
                  </Stack>
                </Card>
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
                    Add Semister
                  </Typography>
                </div>
                <TextField
                  data-cy='semisername'
                  fullWidth
                  type="text"
                  name="semister"
                  value={touched.name}
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{ marginTop: '1em' }} label="semister" id="fullWidth" />

                <div style={{ display: 'flex', marginTop: '2em', justifyContent: 'right' }}>
                  <Button onClick={handleCancel} variant="contained" color="error">
                    Cancel
                  </Button>
                  <Button data-cy='submitbtn' onClick={handleSubmit} variant="contained" sx={{ marginLeft: '1em' }}>
                    Save
                  </Button>
                </div>
              </Box>
            </Modal>
          }
        </Page>
      }</>)
}

export default Semister