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
import { visuallyHidden } from '@mui/utils';
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import { listExaminerGroups } from '../redux/ExaminerAction';

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
    id: 'Id',
    numeric: false,
    disablePadding: true,
    label: 'Id'
  },
  {
    id: 'Group Name',
    numeric: true,
    disablePadding: false,
    label: 'Group Name'
  },
  {
    id: 'Group Members',
    numeric: true,
    disablePadding: false,
    label: 'Members'
  },

  {
    id: 'Title',
    numeric: true,
    disablePadding: false,
    label: 'Title'
  }
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
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

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const EnhancedTableToolbar = () => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
      }}
    >
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        Groups
      </Typography>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  // numSelected: PropTypes.number.isRequired
};

export default function ExaminerGroups() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('Id');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { groups, isLoading, errorMsg } = useSelector((state) => state.ex_group);
  console.log(groups);

  React.useEffect(() => {
    dispatch(listExaminerGroups());
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - groups.length) : 0;
  return (
    <>
      {isLoading ? (
        <Box
          mt="20%"
          ml="45%"
          style={{ textAlign: 'center', justifyContent: 'center', alignSelf: 'center' }}
        >
          <ReactLoading type={'spinningBubbles'} color={'#3B7BBC'} height="10%" width="10%" />
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
        <Box sx={{ width: '90%', margin: 'auto' }}>
          <Paper>
            <EnhancedTableToolbar />
            <TableContainer sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
              <Table sx={{ maxWidth: '100%' }} aria-labelledby="tableTitle" size="medium">
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={groups.length}
                />
                <TableBody>
                  {stableSort(groups, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          onClick={(event) =>
                            navigate('/examiner/examin', {
                              state: {}
                            })
                          }
                          tabIndex={-1}
                          key={index}
                        >
                          <TableCell component="th" scope="row" padding="none">
                          54
                          </TableCell>
                          <TableCell align="right">34</TableCell>
                          <TableCell align="right">23</TableCell>
                          <TableCell align="right">54</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows
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
              count={groups.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      )}
    </>
  );
}
