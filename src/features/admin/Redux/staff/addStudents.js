import { ACTION_TYPES } from './type';

const initialState = {
  isLoading: false,
  response: {},
  errorMsg: '',
  isSuccess: false,

  //ADD student with form
  addStudentLoading: false,
  addStudentResponse: {},
  addStudentErrMsg: '',

  //delete user
  deleteUserLoading: false,
  deleteUserResponse: {},
  deleteUserErrMsg: ''
};
function AddStudents(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.ADD_STUDENT_START:
      return {
        ...state,
        isLoading: true,
        isSuccess: false
      };
    case ACTION_TYPES.ADD_STUDENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        response: payload,
        errorMsg: '',
        isSuccess: true
      };
    case ACTION_TYPES.ADD_STUDENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
        isSuccess: false
      };

    case ACTION_TYPES.STUDENT_UPLOAD_START:
      return {
        ...state,
        addStudentLoading: true
      };
    case ACTION_TYPES.STUDENT_UPLOAD_SUCCESS:
      return {
        ...state,
        addStudentLoading: false,
        addStudentResponse: payload,
        addStudentErrMsg: ''
      };
    case ACTION_TYPES.STUDENT_UPLOAD_FAILURE:
      return {
        ...state,
        addStudentLoading: false,
        addStudentErrMsg: payload
      };

    case ACTION_TYPES.DELETE_USER_START:
      return {
        ...state,
        deleteUserLoading: true
      };
    case ACTION_TYPES.DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteUserLoading: false,
        deleteUserResponse: payload,
        deleteUserErrMsg: ''
      };
    case ACTION_TYPES.DELETE_USER_FAILURE:
      return {
        ...state,
        deleteUserLoading: false,
        deleteUserErrMsg: payload
      };

    default:
      return state;
  }
}
export default AddStudents;
