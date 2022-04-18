import { filter } from 'lodash';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress,
} from '@mui/material';
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import Iconify from '../../../components/Iconify';
import SearchNotFound from '../../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../sections/@dashboard/user';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useFormik, Form, FormikProvider } from 'formik';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchStudentAsync,createStudentAsync,uploadStudentAsync } from "../Redux/AdminAction";


// ----------------------------------------------------------------------


const  AdminGetStudentList = ()=> {

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [uploadOpen,setUploadOpen] = useState(false);
  const handleUploadOpen = () => setUploadOpen(true);
  const handleUploadClose = () => setUploadOpen(false);

  const [isLoading, setisLoading] = useState(false);

  const { students,fetchStudentLoading,fetchStudentFailure } = useSelector(
    (state) => state.admin);
    
  useEffect(() => {
      dispatch(fetchStudentAsync());

    },[dispatch]);

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



  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('username is required'),
    email: Yup.string().required('email is required'),
    password: Yup.string().required('password is required'),
    password2: Yup.string().required('password2 is required'),
    batch: Yup.string().required('batch is required'),
    first_name: Yup.string().required('first name is required'),
    last_name: Yup.string().required('last name is required'),
  });



  const createFormik = useFormik({
    initialValues: {
      username: '',
      email:'',
      password:'',
      password2:'',
      batch:'',
      first_name:'',
      last_name:'',
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      const  data =  { 
        username:values.username,
        email:values.email,
        password:values.password,
        password2:values.password2,
        batch:values.batch,
        first_name:values.first_name,
        last_name:values.last_name 
       };
      setisLoading(true);
      dispatch(createStudentAsync(data));
      setisLoading(false);
      }
  });
  const { errors, touched, handleSubmit, getFieldProps } = createFormik;



  const UploadSchema = Yup.object().shape({
    data: Yup.string().required('data is required'),
  });



  const uploadFormik = useFormik({
    initialValues: {
      data: '',
    },
    validationSchema: UploadSchema,
    onSubmit: (values) => {
      const file = {
        data:values.data
      }
      setisLoading(true);
      dispatch(uploadStudentAsync(file));
      setisLoading(false);
      }
  });
  const { uploadErrors, uploadTouched, uploadHandleSubmit, getUploadFieldProps } = uploadFormik;




  
   if (fetchStudentLoading || !students) {
    return (

        <Page title="Admin | Site-Repo">
            <h1>Student</h1>
         <div
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress/>
        </div>  

        </Page>
    );
  }
  if (fetchStudentFailure) {
    return (

        <Page title="Admin | Site-Repo">
            <h1>Failed </h1>
         <div
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        </div>  

        </Page>
    );
  }

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'batch', label: 'Batch', alignRight: false },
  { id: 'first_name', label: 'First Name', alignRight: false },
  { id: 'last_name', label: 'Last Name', alignRight: false },


];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_student) => _student.username.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

  

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {

      const newSelecteds = students.map((student)=>student.user);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, user) => {
    const selectedIndex = selected.indexOf(user);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, user);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0;

  const filteredUsers = applySortFilter(students, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Student">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Student
          </Typography>
          <Button variant="contained" onClick={handleOpen} component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Student
          </Button>

          {/* <Button variant="contained" onClick={handleUploadOpen} component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            Upload
          </Button> */}


          <Modal
        keepMounted
        open={open}
        onClose={handleUploadClose}
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
        
      </>
    </motion.div>
        </Box>
      </Modal>  



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
        <FormikProvider value={createFormik}>
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
                autoComplete="password"
                type="text"
                label="password"
                {...getFieldProps('password')}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />

              <TextField
                fullWidth
                autoComplete="password2"
                type="text"
                label="password2"
                {...getFieldProps('password2')}
                error={Boolean(touched.password2 && errors.password2)}
                helperText={touched.password2 && errors.password2}
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
              Register
            </LoadingButton>
            
            </Stack>

            
          </Form>
        </FormikProvider>
      </>
    </motion.div>
        </Box>
      </Modal>  



        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={students.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => {

                    const { user,username,email,batch,first_name,last_name,avatarUrl} = student;

                    const isItemSelected = selected.indexOf(user) !== -1;



                    return (
                      <TableRow
                        hover
                        key={user}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, user)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={user} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {user}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{username}</TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{batch}</TableCell>
                        <TableCell align="left">{first_name}</TableCell>
                        <TableCell align="left">{last_name}</TableCell>

                        <TableCell align="right">
                          <UserMoreMenu initial="student"/>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}


export default AdminGetStudentList;