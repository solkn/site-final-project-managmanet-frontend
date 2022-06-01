import axios from 'axios';
import { ACTION_TYPES } from './type';
// import { toast } from 'react-toastify';
import { errorToast, successToast } from 'src/utils/toastMsg';
import { COMMON_URL } from 'src/common/api';



/////FOR COORDINATOR LIST

const listCoorinatorRequest = () => {
  return { type: ACTION_TYPES.LIST_GROUP_START };
};

const listCoorinatorSuccess = (users) => {
  return { type: ACTION_TYPES.LIST_GROUP_SUCCESS, payload: users };
};

const listCoorinatorFailure = (error) => {
  return { type: ACTION_TYPES.LIST_GROUP_FAILURE, payload: error };
};

export const listGroups = () => {
  return async (dispatch) => {
    dispatch(listCoorinatorRequest);
    // await ItemDataService.create(coordinator)
    await axios
      .get(`${COMMON_URL}/groups?batch=2014`, {
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        console.log(':list Coordinator ' + response);
        const users = response.data;
        console.log(response.status);
        dispatch(listCoorinatorSuccess(users));
        // toast.error(response.data, {
        //   position: toast.POSITION.TOP_RIGHT
        // });
      })

      .catch(function (error) {
        dispatch(listCoorinatorFailure(error.message));
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



