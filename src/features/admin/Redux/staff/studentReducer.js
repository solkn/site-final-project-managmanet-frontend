import { ACTION_TYPES } from './type';

const initialState = {
  isLoading: false,
  students: [],
  errorMsg: ''
};
function ListStudentsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.LIST_STUDENT_START:
      return {
        ...state,
        isLoading: true
      };
    case ACTION_TYPES.LIST_STUDENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        students: payload
      };
    case ACTION_TYPES.LIST_STUDENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload
      };
      
    default:
      return state;
  }
}
export default ListStudentsReducer;
