import { ADMINACTIONTYPES } from "./AdminType";
import  AdminStaffService  from "../services/admin_staff_service";
import  AdminStudentService from "../services/admin_student_service";

/**
 * STAFF FETCH ACTION
 * @returns ACTION
 */


export const fetchStaffStart = () =>({
  type:ADMINACTIONTYPES.STAFF_FETCH_START,
});

export const fetchStaffSuccess = (staff) =>({
  type:ADMINACTIONTYPES.STAFF_FETCH_SUCCESS,
  payload:{
    staff,
  },
});

export const fetchStaffFailure = (error) =>({
  type:ADMINACTIONTYPES.STAFF_FETCH_FAILURE,
  payload:{
    error,
  },
});

/**
 * STAFF UPDATE ACTION
 * @returns ACTION
 */

export const updateStaffStart = ()=>({
  type:ADMINACTIONTYPES.STAFF_UPDATE_START,
});

export const updateStaffSuccess = (staff)=>({
  type:ADMINACTIONTYPES.STAFF_UPDATE__SUCCESS,
  payload:{
    staff,
  },
});

export const updateStaffFailure = (error)=>({
  type:ADMINACTIONTYPES.STAFF_UPDATE_FAILURE,
  payload:{
    error,
  },
});

/**
 * STAFF DELETE ACTION
 * @returns ACTION
 */

export const deleteStaffStart = ()=>({
  type:ADMINACTIONTYPES.STAFF_DELETE_START,
});

export const deleteStaffSuccess = (staff)=>({
  type:ADMINACTIONTYPES.STAFF_DELETE_SUCCESS,
  payload:{
    staff,
  },
});

export const deleteStaffFailure = (error)=>({
  type:ADMINACTIONTYPES.STAFF_DELETE_FAILURE,
  payload:{
    error,
  },
});




/**
 * STUDENT FETCH ACTION
 * @returns ACTION
 */


 export const fetchStudentStart = () =>({
  type:ADMINACTIONTYPES.SUDENT_FETCH_START,
});

export const fetchStudentSuccess = (student) =>({
  type:ADMINACTIONTYPES.STUDENT_FETCH_SUCCESS,
  payload: {
    student,
  },
});

export const fetchStudentFailure = (error) =>({
  type:ADMINACTIONTYPES.STUDENT_FETCH_FAILURE,
  payload:{
    error,
  },
});

/**
 * STUDENT UPDATE ACTION
 * @returns ACTION
 */

export const updateStudentStart = ()=>({
  type:ADMINACTIONTYPES.STUDENT_UPDATE_START,
});

export const updateStudentSuccess = (staff)=>({
  type:ADMINACTIONTYPES.STUDENT_UPDATE__SUCCESS,
  payload:{
    staff,
  },
});
export const updateStudentFailure = (error)=>({
  type:ADMINACTIONTYPES.STUDENT_UPDATE_FAILURE,
  payload:{
    error,
  },
});

/**
 * STUDENT DELETE ACTION
 * @returns ACTION
 */

export const deleteStudentStart = ()=>({
  type:ADMINACTIONTYPES.STUDENT_DELETE_START,
});

export const deleteStudentSuccess = (staff)=>({
  type:ADMINACTIONTYPES.STUDENT_DELETE_SUCCESS,
  payload:{
    staff,
  },
});

export const deleteStudentFailure = (error)=>({
  type:ADMINACTIONTYPES.STUDENT_DELETE_FAILURE,
  payload:{
    error,
  },
});




/**
 * STAFF ASYNC ACTION TYPES
 */

 export const fetchStaffAsync = () => {
  
  return async (dispatch) => {
 
    try {
      dispatch(fetchStaffStart());
      
      const response = await AdminStaffService.getAll();
    
      dispatch(
        fetchStaffSuccess(
        
          response.data.results
          
        )       
      );

    } catch (err) {
      dispatch(fetchStaffFailure(err));
    }
  };
};



export const updateStaffAsync = (username,email,is_staff,is_superuser) => {
  
  return async (dispatch) => {

    try {
      dispatch(updateStaffStart());

      const response = await AdminStaffService.update(
          username,
          email,
          is_staff,
          is_superuser,    
      );
     
      dispatch(updateStaffSuccess(response.data.data));
    } catch (err) {
      dispatch(updateStaffFailure(err));
    }
  };
};

export const deleteStaffAsync = (id) => {
  return async (dispatch) => {

    try {
      dispatch(deleteStaffStart());
      const response = await AdminStaffService.delete(
        
            id,
      );
    
      dispatch(deleteStaffSuccess(response.data.data));
    } catch (err) {
      dispatch(deleteStaffFailure(err));
    }
  };
};







/**
 * STUDENT ASYNC ACTION TYPES
 */

 export const fetchStudentAsync = () => {
   
    return async (dispatch) => {

      try {
          dispatch(fetchStudentStart);
          
          const response = await AdminStudentService.getAll();

        
          dispatch(
            fetchStudentSuccess(
            
              response.data.results
              
            )       
          );
      } catch (err) {
        dispatch(fetchStudentFailure(err));
      }
    };
     
};



export const updateStudentAsync = (username,email,is_staff,is_superuser,batch,is_active) => {
 return async (dispatch) => {

   try {
     dispatch(updateStaffStart());

     const response = await AdminStudentService.update(
         username,
         email,
         is_staff,
         is_superuser,
         batch,
         is_active,
     );
     dispatch(updateStudentSuccess(response.data.data));
   } catch (err) {
     dispatch(updateStaffFailure(err));
   }
 };
};

export const deleteStudentAsync = (id) => {
 return async (dispatch) => {

   try {
     dispatch(deleteStudentStart());
     const response = await AdminStudentService.delete(
       
           id
  
     );
     dispatch(deleteStudentSuccess(response.data.data));
   } catch (err) {
     dispatch(deleteStudentFailure(err));
   }
 };
};