import { STUDENTACTIONTYPE } from "./StudentType";
import StudentDataService from "../services/student_group_services";

/**
 * STUDENT FETCH ACTION
 * @returns ACTION
 */

export const fetchStudentStart = () => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_START
});
export const fetchStudentSuccess = (students) => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_SUCCESS,
    payload: {
        students
    }
});
export const fetchStudentFailure = (error) => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_FAILURE,
    payload: {
        error
    }
});

/**
 * STUDENT GROUP CREATE ACTION
 * @returns ACTION
 */

 export const createStudentGroupStart = () => ({
    type: STUDENTACTIONTYPE.STUDENT_CREATE_GROUP_START
});
export const createStudentGroupSuccess = (group) => ({
    type: STUDENTACTIONTYPE.STUDENT_CREATE_GROUP_SUCCESS,
    payload: {
        group
    }
});
export const createStudentGroupFailure = (error) => ({
    type: STUDENTACTIONTYPE.STUDENT_CREATE_GROUP_FAILURE,
    payload: {
        error
    }
});

/**
 * STUDENT GROUP FETCH ACTION
 * @returns ACTION
 */

 export const fetchStudentGroupStart = () => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_GROUP_START
});
export const fetchStudentGroupSuccess = (group) => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_GROUP_SUCCESS,
    payload: {
        group
    }
});
export const fetchStudentGroupFailure = (error) => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_GROUP_FAILURE,
    payload: {
        error
    }
});


/**
 * STUDENT FETCH ASYNC ACTION TYPES
 */

export const fetchStudentAsync = () => {
    return async (dispatch) => {
        try{
            dispatch(fetchStudentStart());
            const response = await StudentDataService.getAllStudents();
            dispatch(fetchStudentSuccess(response.data.results));
        }catch(err){
            dispatch(fetchStudentFailure(err));
        }
    }
}

/**
 * STUDENT GROUP CREATE ASYNC ACTION TYPES
 */

 export const createStudentGroupAsync = () => {
    return async (dispatch) => {
        try{
            dispatch(createStudentGroupStart());
            const response = await StudentDataService.createStudentGroup();
            dispatch(createStudentGroupSuccess(response.data.results));
        }catch(err){
            dispatch(createStudentGroupFailure(err));
        }
    }
}

/**
 * STUDENT GROUP FETCH ASYNC ACTION TYPES
 */

 export const fetchStudentGroupAsync = () => {
    return async (dispatch) => {
        try{
            dispatch(fetchStudentGroupStart());
            const response = await StudentDataService.fetchStudentGroup();
            dispatch(fetchStudentGroupSuccess(response.data.results));
        }catch(err){
            dispatch(fetchStudentGroupFailure(err));
        }
    }
}
