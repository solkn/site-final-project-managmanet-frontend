/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { errorToast,  } from 'src/utils/toastMsg';
import { COMMON_URL } from 'src/common/api';
import { ACTION_TYPES } from './type';
// import { fetchStaffAsync } from '../AdminAction';
import { toast } from 'react-toastify';
import { fetchStaffAsync } from 'src/features/admin/Redux';


export const AssignAdvisor = (data) => {
  return async (dispatch) => {
    dispatch(RequestStart({ type: ACTION_TYPES.ASSIGN_ADVISOR_START }));
    await axios
      .post(`${COMMON_URL}/advisors`, data, {
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        const data = response.data;
        console.log(response.status);
        dispatch(RequestSuccess({ type: ACTION_TYPES.ASSIGN_ADVISOR_SUCCESS, payload: data }));
        dispatch(fetchStaffAsync());
        toast.success('Advisor successfully added!', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 6000
        });
      })
      .catch(function (error) {
        dispatch(RequestFailure({ type: ACTION_TYPES.ASSIGN_ADVISOR_FAILURE, payload: error.message }));
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          toast.error(error.response.data, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 6000
          });
        } else if (error.request) {
          console.log(error.message);
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
        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ' + error);
      });
  };
};

const RequestStart = ({ type }) => {
  return { type: type };
};
const RequestSuccess = ({ type, payload }) => {
  return { type: type, payload: payload };
};
const RequestFailure = ({ type, error }) => {
  return { type: type, payload: error };
};
export const AssignExaminer = (data) => {
  return async (dispatch) => {
    dispatch(RequestStart({ type: ACTION_TYPES.ASSIGN_EXAMINER_START }));
    await axios
      .post(`${COMMON_URL}/examiners`, data, {
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        const data = response.data;
        console.log(response.status);
        dispatch(RequestSuccess({ type: ACTION_TYPES.ASSIGN_EXAMINER_SUCCESS, payload: data }));
        dispatch(fetchStaffAsync());
        toast.success('Examiner successfully added!', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 6000
        });
      })
      .catch(function (error) {
        dispatch(RequestFailure({ type: ACTION_TYPES.ASSIGN_EXAMINER_FAILURE, payload: error.message }));
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          toast.error(error.response.data, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 6000
          });
        } else if (error.request) {
          console.log(error.message);
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
        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ' + error);
      });
  };
};
