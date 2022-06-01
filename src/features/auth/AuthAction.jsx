import axios from 'axios';
import { SIGNIN, USER_LOADED, SIGNOUT, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE } from './AuthType';
// import { toast } from 'react-toastify';
// import { errorToast } from 'src/utils/toastMsg';
import { COMMON_URL } from 'src/common/api';
import { toast } from 'react-toastify';

const loginRequest = () => {
  return { type: LOGIN_START };
};

const loginSuccess = (users) => {
  return { type: LOGIN_SUCCESS, payload: users };
};

const loginFailure = (error) => {
  return { type: LOGIN_FAILURE, payload: error };
};

export const signIn = (creds) => {
  console.log("credincialss....... ",creds);
  return async (dispatch) => {
    dispatch(loginRequest())
    await axios
      .post(`${COMMON_URL}/login/`, creds)
      .then((data) => {
        console.log('dataaa: ' + data);
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user_id', data.data.user_id);
        localStorage.setItem('is_staff', data.data.is_staff);
        localStorage.setItem('is_coordinator', data.data.is_coordinator);
        localStorage.setItem('is_superadmin', data.data.is_superadmin);
        localStorage.setItem('is_student', data.data.is_student);
        localStorage.setItem('is_advisor', data.data.advisor_to.length === 0 ? false : true);
        localStorage.setItem('is_examiner', data.data.examiner_to.length === 0 ? false : true);
        dispatch(loginSuccess(data.data))
        toast.success('login success!', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 6000
        });
      })
      .catch(function (error) {
        console.log('heeeeeeeeeeee');
        // errorToast(error.message);
        dispatch(loginFailure(error.message));
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 6000
        });
        if (error.response) {
          console.log(error.response.data.non_field_errors[0]);
          console.log(error.response.status);
          console.log(error.response.headers);
          toast.error(error.response.data.non_field_errors[0], {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 6000
          });
        } else if (error.request) {
          console.log(error.request);
          toast.error(error.request, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 6000
          });
        } else {
          console.log('Error', error.message);
          toast.error(error.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 6000
          });
        }
        console.log(error.config);
        // toast.error(error.message, {
        //   position: toast.POSITION.BOTTOM_RIGHT,
        //   autoClose: 6000
        // });
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
