import { STUDENTACTIONTYPE } from './StudentType';

const INITIAL_STATE = {
    createStudentGroupLoading: false,
    createStudentGroupSuccess: false,
    createStudentGroupFailure: null,
    fetchStudentGroupLoading: false,
    fetchStudentGroupSuccess: false,
    fetchStudentGroupFailure: null,
    fetchStudentsLoading: false,
    fetchStudentsSuccess: false,
    fetchStudentsFailure: null,
    students: [],
    groups: [],
    group: {}
}

export const StudentReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case STUDENTACTIONTYPE.STUDENT_FETCH_START:
            return {
                ...state,
                fetchStudentsLoading: true,
                fetchStudentsFailure: null
            };
        case STUDENTACTIONTYPE.STUDENT_FETCH_SUCCESS:
            return {
                ...state,
                fetchStudentsLoading: false,
                fetchStudentsSuccess: true,
                fetchStudentsFailure: null,
                students: action.payload.students
            };
        case STUDENTACTIONTYPE.STUDENT_FETCH_FALIURE:
            return {
                ...state, 
                fetchStudentsLoading: false,
                fetchStudentsFailure: action.payload.error
            };
        case STUDENTACTIONTYPE.STUDENT_CREATE_GROUP_START:
            return {
                ...state,
                createStudentGroupLoading: true,
                createStudentGroupFailure: null
            };
        case STUDENTACTIONTYPE.STUDENT_CREATE_GROUP_SUCCESS:
            return {
                ...state,
                createStudentGroupLoading: false,
                createStudentGroupSuccess: true,
                createStudentGroupFailure: null
            };
        case STUDENTACTIONTYPE.STUDENT_CREATE_GROUP_FAILURE:
            return {
                ...state,
                createStudentGroupLoading: false,
                createStudentGroupFailure: action.payload.error
            };
        case STUDENTACTIONTYPE.STUDENT_FETCH_GROUP_START:
            return {
                ...state,
                fetchStudentGroupLoading: true,
                fetchStudentGroupFailure: false
            };
        case STUDENTACTIONTYPE.STUDENT_FETCH_GROUP_SUCCESS:
            return {
                ...state,
                fetchStudentGroupLoading: false,
                fetchStudentGroupSuccess: true,
                fetchStudentGroupFailure: false,
                group: action.payload.group
            }
        default: 
            return state
    }
};