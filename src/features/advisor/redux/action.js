import axios from 'axios';
import { ACTION_TYPES } from './type';
// import { toast } from 'react-toastify';
import { errorToast, successToast } from 'src/utils/toastMsg';
import { COMMON_URL } from 'src/common/api';


const getGroupRequest = () => {
  return { type: ACTION_TYPES.GET_GROUP_START };
};

const getGroupSuccess = (users) => {
  return { type: ACTION_TYPES.GET_GROUP_SUCCESS, payload: users };
};

const getGroupFailure = (error) => {
  return { type: ACTION_TYPES.GET_GROUP_FAILURE, payload: error };
};

export const adGetGroups = () => {
  return async (dispatch) => {
    dispatch(getGroupRequest);
    // await ItemDataService.create(coordinator)
    await axios
      .get(`${COMMON_URL}/advisor-students`, {
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        console.log('Group Detail:  ' + response);
        const users = response.data;
        console.log(response.status);
        dispatch(getGroupSuccess(users));
        // toast.error(response.data, {
        //   position: toast.POSITION.TOP_RIGHT
        // });
      })

      .catch(function (error) {
        dispatch(getGroupFailure(error.message));
        if (error.response) {
          console.log(error.response.data.non_field_errors);
          console.log(error.response.status);
          console.log(error.response.headers);
          errorToast(error.response.data.non_field_errors);
        } else if (error.request) {
          console.log(error.request);
          errorToast(error.request);
        } else {
          console.log('Error', error.message);
          errorToast(error.message);
        }
        console.log(error.config);
      });
  };
};
