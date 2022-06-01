import { ACTION_TYPES } from './StaffType';

const initialState = {
  isLoading: true,
  groups: [],
  errorMsg: ''
};
function listExaminerGroupsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.LIST_EXAMINER_GROUP_START:
      return {
        ...state,
        isLoading: true
      };
    case ACTION_TYPES.LIST_EXAMINER_GROUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        groups: payload
      };
    case ACTION_TYPES.LIST_EXAMINER_GROUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload
      };

    default:
      return state;
  }
}
export default listExaminerGroupsReducer;
