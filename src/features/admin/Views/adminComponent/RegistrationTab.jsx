import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, CircularProgress, FormControl, Input, Modal, Stack, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createStaffAsync } from '../../Redux';
import { StaffRegisterWithForm, StudentRegisterWithFile, StudentRegisterWithForm } from '../../Redux/staff/action';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { motion } from 'framer-motion';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const RegistrationTab = () => {
  const theme = useTheme();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [Open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    return navigate('/admin/staff');
  };
  const { addStudentLoading,
    addStudentResponse,
    addStudentErrMsg, response, errorMsg, isLoading } = useSelector(state => state.add_student);
  console.log(response);
  console.log(errorMsg);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  ///upload
  const [file, setFile] = React.useState();
  const [filaName, setFileName] = React.useState('Choose File');
  const [loading, setloading] = React.useState(false);
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const handleUploadOpen = () => setUploadOpen(true);
  const handleUploadClose = () => setUploadOpen(false);
  const onFileChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const onUpload = async (values) => {
    setloading(true);
    var formData = new FormData();
    formData.append('file', file);
    console.log("form values:", values);
    console.log("formData:", formData);
    dispatch(StudentRegisterWithFile(formData));
    setloading(false);
    handleClose();
  }

  const UploadSchema = Yup.object().shape({
    data: Yup.string().required('students file is required'),
  });
  const uploadFormik = useFormik({
    initialValues: {},
    validationSchema: UploadSchema,
    onSubmit: (values) => {
      setloading(true);
      var formData = new FormData();
      formData.append('file', file);
      formData = values;
      dispatch(StudentRegisterWithFile(formData));
      setloading(false);
      handleClose();
    }
  });

  const { uploadErrors, uploadTouched, handleUploadSubmit, getUploadFieldProps } = uploadFormik;

  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('username is required'),
    email: Yup.string().required('email is required'),
    first_name: Yup.string().required('first name is required'),
    last_name: Yup.string().required('last name is required')
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      first_name: '',
      last_name: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      const data = {
        username: values.username,
        email: values.email,
        batch: '2014',
        first_name: values.first_name,
        last_name: values.last_name
      };
      console.log('data:', values);
      dispatch(StudentRegisterWithForm(data));
      formik.resetForm();
    }
  });
  const { errors, touched, handleSubmit, getFieldProps } = formik;
  
  return (
    <>
      {isLoading ? (
        <Box
          style={{ textAlign: 'center', justifyContent: 'center', alignSelf: 'center' }}
        >
          <CircularProgress width={200} height={200} />
        </Box>
      ) : errorMsg !== '' ? (
        <Box
          mt="20%"
          ml="45%"
          style={{ textAlign: 'center', justifyContent: 'center', alignSelf: 'center' }}
        >
          {errorMsg}
        </Box>
      ) : (

        <Box sx={{ bgcolor: 'background.paper', width: 'auto' }}>
          <div>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ marginLeft: '1em' }}
            >
              Register
            </Typography>
          </div>

          <AppBar style={{ background: '#2E3B55' }} elevation={0} position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Form" {...a11yProps(0)} />
              <Tab label="File" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <div style={{ display: 'flex' }}>
                <TextField
                  style={{ marginRight: '10px', marginBottom: '1em' }}
                  fullWidth
                  data-cy="first_name"
                  autoComplete="first name"
                  type="text"
                  label="first name"
                  {...getFieldProps('first_name')}
                  error={Boolean(touched.first_name && errors.first_name)}
                  helperText={touched.first_name && errors.first_name}
                />
                <TextField
                  style={{ marginBottom: '1em' }}
                  fullWidth
                  data-cy="last_name"
                  autoComplete="last name"
                  type="text"
                  label="last name"
                  {...getFieldProps('last_name')}
                  error={Boolean(touched.last_name && errors.last_name)}
                  helperText={touched.last_name && errors.last_name}
                />{' '}
              </div>
              <TextField
                style={{ marginBottom: '1em' }}
                fullWidth
                data-cy="username"
                autoComplete="username"
                type="text"
                label="username"
                {...getFieldProps('username')}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
              />
              <TextField
                style={{ marginBottom: '1em' }}
                fullWidth 
                data-cy="email"
                autoComplete="email"
                type="text"
                label="email"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <div style={{ display: 'flex', marginTop: '2em', justifyContent: 'right' }}>
                <Button data-cy="cancelbtnclick" onClick={() => handleCancel} variant="contained" color="error">
                  Cancel
                </Button>
                <Button data-cy="studentregisterbtn" onClick={handleSubmit} variant="contained" sx={{ marginLeft: '1em' }}>
                  Save
                </Button>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <FormControl initialValues={{}} onSubmit={onUpload}>
                <Input disableUnderline type="file" name="file" onChange={onFileChange} />
                <div style={{ display: 'flex', marginTop: '2em', justifyContent: 'right' }}>
                  <Button onClick={() => handleCancel} variant="contained" color="error">
                    Cancel
                  </Button>
                  {/* <Button onClick={handleSubmit} variant="contained" sx={{ marginLeft: '1em' }}>
                    Save
                  </Button> */}
                  <LoadingButton

                    color="primary"
                    size="medium"
                    type="submit"
                    variant="contained"
                    loading={addStudentLoading}
                    onClick={onUpload}
                    sx={{ marginLeft: '1em' }}
                  >
                    submit
                  </LoadingButton>
                </div>
                {/* <LoadingButton
                  fullWidth
                  color="primary"
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                  onClick={onUpload}
                >
                  upload
                </LoadingButton> */}
              </FormControl>
            </TabPanel>
          </SwipeableViews>
        </Box>)} </>
  );
}

export default RegistrationTab;