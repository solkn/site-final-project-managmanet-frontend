import { ACTION_TYPES } from './type';

const initialState = {
  //lLSIT DEADLINE
  isLoading: true,
  deadlines: {},
  errorMsg: '',

  //LIST semister
  listSemisterLoading: false,
  listSemisterResponse: {},
  listSemisterErrMsg: '',

  //LIST SUBMISSION TYPE
  listSubTLoading: false,
  listSubTResponse: {},
  listSubTErrMsg: '',

  //ADD semister
  addSemisterLoading: false,
  addSemisterResponse: {},
  addSemisterErrMsg: '',

  //add deadline
  addDeadlineLoading: false,
  addDeadlineResponse: {},
  addDeadlineErrMsg: '',

  //semister
  addSubmissionTLoading: false,
  addSubmissionTResponse: {},
  addSubmissionTErrMsg: ''
};
function CoordinatorDeadlinesReducer(state = initialState, action) {
  const { type, payload } = action;
  console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ', payload);
  switch (type) {

  ///ADD SEMISTER
  case ACTION_TYPES.ADD_SEMISTER_START:
    return {
      ...state,
      addSemisterLoading: true
    };
  case ACTION_TYPES.ADD_SEMISTER_SUCCESS:
    return {
      ...state,
      addSemisterLoading: false,
      addSemisterResponse: payload
    };
  case ACTION_TYPES.ADD_SEMISTER_FAILURE:
    return {
      ...state,
      addSemisterLoading: false,
      addSemisterErrMsg: payload
    };


  ///ADD DEADLINE
  case ACTION_TYPES.ADD_DEADLINE_START:
    return {
      ...state,
      addDeadlineLoading: true
    };
  case ACTION_TYPES.ADD_DEADLINE_SUCCESS:
    return {
      ...state,
      addDeadlineLoading: false,
      addDeadlineResponse: payload
    };
  case ACTION_TYPES.ADD_DEADLINE_FAILURE:
    return {
      ...state,
      addDeadlineLoading: false,
      addDeadlineErrMsg: payload
    };

    ///LIST DEADLINES
    case ACTION_TYPES.LIST_DEADLINE_START:
      return {
        ...state,
        isLoading: true
      };
    case ACTION_TYPES.LIST_DEADLINE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deadlines: payload
      };
    case ACTION_TYPES.LIST_DEADLINE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload
      };

    // ////LIST SEMISTER
    case ACTION_TYPES.LIST_SEMISTER_START:
      return {
        ...state,
        listSemisterLoading: true
      };
    case ACTION_TYPES.LIST_SEMISTER_SUCCESS:
      return {
        ...state,
        listSemisterLoading: false,
        listSemisterResponse: payload
      };
    case ACTION_TYPES.LIST_SEMISTER_FAILURE:
      return {
        ...state,
        listSemisterLoading: false,
        listSemisterErrMsg: payload
      };

    // ////LIST_SUBMISSION_TYPE
    case ACTION_TYPES.LIST_SUBMSSIONTYPE_START:
      return {
        ...state,
        listSubTLoading: true
      };
    case ACTION_TYPES.LIST_SUBMSSIONTYPE_SUCCESS:
      return {
        ...state,
        listSubTLoading: false,
        listSubTResponse: payload
      };
    case ACTION_TYPES.LIST_SUBMSSIONTYPE_FAILURE:
      return {
        ...state,
        listSubTLoading: false,
        listSubTResponse: payload
      };

    default:
      return state;
  }
}
export default CoordinatorDeadlinesReducer;
