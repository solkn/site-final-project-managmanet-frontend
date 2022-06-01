import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, SIGNOUT, USER_LOADED } from './AuthType';
// import { toast } from 'react-toastify';

const initialState = {
  token: localStorage.getItem('token'),
  user_id: localStorage.getItem('user_id'),
  is_superadmin: localStorage.getItem('is_superadmin'),
  is_staff: localStorage.getItem('is_staff'),
  is_coordinator: localStorage.getItem('is_coordinator'),
  is_student: localStorage.getItem('is_student'),
  loading: false
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log('initial state: ' + state);
  switch (type) {
    case USER_LOADED:
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      console.log(action);
      console.log('payload: ' + payload);
      return {
        ...state,
        loading: false,
        token: payload.token,
        user_id: payload.user_id,
        is_superadmin: payload.is_superadmin,
        is_staff: payload.is_staff,
        is_coordinator: payload.is_coordinator,
        is_student: payload.is_student
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case SIGNOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('is_staff');
      localStorage.removeItem('is_coordinator');
      localStorage.removeItem('is_superadmin');
      localStorage.removeItem('is_student');
      localStorage.removeItem('is_examiner');
      localStorage.removeItem('is_advisor');
      // toast.success('GoodBy...', {
      //   position: toast.POSITION.TOP_RIGHT
      // });
      return {
        token: null,
        user_id: null,
        is_staff: null,
        is_coordinator: null,
        is_superadmin: null,
        is_student: null
      };
    default:
      return state;
  }
};
