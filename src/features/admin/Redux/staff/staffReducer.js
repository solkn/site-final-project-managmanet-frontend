import { ACTION_TYPES } from './type';

const initialState = {
  isLoading: false,
  response: {},
  errorMsg: '',
  isSuccess:false,


  
};
function AddStaffsWithFormReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.ADD_STAFF_START:
      return {
        ...state,
        isLoading: true,
        isSuccess:false
      };
    case ACTION_TYPES.ADD_STAFF_SUCCESS:
      return {
        ...state,
        isLoading: false,
        response: payload,
        errorMsg:'',
        isSuccess:true
      };
    case ACTION_TYPES.DELETE_STAFF_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
        isSuccess:false
      };
      
    default:
      return state;
  }
}
export default AddStaffsWithFormReducer;
