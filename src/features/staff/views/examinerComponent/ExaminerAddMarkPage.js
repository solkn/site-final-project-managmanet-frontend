import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

function createData(fname, lname, Id, mark) {
  return { fname, lname, Id, mark };
}

const rows = [
  createData('ABEBE', 'KEBEDE', 'ATR/3360/10', 0),
  createData('ABEBE', 'KEBEDE', 'ATR/3360/10', 0)
];

const CustomizedTables = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">fname</StyledTableCell>
            <StyledTableCell align="center">lname</StyledTableCell>
            <StyledTableCell align="center">Id</StyledTableCell>
            <StyledTableCell align="center">Mark</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="center" component="th" scope="row">
                {row.fname}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.lname}
              </StyledTableCell>
              <StyledTableCell align="center">{row.Id}</StyledTableCell>
              <StyledTableCell contentEditable={true}  align="center">{row.mark}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CustomizedTables;
