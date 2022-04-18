import { ASSIGN_COORDINATOR_TYPES } from './type';

const initialState = {
  loading: false,
  msg: {},
  error: ''
};
function assignCoordinatorReducer(state = initialState, action) {
  console.log('heyyyy.... assign coorinator reducer 01');
  switch (action.type) {
    case ASSIGN_COORDINATOR_TYPES.ASSIGN_COORDINATOR_START:
      return {
        loading: true
      };
    case ASSIGN_COORDINATOR_TYPES.ASSIGN_COORDINATOR_SUCCESS:
      return {
        loading: false,
        msg: action.payload,
        error: ''
      };
    case ASSIGN_COORDINATOR_TYPES.ASSIGN_COORDINATOR_FAILURE:
      return {
        loading: false,
        msg: {},
        error: action.payload
      };

    default:
      return state;
  }
}
export default assignCoordinatorReducer;

