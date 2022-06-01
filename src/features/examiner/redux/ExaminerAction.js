/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { toast } from 'react-toastify';

// import { errorToast } from 'src/utils/toastMsg';
import { COMMON_URL } from 'src/common/api';
import { ACTION_TYPES } from './ExaminerType';

export const listExaminerGroups = () => {
  return async (dispatch) => {
    dispatch(RequestStart({ type: ACTION_TYPES.LIST_EXAMINER_GROUP_START }));
    await axios
      .get(`${COMMON_URL}/examiner-students`, {
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        const data = response.data;
        console.log(response.status);
        dispatch(RequestSuccess({ type: ACTION_TYPES.LIST_EXAMINER_GROUP_SUCCESS, payload: data }));
      })
      .catch(function (error) {
        dispatch(
          RequestFailure({ type: ACTION_TYPES.LIST_EXAMINER_GROUP_FAILURE, payload: error.message })
        );
        if (error.message==='Request failed with status code 500') {
          toast.error('Internal Server Error', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 4000
          });
        }
  
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
        // errorToast(error);
        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ' + error);
      });
  };
};

/////GET SUBMISSION TYPES

const RequestStart = ({ type }) => {
  return { type: type };
};
const RequestSuccess = ({ type, payload }) => {
  return { type: type, payload: payload };
};
const RequestFailure = ({ type, error }) => {
  return { type: type, payload: error };
};
