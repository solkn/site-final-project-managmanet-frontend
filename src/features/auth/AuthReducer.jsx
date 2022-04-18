import { SIGNIN, SIGNOUT, USER_LOADED } from './AuthType';
import { toast } from 'react-toastify';

const initialState = {
  token: localStorage.getItem('token'),
  user_id: localStorage.getItem('user_id'),
  is_superadmin: localStorage.getItem('is_superadmin'),
  is_staff: localStorage.getItem('is_staff'),
  is_coordinator: localStorage.getItem('is_coordinator'),
  is_student: localStorage.getItem('is_student'),
  loading: true
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log('initial state: ' + state);
  switch (type) {
    case USER_LOADED:
    case SIGNIN:
      console.log(action);
      toast.success('Welcome...', {
        position: toast.POSITION.TOP_RIGHT
      });
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

    case SIGNOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('is_staff');
      localStorage.removeItem('is_coordinator');
      localStorage.removeItem('is_superadmin');
      localStorage.removeItem('is_student');
      toast.success('GoodBy...', {
        position: toast.POSITION.TOP_RIGHT
      });
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
