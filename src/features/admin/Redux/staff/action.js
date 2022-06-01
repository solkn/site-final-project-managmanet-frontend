/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { errorToast } from 'src/utils/toastMsg';
import { COMMON_URL } from 'src/common/api';
import { ACTION_TYPES } from './type';
import { fetchStaffAsync } from '../AdminAction';
import successToast from 'src/utils/toastMsg';
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
export const StaffRegisterWithForm = (data) => {
  return async (dispatch) => {
    dispatch(RequestStart({ type: ACTION_TYPES.ADD_STAFF_START }));
    await axios
      .post(`${COMMON_URL}/staffs`, data, {
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        const data = response.data;
        console.log(response.status);
        dispatch(RequestSuccess({ type: ACTION_TYPES.ADD_STAFF_SUCCESS, payload: data }));
        dispatch(fetchStaffAsync());

        toast.success('staff added successfully', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 8000
        });
      })
      .catch(function (error) {
        dispatch(RequestFailure({ type: ACTION_TYPES.ADD_STAFF_FAILURE, payload: error.message }));
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          toast.error(error.response.data, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 8000
          });
        } else if (error.request) {
          console.log(error.message);
          console.log(error.request);
          toast.error(error.request, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 8000
          });
          // errorToast(error.request);
        } else {
          console.log('Error', error.message);
          // errorToast(error.message);
          toast.error(error.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 8000
          });
        }
        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ' + error);
      });
  };
};

export const StudentRegisterWithForm = (data) => {
  console.log(data);
  return async (dispatch) => {
    dispatch(RequestStart({ type: ACTION_TYPES.ADD_STUDENT_START }));
    await axios
      .post(`${COMMON_URL}/students`, data, {
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        const data = response.data;
        console.log(response.status);
        dispatch(RequestSuccess({ type: ACTION_TYPES.ADD_STUDENT_SUCCESS, payload: data }));
        dispatch(listStudent());
        toast.success(response.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 8000
        });
      })
      .catch(function (error) {
        dispatch(
          RequestFailure({ type: ACTION_TYPES.ADD_STUDENT_FAILURE, payload: error.message })
        );
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          // errorToast(error.response.data);
          toast.error(error.response.data, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 8000
          });
        } else if (error.request) {
          console.log(error.message);
          console.log(error.request);
          // errorToast(error.request);
          toast.error(error.request, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 8000
          });
        } else {
          console.log('Error', error.message);
          errorToast(error.message);
          toast.error(error.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 8000
          });
        }
        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ' + error);
      });
  };
};
export const listStudent = () => {
  return async (dispatch) => {
    dispatch(RequestStart({ type: ACTION_TYPES.LIST_STUDENT_START }));
    await axios
      .get(`${COMMON_URL}/students?batch=2014`, {
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        const data = response.data;
        console.log(response.status);
        dispatch(RequestSuccess({ type: ACTION_TYPES.LIST_STUDENT_SUCCESS, payload: data }));
        // dispatch(setSnackBar(true, 'success', 'this is for testing!'));
        //  successToast("uuuuuuu!");
        // toast.success('ggfgfgf', {
        //   position: toast.POSITION.BOTTOM_RIGHT,
        //   autoClose: 8000
        // });
      })
      .catch(function (error) {
        dispatch(
          RequestFailure({ type: ACTION_TYPES.LIST_STUDENT_FAILURE, payload: error.message })
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
export const liststaffs = () => {
  return async (dispatch) => {
    dispatch(RequestStart({ type: ACTION_TYPES.LIST_STAFF_START }));
    await axios
      .get(`${COMMON_URL}/staffs`, {
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        const data = response.data;
        console.log(response.status);
        dispatch(RequestSuccess({ type: ACTION_TYPES.LIST_STAFF_SUCCESS, payload: data }));
        // dispatch(setSnackBar(true, 'success', 'this is for testing!'));
        //  successToast("uuuuuuu!");
        // toast.success('ggfgfgf', {
        //   position: toast.POSITION.BOTTOM_RIGHT,
        //   autoClose: 8000
        // });
      })
      .catch(function (error) {
        dispatch(RequestFailure({ type: ACTION_TYPES.LIST_STAFF_FAILURE, payload: error.message }));
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

export const StudentRegisterWithFile = (data) => {
  console.log(data);
  return async (dispatch) => {
    dispatch(RequestStart({ type: ACTION_TYPES.STUDENT_UPLOAD_START }));
    await axios
      .post(`${COMMON_URL}/students/registration/2014`, data, {
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        const data = response.data;
        console.log(response.status);
        dispatch(RequestSuccess({ type: ACTION_TYPES.STUDENT_UPLOAD_SUCCESS, payload: data }));
        dispatch(listStudent());
        toast.success('Successfully Added!', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 8000
        });
      })
      .catch(function (error) {
        dispatch(
          RequestFailure({ type: ACTION_TYPES.STUDENT_UPLOAD_FAILURE, payload: error.message })
        );
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          // errorToast(error.response.data);
          toast.error(error.response.data, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 8000
          });
        } else if (error.request) {
          console.log(error.message);
          console.log(error.request);
          // errorToast(error.request);
          toast.error(error.request, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 8000
          });
        } else {
          console.log('Error', error.message);
          errorToast(error.message);
          toast.error(error.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 8000
          });
        }
        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ' + error);
      });
  };
};

export const deleteUser = (data) => {
  console.log(data);
  return async (dispatch) => {
    dispatch(RequestStart({ type: ACTION_TYPES.DELETE_USER_START }));
    await axios
      .delete(`${COMMON_URL}/users/${data}`, {
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        const data = response.data;
        console.log(response.status);
        dispatch(RequestSuccess({ type: ACTION_TYPES.DELETE_USER_SUCCESS, payload: data }));
        // dispatch(listStudent());
        // dispatch(liststaffs());
        toast.success('Successfully Deleted!', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 8000
        });
      })
      .catch(function (error) {
        dispatch(
          RequestFailure({ type: ACTION_TYPES.DELETE_USER_FAILURE, payload: error.message })
        );
        if (error.response) {
          console.log(error.response.data.detail);
          console.log(error.response.status);
          console.log(error.response.headers);
          // errorToast(error.response.data);
          toast.error(error.response.data.detail, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 8000
          });
        } else if (error.request) {
          console.log(error.message);
          console.log(error.request);
          // errorToast(error.request);
          toast.error(error.request, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 8000
          });
        } else {
          console.log('Error', error.message);
          errorToast(error.message);
          toast.error(error.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 8000
          });
        }
        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ' + error);
      });
  };
};
