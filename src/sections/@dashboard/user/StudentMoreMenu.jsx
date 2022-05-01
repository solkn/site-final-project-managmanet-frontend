import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { 
  Menu, 
  MenuItem, 
  IconButton, 
  ListItemIcon, 
  ListItemText, 
  Modal,
  Stack,
  TextField
} from '@mui/material';
import * as Yup from 'yup';

// component
import Iconify from '../../../components/Iconify';
import { assignCoordinator } from 'src/features/admin/Redux/assignCoordinator/action';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentAsync, deleteStudentAsync, updateStudentAsync } from 'src/features/admin/Redux/AdminAction';
import { Form, FormikProvider, useFormik } from 'formik';
import { Box } from '@mui/system';
import { motion } from 'framer-motion';
import Typography from 'src/theme/overrides/Typography';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function StudentMoreMenu({ username, initial }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setisLoading] = useState(false);

  const state = useSelector((state) => state.assign);
  const { students,fetchStaffLoading,fetchStaffFailure,deleteStaffLoading,deleteStaffFailure } = useSelector(
    (state) => state.admin);
  console.log(state);
  console.log(username);


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


  const onDeleteStudent = (id) => {
    dispatch(deleteStudentAsync(id));
    dispatch(fetchStudentAsync());
    //dispatch(fetchStudentAsync());

  }


 
  const onAssignClick = () => {
    console.log('menu item dispatch is clicked: ');
    const coordinator = { user: username, batch: '2014' };
    dispatch(assignCoordinator(coordinator));
  };


  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('username is required'),
    email: Yup.string().required('email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'invalid email'),
    batch:Yup.string().required('batch is required'),
    first_name: Yup.string().required('first name is required'),
    last_name: Yup.string().required('last name is required'),
  });



  const formik = useFormik({
    initialValues: {
      username: '',
      email:'',
      batch:'',
      first_name:'',
      last_name:'',
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
     setisLoading(true);
     const  data =  { 
       username:values.username,
       email:values.email,
       batch:values.batch,
       first_name:values.first_name,
       last_name:values.last_name 
      };
      
      dispatch(updateStudentAsync(data));
      setisLoading(false);
      dispatch(fetchStudentAsync());
      handleClose();
     
      }
  });
  const { errors, touched, handleSubmit, getFieldProps } = formik;
  

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>
    
    {
      students.map((student)=>(
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {initial === 'staff' ? (
          <MenuItem onClick={() => onAssignClick()} sx={{ color: 'text.secondary' }}>
            <ListItemIcon>
              <Iconify icon="ic:round-assignment-ind" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Assign" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        ) : null}

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" onClick={handleOpen} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={()=>onDeleteStudent(student.id)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>


      
 <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>

<motion.div
      whileInView={{ opacity: [0, 1] }}
      initial={{ x: -150 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
    >
      <>
        <Stack sx={{ mb: 1 }}>
          <Typography variant="h4" gutterBottom>
            Site Final Project-Repo
          </Typography>
        </Stack>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                autoComplete="username"
                type="text"
                label="username"
                {...getFieldProps('username')}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
              />

               <TextField
                fullWidth
                autoComplete="email"
                type="text"
                label="email"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                fullWidth
                autoComplete="batch"
                type="text"
                label="batch"
                {...getFieldProps('batch')}
                error={Boolean(touched.batch && errors.batch)}
                helperText={touched.batch && errors.batch}
              />    

            
              <TextField
                fullWidth
                autoComplete="first name"
                type="text"
                label="first name"
                {...getFieldProps('first_name')}
                error={Boolean(touched.first_name && errors.first_name)}
                helperText={touched.first_name && errors.first_name}
              />
            <TextField
                fullWidth
                autoComplete="last name"
                type="text"
                label="last name"
                {...getFieldProps('last_name')}
                error={Boolean(touched.last_name && errors.last_name)}
                helperText={touched.last_name && errors.last_name}
              />    
            <LoadingButton
              fullWidth
              color="primary"
              size="large"
              type="submit"
              variant="contained"
              loading={isLoading}
            >
              Update
            </LoadingButton>
            
            </Stack>

            
          </Form>
        </FormikProvider>
      </>
    </motion.div>
        </Box>
      </Modal>


      </Menu>

      ))
}
    </>
  );
}
