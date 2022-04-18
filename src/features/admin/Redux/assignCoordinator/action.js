import axios from 'axios';
import { ASSIGN_COORDINATOR_TYPES } from './type';
import { toast } from 'react-toastify';

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
      .post(
        'http://sfpm.herokuapp.com/api/coordinators',
        coordinator,
        {
          headers: {
            Authorization: 'token ' + localStorage.getItem('token')
          }
        }
      )
      .then((response) => {
        console.log(':assign Coordinator ' + response);
        const users = response.data;
        dispatch(assignCoorinatorSuccess(users));
      })
      .catch((error) => {
        const errMsg = error.message;
        console.log("errrrrrrrrrrrrrrr:   ",error);
        dispatch(assignCoorinatorFailure(errMsg));
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      });
  };
};
