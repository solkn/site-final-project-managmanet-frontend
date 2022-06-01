import { ACTION_TYPES } from './type';

const initialState = {
  isLoading: false,
  response: {},
  errorMsg: ''
};
function AddStaffsWithFormReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.ADD_STAFF_START:
      return {
        ...state,
        isLoading: true
      };
    case ACTION_TYPES.ADD_STAFF_SUCCESS:
      return {
        ...state,
        isLoading: false,
        response: payload
      };
    case ACTION_TYPES.DELETE_STAFF_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload
      };
      
    default:
      return state;
  }
}
export default AddStaffsWithFormReducer;
