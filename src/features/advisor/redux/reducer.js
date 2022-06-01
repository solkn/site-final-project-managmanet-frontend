import { ACTION_TYPES } from './type';

const initialState = { groups: [], loading: false, msg: '' };
function adGetGroupsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.GET_GROUP_START:
      return {
        ...state,
        loading: true,
        msg: ''
      };
    case ACTION_TYPES.GET_GROUP_SUCCESS:
      return {
        ...state,
        groups: payload,
        loading: false,
        msg: ''
      };
    case ACTION_TYPES.GET_GROUP_FAILURE:
      return {
        ...state,
        groups: payload,
        loading: false,
        msg: payload
      };
    default:
      return state;
  }
}
export default adGetGroupsReducer;
