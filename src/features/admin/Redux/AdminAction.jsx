
import { ADMINACTIONTYPES } from "./AdminType";
import AdminStaffService from "../services/AdminStaffService";
import AdminStudentService from "../services/AdminStudentService";
import axios from "axios";

/**
 * STAFF FETCH ACTION
 * @returns ACTION
 */


export const fetchStaffStart = () => ({
  type: ADMINACTIONTYPES.STAFF_FETCH_START,
});

export const fetchStaffSuccess = (staff) => ({
  type: ADMINACTIONTYPES.STAFF_FETCH_SUCCESS,
  payload: {
    staff,
  },
});

export const fetchStaffFailure = (error) => ({
  type: ADMINACTIONTYPES.STAFF_FETCH_FAILURE,
  payload: {
    error,
  },
});


/**
 * STAFF CREATE ACTION
 * 
 * @returns ACTION 
 */

export const createStaffStart = () => ({
  type: ADMINACTIONTYPES.STAFF_CREATE_START,
});

export const createStaffSuccess = (username, email, password, password2, first_name, last_name) => ({
  type: ADMINACTIONTYPES.STAFF_CREATE_SUCCESS,
  payload: {
    username,
    email,
    password,
    password2,
    first_name,
    last_name
  },
});

export const createStaffFailure = (error) => ({
  type: ADMINACTIONTYPES.STAFF_CREATE_FAILURE,
  payload: {
    error,
  },
});







/**
 * STAFF UPDATE ACTION
 * @returns ACTION
 */

export const updateStaffStart = () => ({
  type: ADMINACTIONTYPES.STAFF_UPDATE_START,
});

export const updateStaffSuccess = (staff) => ({
  type: ADMINACTIONTYPES.STAFF_UPDATE__SUCCESS,
  payload: {
    staff,
  },
});

export const updateStaffFailure = (error) => ({
  type: ADMINACTIONTYPES.STAFF_UPDATE_FAILURE,
  payload: {
    error,
  },
});

/**
 * STAFF DELETE ACTION
 * @returns ACTION
 */

export const deleteStaffStart = () => ({
  type: ADMINACTIONTYPES.STAFF_DELETE_START,
});

export const deleteStaffSuccess = (staff) => ({
  type: ADMINACTIONTYPES.STAFF_DELETE_SUCCESS,
  payload: {
    staff,
  },
});

export const deleteStaffFailure = (error) => ({
  type: ADMINACTIONTYPES.STAFF_DELETE_FAILURE,
  payload: {
    error,
  },
});




/**
 * STUDENT FETCH ACTION
 * @returns ACTION
 */


export const fetchStudentStart = () => ({
  type: ADMINACTIONTYPES.SUDENT_FETCH_START,
});

export const fetchStudentSuccess = (student) => ({
  type: ADMINACTIONTYPES.STUDENT_FETCH_SUCCESS,
  payload: {
    student,
  },
});

export const fetchStudentFailure = (error) => ({
  type: ADMINACTIONTYPES.STUDENT_FETCH_FAILURE,
  payload: {
    error,
  },
});


/**
 * STUDENT CREATE ACTION
 * 
 * @returns ACTION 
 */

export const createSudentStart = () => ({
  type: ADMINACTIONTYPES.STUDENT_CREATE_START,
  payload: {

  },
});

export const createStudentSuccess = (student) => ({
  type: ADMINACTIONTYPES.STUDENT_CREATE_SUCCESS,
  payload: {
    student,
  },
});

export const createStudentFailure = (error) => ({
  type: ADMINACTIONTYPES.STUDENT_CREATE_FAILURE,
  payload: {
    error,
  },
});


/**
 * STUDENT UPLOAD ACTION
 * 
 * @returns ACTION 
 */

export const uploadSudentStart = () => ({
  type: ADMINACTIONTYPES.STUDENT_UPLOAD_START,
  payload: {

  },
});

export const uploadStudentSuccess = (student) => ({
  type: ADMINACTIONTYPES.STUDENT_UPLOAD_SUCCESS,
  payload: {
    student,
  },
});

export const uploadStudentFailure = (error) => ({
  type: ADMINACTIONTYPES.STUDENT_UPLOAD_FAILURE,
  payload: {
    error,
  },
});

/**
 * STUDENT UPDATE ACTION
 * @returns ACTION
 */

export const updateStudentStart = () => ({
  type: ADMINACTIONTYPES.STUDENT_UPDATE_START,
});

