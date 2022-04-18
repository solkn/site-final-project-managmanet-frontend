import axios from 'axios';
import { SIGNIN, USER_LOADED, SIGNOUT, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE } from './AuthType';
import { toast } from 'react-toastify';

export const signIn = (creds) => {
  console.log(creds);
  return async (dispatch) => {
    await axios
      .post('http://sfpm.herokuapp.com/api/login/', creds)
      .then((data) => {
        console.log('dataaa: ' + data);
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user_id', data.data.user_id);
        localStorage.setItem('is_staff', data.data.is_staff);
        localStorage.setItem('is_coordinator', data.data.is_coordinator);
        localStorage.setItem('is_superadmin', data.data.is_superadmin);
        localStorage.setItem('is_student', data.data.is_student);

        dispatch({
          type: SIGNIN,
          payload: data.data
        });
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response?.data.non_field_errors[0], {
          position: toast.POSITION.TOP_RIGHT
        });
      });
  };
};

export const loadUser = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    if (token) {
      dispatch({
        type: USER_LOADED,
        payload: token
      });
    } else return null;
  };
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: SIGNOUT
    });
  };
};
