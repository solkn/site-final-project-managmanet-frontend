import { ADD_BATCH_TYPES } from './type';

const initialState = {
  loading: false,
  msg: {},
  error: ''
};
function batchReducer(state = initialState, action) {
  console.log('heyyyy.... add batch reducer 01');
  switch (action.type) {
    case ADD_BATCH_TYPES.ADD_BATCH_START:
      return {
        loading: true
      };
    case ADD_BATCH_TYPES.ADD_BATCH_SUCCESS:
      return {
        loading: false,
        msg: action.payload,
        error: ''
      };
    case ADD_BATCH_TYPES.ADD_BATCH_FAILURE:
      return {
        loading: false,
        msg: {},
        error: action.payload
      };
    default:
      return state;
  }
}
export default batchReducer;
