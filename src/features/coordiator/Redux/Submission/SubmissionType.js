import { ACTION_TYPES } from './type';

const initialState = {
  isLoading: true,
  deadlines: [],
  errorMsg: ''
};
function CoordinatorSubmissionTypeReducer(state = initialState, action) {
  console.log('heyyyy.... assign coorinator reducer 01');
  const { type, payload } = action;
  switch (type) {
    ////SUIBMISSION TYPES
    case ACTION_TYPES.LIST_SUBMSSIONTYPE_START:
      return {
        ...state,
        isLoading: true
      };
    case ACTION_TYPES.LIST_SUBMSSIONTYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deadlines: payload
      };
    case ACTION_TYPES.LIST_SUBMSSIONTYPE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload
      };

    default:
      return state;
  }
}
export default CoordinatorSubmissionTypeReducer;