export const updateStudentSuccess = (staff) => ({
  type: ADMINACTIONTYPES.STUDENT_UPDATE__SUCCESS,
  payload: {
    staff,
  },
});
export const updateStudentFailure = (error) => ({
  type: ADMINACTIONTYPES.STUDENT_UPDATE_FAILURE,
  payload: {
    error,
  },
});

/**
 * STUDENT DELETE ACTION
 * @returns ACTION
 */

export const deleteStudentStart = () => ({
  type: ADMINACTIONTYPES.STUDENT_DELETE_START,
});

export const deleteStudentSuccess = (staff) => ({
  type: ADMINACTIONTYPES.STUDENT_DELETE_SUCCESS,
  payload: {
    staff,
  },
});

export const deleteStudentFailure = (error) => ({
  type: ADMINACTIONTYPES.STUDENT_DELETE_FAILURE,
  payload: {
    error,
  },
});




/**
 * STAFF ASYNC ACTION TYPES
 */

export const fetchStaffAsync = () => {

  return async (dispatch) => {

    try {
      dispatch(fetchStaffStart());

      const response = await AdminStaffService.getAll();

      dispatch(
        fetchStaffSuccess(

          response.data.results

        )
      );

    } catch (err) {
      dispatch(fetchStaffFailure(err));
    }
  };
};


export const createStaffAsync = (data) => {
console.log(data);
  return async (dispatch) => {

    
      dispatch(createStaffStart());


      // const response = await AdminStaffService.create(
      //     username,
      //     email,
      //     password,
      //     password2,
      //     first_name,
      //     last_name   
      // );

    await axios.post('http://sfpm.herokuapp.com/api/staffs',data , {
        headers: {
          'Authorization': 'token ' + localStorage.getItem('token')
        }
      }).then((res)=>{
        dispatch(createStaffSuccess(res.data.results));
      })

      

      .catch(function (error) {
        dispatch(createStaffFailure(error));
        if (error.response) {
      
          
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };
};


export const updateStaffAsync = (username, email, first_name, last_name) => {

  return async (dispatch) => {

    try {
      dispatch(updateStaffStart());

      const response = await AdminStaffService.update(
        username,
        email,
        first_name,
        last_name,
      );

      dispatch(updateStaffSuccess(response.data.results));
    } catch (err) {
      dispatch(updateStaffFailure(err));
    }
  };
};

export const deleteStaffAsync = (id) => {
  return async (dispatch) => {

    try {
      dispatch(deleteStaffStart());
      const response = await AdminStaffService.delete(

        id,
      );

      dispatch(deleteStaffSuccess(response.data.data));
    } catch (err) {
      dispatch(deleteStaffFailure(err));
    }
  };
};







/**
 * STUDENT ASYNC ACTION TYPES
 */

export const fetchStudentAsync = () => {

  return async (dispatch) => {

    try {
      dispatch(fetchStudentStart);

      const response = await AdminStudentService.getAll();


      dispatch(
        fetchStudentSuccess(

          response.data.results

        )
      );
    } catch (err) {
      dispatch(fetchStudentFailure(err));
    }
  };

};


export const createStudentAsync = (data) => {

  return async (dispatch) => {

    try {
      dispatch(createSudentStart());

      const response = await AdminStudentService.create(
       data,
      );

      dispatch(createStudentSuccess(response.data.results));
    } catch (err) {
      dispatch(createStudentFailure(err));
    }
  };
};

export const uploadStudentAsync = (data) => {

  return async (dispatch) => {

    try {
      dispatch(uploadSudentStart());

      const response = await AdminStudentService.upload(
        data,
      );

      dispatch(uploadStudentSuccess(response.data.results));
    } catch (err) {
      dispatch(uploadStudentFailure(err));
    }
  };
};

export const updateStudentAsync = (username, email, is_staff, is_superuser, batch, is_active) => {
  return async (dispatch) => {

    try {
      dispatch(updateStaffStart());

      const response = await AdminStudentService.update(
        username,
        email,
        is_staff,
        is_superuser,
        batch,
        is_active,
      );
      dispatch(updateStudentSuccess(response.data.data));
    } catch (err) {
      dispatch(updateStaffFailure(err));
    }
  };
};

export const deleteStudentAsync = (id) => {
  return async (dispatch) => {

    try {
      dispatch(deleteStudentStart());
      const response = await AdminStudentService.delete(

        id

      );
      dispatch(deleteStudentSuccess(response.data.data));
    } catch (err) {
      dispatch(deleteStudentFailure(err));
    }
  };
};
