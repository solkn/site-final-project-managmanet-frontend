/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { ACTION_TYPES } from './type';
// import { errorToast,  } from 'src/utils/toastMsg';
import { COMMON_URL } from 'src/common/api';
import { toast } from 'react-toastify';




const RequestStart = ({ type }) => {
  return { type: type };
};
const RequestSuccess = ({ type, payload }) => {
  return { type: type, payload: payload };
};
const RequestFailure = ({ type, error }) => {
  return { type: type, payload: error };
};


export const listDeadlines = () => {
  return async (dispatch) => {
    dispatch(RequestStart({ type: ACTION_TYPES.LIST_DEADLINE_START }));
    await axios
      .get(`${COMMON_URL}/submission-dead-lines`, {
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        const data = response.data;
        console.log(response.status);
        dispatch(RequestSuccess({ type: ACTION_TYPES.LIST_DEADLINE_SUCCESS, payload: data }));
      })
      .catch(function (error) {
        dispatch(
          RequestFailure({ type: ACTION_TYPES.LIST_DEADLINE_FAILURE, payload: error.message })
        );
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          // errorToast(error.response.data);
        } else if (error.request) {
          console.log(error.request);
          // errorToast(error.request);
        } else {
          console.log('Error', error.message);
          // errorToast(error.message);
        }
        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ' + error);
      });
  };
};

export const listSubmissionType = () => {
  return async (dispatch) => {
    dispatch(RequestStart({ type: ACTION_TYPES.LIST_SUBMSSIONTYPE_START }));
    await axios
      .get(`${COMMON_URL}/submission-types`, {
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        const data = response.data;
        console.log(response.status);
        dispatch(RequestSuccess({ type: ACTION_TYPES.LIST_SUBMSSIONTYPE_SUCCESS, payload: data }));
      })
      .catch(function (error) {
        dispatch(
          RequestFailure({ type: ACTION_TYPES.LIST_SUBMSSIONTYPE_FAILURE, payload: error.message })
        );
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          // errorToast(error.response.status);
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
export const listSemister = () => {
  return async (dispatch) => {
    dispatch(RequestStart({ type: ACTION_TYPES.LIST_SEMISTER_START }));
    await axios
      .get(`${COMMON_URL}/semisters`, {
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        const data = response.data;
        console.log(response.status);
        dispatch(RequestSuccess({ type: ACTION_TYPES.LIST_SEMISTER_SUCCESS, payload: data }));
      })
      .catch(function (error) {
        dispatch(
          RequestFailure({ type: ACTION_TYPES.LIST_SEMISTER_FAILURE, payload: error.message })
        );
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          // errorToast(error.response.status);
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
//////ADD_SEMISTER_DEADLINE_SUBMISSIONTYPE
export const AddSemister = (name) => {
  return async (dispatch) => {
    dispatch(RequestStart({ type: ACTION_TYPES.ADD_SEMISTER_START }));
    await axios
      .post(`${COMMON_URL}/semisters`,name, {
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        const data = response.data;
        console.log(response.status);
        dispatch(RequestSuccess({ type: ACTION_TYPES.ADD_SEMISTER_SUCCESS, payload: data }));
        dispatch(listSemister());
        toast.success('Successfully Added!', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 6000
        });
      })
      .catch(function (error) {
        dispatch(
          RequestFailure({ type: ACTION_TYPES.ADD_SEMISTER_FAILURE, payload: error.message })
        );
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          toast.error(error.response.data, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 6000
          });
        } else if (error.request) {
          console.log(error.request);
          toast.error(error.request, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 6000
          });        } else {
          console.log('Error', error.message);
          toast.error(error.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 6000
          });        }
        console.log(error.config);
      });
  };
};
export const AddSubmissionType = (data) => {
  return async (dispatch) => {
    dispatch(RequestStart({ type: ACTION_TYPES.ADD_SUBMSSIONTYPE_START }));
    await axios
      .post(`${COMMON_URL}/submission-types`,data, {
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        const data = response.data;
        console.log(response.status);
        dispatch(RequestSuccess({ type: ACTION_TYPES.ADD_SUBMSSIONTYPE_SUCCESS, payload: data }));
        dispatch(listSubmissionType())
        toast.success(response.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 6000
        });
      })
      .catch(function (error) {
        dispatch(
          RequestFailure({ type: ACTION_TYPES.ADD_SUBMSSIONTYPE_FAILURE, payload: error.message })
        );
       
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          toast.error(error.response.data, {
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
      });
  };
};
export const AddDeadline = (data) => {
  return async (dispatch) => {
    dispatch(RequestStart({ type: ACTION_TYPES.ADD_DEADLINE_START }));
    await axios
      .post(`${COMMON_URL}/submission-dead-lines`, data,{
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        const data = response.data;
        console.log(response.status);
        dispatch(RequestSuccess({ type: ACTION_TYPES.ADD_DEADLINE_SUCCESS, payload: data }));
        toast.success(response.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 6000
        });
      })
      .catch(function (error) {
        dispatch(
          RequestFailure({ type: ACTION_TYPES.ADD_DEADLINE_FAILURE, payload: error.message })
        );
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          toast.error(error.response.data, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 6000
          });
        } else if (error.request) {
          console.log(error.request);
          toast.error(error.request, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 6000
          });        } else {
          console.log('Error', error.message);
          toast.error(error.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 6000
          });        }
        console.log(error.config);
      });
  };
};

