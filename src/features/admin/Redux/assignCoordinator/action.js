import axios from 'axios';
import { ASSIGN_COORDINATOR_TYPES } from './type';
// import { toast } from 'react-toastify';
import  successToast  from 'src/utils/toastMsg';
import { COMMON_URL } from 'src/common/api';

const assignCoorinatorRequest = () => {
  return { type: ASSIGN_COORDINATOR_TYPES.ASSIGN_COORDINATOR_START };
};

const assignCoorinatorSuccess = (users) => {
  return { type: ASSIGN_COORDINATOR_TYPES.ASSIGN_COORDINATOR_SUCCESS, payload: users };
};

const assignCoorinatorFailure = (error) => {
  return { type: ASSIGN_COORDINATOR_TYPES.ASSIGN_COORDINATOR_FAILURE, payload: error };
};

export const assignCoordinator = (coordinator) => {
  console.log('sdfghkl' + coordinator);
  return async (dispatch) => {
    dispatch(assignCoorinatorRequest);
    // await ItemDataService.create(coordinator)
    await axios
      .post(`${COMMON_URL}/coordinators`, coordinator, {
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        console.log(':assign Coordinator ' + response);
        const users = response.data;
        console.log(response.status);
        dispatch(assignCoorinatorSuccess(users));
        // toast.error(response.data, {
        //   position: toast.POSITION.TOP_RIGHT
        // });
        successToast('Coordinator successfully added');
      })

      .catch(function (error) {
        dispatch(assignCoorinatorFailure(error.message));
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data.non_field_errors);
          console.log(error.response.status);
          console.log(error.response.headers);
          // errorToast(error.response.data.non_field_errors);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
          // errorToast(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          // errorToast(error.message);
        }
        console.log(error.config);
      });
  };
};

/////FOR COORDINATOR LIST

const listCoorinatorRequest = () => {
  return { type: ASSIGN_COORDINATOR_TYPES.LIST_COORDINATOR_START };
};

const listCoorinatorSuccess = (users) => {
  return { type: ASSIGN_COORDINATOR_TYPES.LIST_COORDINATOR_SUCCESS, payload: users };
};

const listCoorinatorFailure = (error) => {
  return { type: ASSIGN_COORDINATOR_TYPES.LIST_COORDINATOR_FAILURE, payload: error };
};

export const listCoordinator = () => {
  return async (dispatch) => {
    dispatch(listCoorinatorRequest);
    // await ItemDataService.create(coordinator)
    await axios
      .get(`${COMMON_URL}/coordinators`, {
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
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data.non_field_errors);
          console.log(error.response.status);
          console.log(error.response.headers);
          // errorToast(error.response.data.non_field_errors);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
          // errorToast(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          // errorToast(error.message);
        }
        console.log(error.config);
      });
  };
};

////////FOR COORDINATOR DELETE

const deleteCoorinatorRequest = () => {
  return { type: ASSIGN_COORDINATOR_TYPES.DELETE_COORDINATOR_START };
};

const deleteCoorinatorSuccess = (user) => {
  return { type: ASSIGN_COORDINATOR_TYPES.DELETE_COORDINATOR_SUCCESS, payload:user };
};

const deleteCoorinatorFailure = (error) => {
  return { type: ASSIGN_COORDINATOR_TYPES.DELETE_COORDINATOR_FAILURE, payload: error };
};

export const deleteCoordinator = (id) => {
  
  return async (dispatch) => {
    dispatch(deleteCoorinatorRequest);
    // await ItemDataService.create(coordinator)
    await axios
      .delete(`${COMMON_URL}/coordinators/${id}`, {
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        console.log(':delete Coordinator ' + response);
        const users = response.data;
        console.log(response.status);
        dispatch(deleteCoorinatorSuccess(users));
        dispatch(listCoordinator());
        successToast('Coordinator Deleted Successfully!');
        // toast.error(response.data, {
        //   position: toast.POSITION.TOP_RIGHT
        // });
      })

      .catch(function (error) {
        dispatch(deleteCoorinatorFailure(error.message));
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
          // errorToast(error.response.data.detail);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
          // errorToast(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          // errorToast(error.message);
        }
        console.log(error.config);
      });
  };
};
