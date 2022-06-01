import axios from 'axios';
import { ADD_BATCH_TYPES } from './type';
// import { toast } from 'react-toastify';
import successToast, { errorToast, } from 'src/utils/toastMsg';
import { COMMON_URL } from 'src/common/api';

const addBatchRequest = () => {
  return { type: ADD_BATCH_TYPES.ADD_BATCH_START };
};

const addBatchSuccess = (batch) => {
  return { type: ADD_BATCH_TYPES.ADD_BATCH_SUCCESS, payload: batch };
};

const addBatchFailure = (error) => {
  return { type: ADD_BATCH_TYPES.ADD_BATCH_FAILURE, payload: error };
};

export const addBatch = (batch) => {
  console.log('sdfghkl' + batch);
  return async (dispatch) => {
    dispatch(addBatchRequest);
    await axios
      .post(`${COMMON_URL}/batches`, batch, {
        headers: {
          Authorization: 'token ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        console.log(':add batch ' + response);
        const batch = response.data;
        console.log(response.status);
        dispatch(addBatchSuccess(batch));
        successToast('Batch added successfully!');
      })
      .catch(function (error) {
        dispatch(addBatchFailure(error.message));
        if (error.response) {
          console.log(error.response.data.name[0]);
          console.log(error.response.status);
          console.log(error.response.headers);
          errorToast(error.response.data.name[0]);
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
