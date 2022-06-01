import { filter, values } from 'lodash';
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
  CircularProgress
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

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStudentAsync, uploadStudentAsync } from '../Redux/AdminAction';

import RegistrationTab from './adminComponent/RegistrationTab';
import { listStudent } from '../Redux/staff/action';

// ----------------------------------------------------------------------

const AdminGetStudentList = () => {
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

  const [uploadOpen, setUploadOpen] = useState(false);
  const handleUploadOpen = () => setUploadOpen(true);
  const handleUploadClose = () => setUploadOpen(false);

  const [isloading, setisLoading] = useState(false);

  const { students, isLoading, errorMsg } = useSelector((state) => state.ad_student);

  useEffect(() => {
    dispatch(listStudent());
  }, [dispatch]);

  const style = {
    margin: 'auto',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4
  };

  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('username is required'),
    email: Yup.string().required('email is required'),
    batch: Yup.string().required('batch is required'),
    first_name: Yup.string().required('first name is required'),
    last_name: Yup.string().required('last name is required')
  });

  const createFormik = useFormik({
    initialValues: {
      username: '',
      email: '',
      batch: '',
      first_name: '',
      last_name: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      const data = {
        username: values.username,
        email: values.email,
        batch: 2014,
        first_name: values.first_name,
        last_name: values.last_name
      };
      setisLoading(true);
      dispatch(createStudentAsync(data));
      setisLoading(false);
    }
  });
  const { errors, touched, handleSubmit, getFieldProps } = createFormik;

  const UploadSchema = Yup.object().shape({
    data: Yup.string().required('data is required')
  });

  const uploadFormik = useFormik({
    initialValues: {
      data: ''
    },
    validationSchema: UploadSchema,
    onSubmit: (values) => {
      const file = {
        data: values.data
      };
      setisLoading(true);
      dispatch(uploadStudentAsync(file));
      setisLoading(false);
    }
  });
  const { uploadErrors, uploadTouched, uploadHandleSubmit, getUploadFieldProps } = uploadFormik;

  const TABLE_HEAD = [
    { id: 'id', label: 'ID', alignRight: false },
    { id: 'first_name', label: 'First Name', alignRight: false },
    { id: 'last_name', label: 'Last Name', alignRight: false },
    { id: 'username', label: 'Username', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'batch', label: 'Batch', alignRight: false }
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
      return filter(
        array,
        (_student) => _student.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
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
      const newSelecteds = students.map((student) => student.user);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0;

  const filteredUsers = applySortFilter(students, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  if (isLoading || !students) {
    return (
      <Page title="Admin | Site-Repo">
        <h1>Student</h1>
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
  return (
    <Page title="Student">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Students
          </Typography>
          <Button
            data-cy='addstudentbtn'
            variant="contained"
            onClick={handleOpen}
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Students
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ display: 'flex', alignItems: 'center', jusitifyContent: 'center' }}
          >
            <Box sx={style}>
              <RegistrationTab />
            </Box>
          </Modal>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

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
                  {filteredUsers
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((student) => {
                      const { user, username, email, batch, first_name, last_name } = student;
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
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, user)}
                            />
                          </TableCell>
                          <TableCell align="left">{user}</TableCell>
                          <TableCell align="left">{first_name}</TableCell>
                          <TableCell align="left">{last_name}</TableCell>
                          <TableCell align="left">{username}</TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{batch}</TableCell>
                          <TableCell align="right">
                            <UserMoreMenu username={username} user={user} initial="student" />
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
};

export default AdminGetStudentList;
