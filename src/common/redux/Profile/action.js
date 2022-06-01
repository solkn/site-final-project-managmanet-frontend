import axios from 'axios';
import { ACTION_TYPES } from './type';
// import { toast } from 'react-toastify';
import { errorToast, successToast } from 'src/utils/toastMsg';
import { COMMON_URL } from 'src/common/api';

/////FOR COORDINATOR LIST

const getUserRequest = () => {
  return { type: ACTION_TYPES.GET_USER_START };
};

const getUserSuccess = (users) => {
  return { type: ACTION_TYPES.GET_USER_SUCCESS, payload: users };
};

const getUserFailure = (error) => {
  return { type: ACTION_TYPES.GET_USER_FAILURE, payload: error };
};

export const getOneUser = () => {
  return async (dispatch) => {
    dispatch(getUserRequest);
    // await ItemDataService.create(coordinator)
    await axios
      .get(`${COMMON_URL}/users/${localStorage.getItem('user_id')}`, {
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        console.log('User Detail:  ' + response);
        const users = response.data;
        console.log(response.status);
        dispatch(getUserSuccess(users));
        // toast.error(response.data, {
        //   position: toast.POSITION.TOP_RIGHT
        // });
      })

      .catch(function (error) {
        dispatch(getUserFailure(error.message));
        if (error.response) {
          console.log(error.response.data.non_field_errors);
          console.log(error.response.status);
          console.log(error.response.headers);
          // errorToast(error.response.data.non_field_errors);
        } else if (error.request) {
          console.log(error.request);
          // errorToast(error.request);
        } else {
          console.log('Error', error.message);
          // errorToast(error.message);
        }
        console.log(error.config);
      });
  };
};
