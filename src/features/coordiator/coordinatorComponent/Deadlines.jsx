import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useDispatch, useSelector } from 'react-redux';
import { AddDeadline, listDeadlines, listSubmissionType } from '../Redux/Submission/action';
import ReactLoading from 'react-loading';
import { Form, Formik, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Autocomplete, Button, Modal, TextField } from '@mui/material';
import Iconify from 'src/components/Iconify';
import { Link as RouterLink } from 'react-router-dom'
import moment from 'moment';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib



function createData(name, semister, maxmark, deadline) {
  return {
    name,
    semister,
    maxmark,
    deadline
  };
}
// const rows = [
//   createData('SRS', 305, 3.7),
//   createData('SDS', 452, 25.0),
//   createData('Title Submission', 262, 16.0,),

// ];

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

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'semister',
    numeric: true,
    disablePadding: false,
    label: 'Semister',
  },
  {
    id: 'Max.Mark',
    numeric: true,
    disablePadding: false,
    label: 'Max.Mark',
  },

  {
    id: 'deadline',
    numeric: true,
    disablePadding: false,
    label: 'Deadline',
  },

];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
const style = {
  margin: 'auto',
  width: 700,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4
};
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  // rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Deadlines
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function Deadlines() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('remaining');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false, 'a');
  const [groupName, setGroupName] = React.useState('');
  const [groupMembers, setGroupMembers] = React.useState([]);
  const dead_lines = []
  const [dateValue, setdateValue] = React.useState()
  // const [row, setrow] = useState([])

  const handleDateValue = (e) => {
    console.log(e.target.value);
    setdateValue(e.target.value)
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCancel = () => {
    setOpen(false);
    setGroupName('');
    setGroupMembers([]);
  };

  const handleGroupMemberChange = (e, value) => {
    console.log(value);
    setGroupMembers(value);

  };



  const { isLoading, errorMsg, deadlines, listSubTResponse } = useSelector(state => state.co_deadline);
  console.log(listSubTResponse.results);
  //  deadlines.results.length!==0? deadlines?.results?.map((s)=>(

  //  )) : [];

  React.useEffect(() => {
    dispatch(listDeadlines());
    dispatch(listSubmissionType());
  }, [dispatch])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = deadlines?.results?.map((n) => n.name.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
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

  //   const handleChangeDense = (event) => {
  //     setDense(event.target.checked);
  //   };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - deadlines.length) : 0;


  const validationSchema = Yup.object({
    name: Yup.string().required('name is Empty'),
    dead_line: Yup.string().required('dead_line is Empty')

  });


  const formik = useFormik({
    initialValues: {
      name: '',
      batch: '2014',
      dead_line: '',

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        batch: '2014',
        dead_line: moment().format('YYYY-MM-DD h:mm:ss')
      }
      // dispatch(AddDeadline(data))
      alert(JSON.stringify(values, null, 2));
    },
  });
  const [selectedDate, handleDateChange] = React.useState(moment().format('YYYY-MM-DD h:mm:ss'));
const seechanges=(e)=>{
  console.log(moment().format('YYYY-MM-DD h:mm:ss'));
}
  const { resetForm, errors, handleChange, touched, handleSubmit, getFieldProps } = formik;

  return (
    <>
      {isLoading ? (
        <Box mt="20%" ml="45%" style={{ textAlign: 'center', justifyContent: 'center', alignSelf: 'center' }}>
          <ReactLoading
            type={"spinningBubbles"}
            color={"#3B7BBC"}
            height='10%'
            width='10%'
          />
        </Box>
      ) : errorMsg !== '' ? (
        <Box mt="20%" ml="45%" style={{ textAlign: 'center', justifyContent: 'center', alignSelf: 'center' }}>
          {errorMsg}
        </Box>
      ) :
        (
          <>

            <Button
              variant="contained"
              component={RouterLink}
              to="#"
              onClick={() => handleOpen()}
              startIcon={<Iconify icon="eva:plus-fill" />}
              sx={{ mb: 2 }}
            >
              Add Deadline
            </Button>
            <Box sx={{ width: '100%' }}>

              <Paper sx={{ width: '100%', mb: 2 }}>

                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size='medium'
                  >
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={deadlines?.results?.length}
                    />
                    <TableBody>
                      {stableSort(deadlines?.results, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          const isItemSelected = isSelected(row.name.name);
                          const labelId = `enhanced-table-checkbox-${index}`;
                          return (
                            <TableRow
                              hover
                              onClick={(event) => handleClick(event, row.name.name)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.name.name}
                              selected={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  color="primary"
                                  checked={isItemSelected}
                                  inputProps={{
                                    'aria-labelledby': labelId,
                                  }}
                                />
                              </TableCell>
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                              >
                                {row.name.name}
                              </TableCell>
                              <TableCell align="right">{row.name.semister}</TableCell>

                              <TableCell align="right">{row.name.max_mark}</TableCell>
                              <TableCell align="right">{row.dead_line}</TableCell>

                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: 53 * emptyRows,
                          }}
                        >
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={deadlines?.results.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
              {open &&
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  style={{ display: 'flex', alignItems: 'center', jusitifyContent: 'center' }}
                >
                  <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                      <div style={{ display: 'flex' }}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                          style={{ marginLeft: '1em' }}
                        >
                          deadline
                        </Typography>
                      </div>

                      <Autocomplete
                        multiple
                        id="outlined-multi"
                        options={listSubTResponse?.results}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        getOptionLabel={(option) => option.name}
                        defaultValue={[]}
                        value={groupMembers}
                        onChange={handleGroupMemberChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="submission type"
                            placeholder="select submission type"
                            fullWidth
                            type="text"
                            name="batch"
                            value={touched.name}
                            {...getFieldProps('batch')}
                            error={Boolean(touched.name && errors.name)}
                            helperText={touched.name && errors.name}
                            sx={{ marginTop: '1em' }} id="f"
                          />
                        )}
                        sx={{ marginTop: '1em' }}
                      />

                      {/* <TextField
                      fullWidth
                      type="text"
                      name="batch"
                      value={touched.batch}
                      {...getFieldProps('batch')}
                      error={Boolean(touched.batch && errors.batch)}
                      helperText={touched.batch && errors.batch}
                      sx={{ marginTop: '1em' }} label="batch" id="fullWidth" /> */}
                      {/* <TextField
                        fullwidth
                        name="dead_line"
                        id="datetime-local"
                        // label="set deadline"
                        type=""
                        defaultValue={moment().format('YYYY-MM-DD h:mm:ss')}
                        onChange={(e) => handleDateValue(e)}
                        sx={{ marginTop: '1em' }}

                      /> */}
                      <MuiPickersUtilsProvider fullwidth sx={{ marginTop: '1em' }} utils={DateFnsUtils}>
                        <DateTimePicker format={moment().format('YYYY-MM-DD h:mm:ss')} autoOk minDate={moment().format('YYYY-MM-DD h:mm:ss')} value={selectedDate} onChange={(e)=>seechanges(e)} />
                      </MuiPickersUtilsProvider>


                      <div style={{ display: 'flex', marginTop: '2em', justifyContent: 'right' }}>
                        <Button onClick={handleCancel} variant="contained" color="error">
                          Cancel
                        </Button>
                        <Button type="submit" variant="contained" sx={{ marginLeft: '1em' }}>
                          Save
                        </Button>
                      </div>
                    </form>
                  </Box>
                </Modal>
              }
            </Box>
          </>
        )}
    </>
  );
}
