
import { ADMINACTIONTYPES } from "./AdminType";

const INITIAL_STATE = {
  fetchStaffLoading:false,
  fetchStaffSuccess:false,
  updateStaffLoading:false,
  updateStaffSuccess:false,
  deleteStaffLoading:false,
  deleteStaffSuccess:false,
  fetchStaffFailure:null,
  updateStaffFailure:null,
  deleteStaffFailure:null,
  staffs:null,
  staff:{},

  fetchStudentLoading:false,
  fetchStudentSuccess:false,
  updateStudentLoading:false,
  updateStudentSuccess:false,
  deleteStudentLoading:false,
  deleteStudentSuccess:false,
  fetchStudentFailure:null,
  updateStudentFailure:null,
  deleteStudentFailure:null,
  students:null,
  student:{},
};


export const AdminReducer = (state = INITIAL_STATE, action) =>{

  switch(action.type){
    case ADMINACTIONTYPES.STAFF_FETCH_START:
      return {
        ...state,
        fetchStaffLoading:true,
        fetchStaffFailure:null,

      };
    case ADMINACTIONTYPES.STAFF_FETCH_SUCCESS:
      return {
        ...state,
        fetchStaffLoading:false,
        fetchStaffSuccess:true,
        staffs:action.payload.staff,
      };
    case ADMINACTIONTYPES.STAFF_FETCH_FAILURE:
      return {
        ...state,
        fetchStaffLoading:false,
        fetchStaffFailure:action.payload.error,
      };
    
    case ADMINACTIONTYPES.STAFF_UPDATE_START:
      return {
        ...state,
        updateStaffLoading:true,
        updateStaffFailure:null,  

      };
    
    case ADMINACTIONTYPES.STAFF_UPADTE_SUCCESS:
      return {
        ...state,
        updateStaffLoading:false,
        updateStaffSuccess:true,
        staff:[action.payload.staff,...state.staff],
      };
    case ADMINACTIONTYPES.STAFF_UPDATE_FAILURE:
      return {
        ...state,
        updateStaffLoading:false,
        updateStaffFailure:action.payload.error,
      };
      
    case ADMINACTIONTYPES.STAFF_DELETE_START:
      return {
        ...state,
        deleteStaffLoading:true,
        deleteStaffFailure:null,  

      };
      
    case ADMINACTIONTYPES.STAFF_DELETE_SUCCESS:
      return {
        ...state,
        deleteStaffLoading:false,
        deleteStaffSuccess:true,
        staff:[action.payload.staff,...state.staff],
      };
    case ADMINACTIONTYPES.STAFF_DELETE_FAILURE:
      return {
        ...state,
        deleteStaffLoading:false,
        deleteStaffFailure:action.payload.error,
      }; 
    
    case ADMINACTIONTYPES.STUDENT_FETCH_START:
      return {
        ...state,
        fetchStudentLoading:true,
        fetchStudentFailure:null,

      };
    case ADMINACTIONTYPES.STUDENT_FETCH_SUCCESS:
      return {
        ...state,
        fetchStudentLoading:false,
        fetchStudentSuccess:true,
        students:action.payload.student,
      };
    case ADMINACTIONTYPES.STUDENT_FETCH_FAILURE:
      return {
        ...state,
        fetchStudentLoading:false,
        fetchStudentFailure:action.payload.error,
      };
    
    case ADMINACTIONTYPES.STUDENT_UPDATE_START:
      return {
        ...state,
        updateStudentLoading:true,
        updateStudentFailure:null,  

      };
    
    case ADMINACTIONTYPES.STUDENT_UPADTE_SUCCESS:
      return {
        ...state,
        updateStudentLoading:false,
        updateStudentSuccess:true,
        student:[action.payload.student,...state.student],
      };
    case ADMINACTIONTYPES.STUDENT_UPDATE_FAILURE:
      return {
        ...state,
        updateStudentLoading:false,
        updateStudentFailure:action.payload.error,
      };
      
    case ADMINACTIONTYPES.STUDENT_DELETE_START:
      return {
        ...state,
        deleteStudentLoading:true,
        deleteStudentFailure:null,  

      };
      
    case ADMINACTIONTYPES.STUDENT_DELETE_SUCCESS:
      return {
        ...state,
        deleteStudentLoading:false,
        deleteStudentSuccess:true,
        student:[action.payload.student,...state.student],
      };
    case ADMINACTIONTYPES.STUDENT_DELETE_FAILURE:
      return {
        ...state,
        deleteStaffLoading:false,
        deleteStaffFailure:action.payload.error,
      };  
       

    default:
      return state;  
  }
}

