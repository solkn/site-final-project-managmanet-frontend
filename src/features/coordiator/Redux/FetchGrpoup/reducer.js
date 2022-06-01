import { ACTION_TYPES } from './type';

const initialState = { isLoading: true, groups: [],errMsg:'' };
function groupListReducer(state = initialState, action) {
  console.log('heyyyy.... assign coorinator reducer 01');
  const { type, payload } = action;
  switch (type) {
    ///////LIST COORDINATOR
    case ACTION_TYPES.LIST_GROUP_START:
      return {
        ...state,

      };
    case ACTION_TYPES.LIST_GROUP_SUCCESS:
      return {
        ...state,
       groups: payload,
       isLoading:false
      };
    case ACTION_TYPES.LIST_GROUP_FAILURE:
      return {
         ...state,
         errorMsg:payload,
         isLoading:false

      };
    default:
      return state;
  }
}
export default groupListReducer;



