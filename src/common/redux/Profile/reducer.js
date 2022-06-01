import { ACTION_TYPES } from './type';

const initialState = { user: {} ,loading:false,msg:''};
function userGetReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.GET_USER_START:
      return {
        ...state,
        loading:true,
        msg:''
      };
    case ACTION_TYPES.GET_USER_SUCCESS:
      return {
        ...state,
       user: payload,
       loading:false,
       msg:''
      };
    case ACTION_TYPES.GET_USER_FAILURE:
      return {
         ...state,
         user:payload,
         loading:false,
         msg:payload
      };
    default:
      return state;
  }
}
export default userGetReducer;



