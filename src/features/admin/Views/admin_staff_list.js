import Page from "src/components/Page";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { CircularProgress } from "@mui/material";

import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchStaffAsync } from "../Redux/AdminAction";


const  AdminGetStaffList = ()=> {

  const dispatch = useDispatch();

  const { staffs,fetchStaffLoading,fetchStaffFailure } = useSelector(
    (state) => state.admin);
    
  useEffect(() => {
      dispatch(fetchStaffAsync());

    },[dispatch]);
  // useEffect(()=>{
  //   dispatch(updateStaffAsync());
  // });


  // useEffect(()=>{
  //   dispatch(deleteStaffAsync());
  // });


  const editStaffData = ()=>{
   
  };

  const deleteStaffData = ()=>{

  };

  var  n = 0;

   if (fetchStaffLoading || !staffs) {
    return (

        <Page title="Admin | Site-Repo">
            <h1>Staff Members</h1>
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
  if (fetchStaffFailure) {
    return (

        <Page title="Admin | Site-Repo">
            <h1>some error has occurred </h1>
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
  return (
    <Page title="Admin | Site-Repo">
        <h1>Staff Members</h1>
        
    <AddIcon style={{
               width:"190%",
               alignContent:"end",
               alignItems:"right",
               color:"green",
  
          }}
               
               />

    <TableContainer component={Paper}>
     <Table aria-label="simple table">
       <TableHead>
         <TableRow>
           <TableCell>No</TableCell>
           <TableCell align="left">Username</TableCell>
           <TableCell align="left">Email</TableCell>
           <TableCell align="left">Edit</TableCell>
           <TableCell align="left">Delete</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
        

          {staffs.map((staff) => (
           <TableRow key={staff.user.username}>
             <TableCell component="th" scope="row">{n=n+1} </TableCell>
             <TableCell align="left">{staff.user.username}</TableCell>
             <TableCell align="left">{staff.user.email}</TableCell>
             <TableCell align="left"><EditIcon style={{color:"green"}} onClick= { editStaffData }/></TableCell>
             <TableCell align="left"><DeleteIcon style={{color:"green"}} onClick= { deleteStaffData }/></TableCell>

           </TableRow>
         ))}

       </TableBody>
     </Table>
   </TableContainer>
    </Page>
  );
}

  

 export default AdminGetStaffList;