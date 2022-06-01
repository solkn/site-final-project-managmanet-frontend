import { filter, values } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as Yup from 'yup';
// import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
// import { StaffRegisterWithForm } from '../../Redux/staff/action';
import { useNavigate } from 'react-router-dom';
import * as react from 'react';
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
  // Typography,
  TextField,
  CircularProgress,
  TableContainer,
  TablePagination
  // CircularProgress
} from '@mui/material';
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import Iconify from '../../../components/Iconify';
import SearchNotFound from '../../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../sections/@dashboard/user';

// import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import * as Yup from 'yup';
// import { motion } from 'framer-motion';
import { useFormik, Form, FormikProvider } from 'formik';
// import { TextField } from '@mui/material';
// import { LoadingButton } from '@mui/lab';

import { useEffect } from 'react';
import { fetchStaffAsync } from '../Redux';
import { StaffRegisterWithForm } from '../Redux/staff/action';
// import { useSelector } from 'react-redux';
// import {fetchStaffAsync,} from '../../Redux/AdminAction';
// import RegistrationTab from './adminComponent/RegistrationTab';

// ----------------------------------------------------------------------

const AdminGetStaffList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = react.useState(0);

  const [order, setOrder] = react.useState('asc');

  const [selected, setSelected] = react.useState([]);

  const [orderBy, setOrderBy] = react.useState('name');

  const [filterName, setFilterName] = react.useState('');

  const [rowsPerPage, setRowsPerPage] = react.useState(5);

  const [open, setOpen] = react.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const [isLoading, setisLoading] = react.useState(false);

  const { staffs, fetchStaffLoading, fetchStaffFailure } = useSelector((state) => state.admin);

  const { isSuccess, response, errorMsg, isLoading } = useSelector((state) => state.ad_staff);
  console.log(response);
  console.log(errorMsg);

  const [value, setValue] = react.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
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
        first_name: values.first_name,
        last_name: values.last_name
      };
      console.log('data:', values);
      dispatch(StaffRegisterWithForm(data));
      formik.resetForm();
    }
  });
  const { errors, touched, handleSubmit, getFieldProps } = formik;

  useEffect(() => {
    dispatch(fetchStaffAsync());
  }, [dispatch]);

  const style = {
    margin: 'auto',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4
  };

  const TABLE_HEAD = [
    { id: 'id', label: 'ID', alignRight: false },
    { id: 'username', label: 'Username', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'first_name', label: 'First Name', alignRight: false },
    { id: 'last_name', label: 'Last Name', alignRight: false },
    { id: 'Actions', label: 'Actions', alignRight: true }
  ];

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
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(
        array,
        (_staff) => _staff.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
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
      const newSelecteds = staffs.map((staff) => staff.user);
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
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - staffs.length) : 0;

  const filteredUsers = applySortFilter(staffs, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  if (fetchStaffLoading || !staffs) {
    return (
      <Page title="Admin | Site-Repo">
        <h1>Staff</h1>
        <div
          style={{
            width: '100%',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress />
        </div>
      </Page>
    );
  }
  if (fetchStaffFailure) {
    return (
      <Page title="Admin | Site-Repo">
        <h1>Fetching staff Failed </h1>
        <div
          style={{
            width: '100%',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        ></div>
      </Page>
    );
  }
  return (
    <Page title="Staff">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Staff
          </Typography>
          <Button
            data-cy="addstaffbtn"
            variant="contained"
            onClick={handleOpen}
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New staff 
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ display: 'flex', alignItems: 'center', jusitifyContent: 'center' }}
          >
            <Box sx={style}>
              {isLoading ? (
                <Box style={{ textAlign: 'center', justifyContent: 'center', alignSelf: 'center' }}>
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
                  {isSuccess ? (
                    <Box
                      style={{ textAlign: 'center', justifyContent: 'center', alignSelf: 'center' }}
                    >
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        style={{ marginLeft: '1em', color: 'green' }}
                      >
                        Successfully added
                      </Typography>
                    </Box>
                  ) : null}

                  <div style={{ display: 'flex' }}>
                    <TextField
                      style={{ marginRight: '10px', marginBottom: '1em' }}
                      data-cy='first_name'
                      fullWidth
                      autoComplete="first name"
                      type="text"
                      label="first name"
                      {...getFieldProps('first_name')}
                      error={Boolean(touched.first_name && errors.first_name)}
                      helperText={touched.first_name && errors.first_name}
                    />
                    <TextField
                      style={{ marginBottom: '1em' }}
                      data-cy='last_name'
                      fullWidth
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
                    data-cy='username'
                    fullWidth
                    autoComplete="username"
                    type="text"
                    label="username"
                    {...getFieldProps('username')}
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                  />
                  <TextField
                    style={{ marginBottom: '1em' }}
                    data-cy='email'
                    fullWidth
                    autoComplete="email"
                    type="text"
                    label="email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <div style={{ display: 'flex', marginTop: '2em', justifyContent: 'right' }}>
                    <Button onClick={() => handleClose} variant="contained" color="error">
                      Cancel
                    </Button>
                    <Button data-cy='staffregisterbtn' onClick={handleSubmit} variant="contained" sx={{ marginLeft: '1em' }}>
                      Save
                    </Button>
                  </div>
                  {/* </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              From File
            </TabPanel>
          </SwipeableViews> */}
                </Box>
              )}
            </Box>
          </Modal>
        </Stack>

        <Card id='cardstaff'>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <Scrollbar id='scrollable'>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={staffs.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((staff) => {
                      const { user, username, email, first_name, last_name, avatarUrl } = staff;
                      const isItemSelected = selected.indexOf(user) !== -1;

                      return (
                        <TableRow
                        id='tablerow'
                          hover
                          key={user}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, user)}
                            />
                          </TableCell>
                          <TableCell align="left">{user}</TableCell>
                          <TableCell align="left">{username}</TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{first_name}</TableCell>
                          <TableCell align="left">{last_name}</TableCell>
                          <TableCell id='tablecell' align="right">
                            <UserMoreMenu   username={username} user={user} initial="staff" />
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
            count={staffs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
};

export default AdminGetStaffList;
