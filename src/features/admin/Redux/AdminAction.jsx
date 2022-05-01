
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

export const createStaffSuccess = (data) => ({
  type: ADMINACTIONTYPES.STAFF_CREATE_SUCCESS,
  payload: {
  data,
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

export const createStudentStart = () => ({
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

export const updateStudentSuccess = (student) => ({
  type: ADMINACTIONTYPES.STUDENT_UPDATE__SUCCESS,
  payload: {
    student,
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

export const deleteStudentSuccess = (student) => ({
  type: ADMINACTIONTYPES.STUDENT_DELETE_SUCCESS,
  payload: {
    student,
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

    // try{
    //   dispatch(createStaffStart);
    // const response = await axios.post('http://sfpm.herokuapp.com/api/staffs',
       
    // {data},
    //    {
    //     headers: {
    //             'Authorization': 'token ' + localStorage.getItem('token')
    //           }
         
    //    }
    // );
    // dispatch(createStaffSuccess(response.data));

    // }catch(err){
    //   dispatch(createStaffFailure(err));

    // }
    
      dispatch(createStaffStart());

    await axios.post('http://sfpm.herokuapp.com/api/staffs',data , {
        headers: {
          'Authorization': 'token ' + localStorage.getItem('token')
        }
      }).then((res)=>{
        dispatch(createStaffSuccess(res.data.results));
      })

      // await AdminStaffService.create(data).then((res)=>{
      //   dispatch(createStaffSuccess(res.data.results));
      // })

      

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


export const updateStaffAsync = (id,data) => {

  return async (dispatch) => {

  //   try {
  //     dispatch(updateStaffStart());

  //     const response = await AdminStaffService.update(
  //       id,
  //       data
  //     );

  //     dispatch(updateStaffSuccess(response.data.results));
  //   } catch (err) {
  //     dispatch(updateStaffFailure(err));
  //   }
  // };
  dispatch(updateStaffStart());
  await axios.put(`http://sfpm.herokuapp.com/api/staffs/${id}`,data , {
    headers: {
      'Authorization': 'token ' + localStorage.getItem('token')
    }
  }).then((res)=>{
    dispatch(updateStaffSuccess(res.data.results));
  }) 

  .catch(function (error) {
    dispatch(updateStaffFailure(error));
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

export const deleteStaffAsync = (id) => {
  return async (dispatch) => {

    // try {
    //   dispatch(deleteStaffStart());
    //   const response = await AdminStaffService.delete(

    //     id
    //   );

    //   dispatch(deleteStaffSuccess(response.data.data));
    // } catch (err) {
    //   dispatch(deleteStaffFailure(err));
    // }
    dispatch(deleteStaffStart());
    await axios.delete(`http://sfpm.herokuapp.com/api/staffs/${id}`, {
      headers: {
        'Authorization': 'token ' + localStorage.getItem('token')
      }
    }).then((res)=>{
      dispatch(deleteStaffSuccess(res.data));
    })


    .catch(function (error) {
      dispatch(deleteStaffFailure(error));
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

          response.data

        )
      );
      console.log('students:',response);
      
    } catch (err) {
      dispatch(fetchStudentFailure(err));
    }
  };

};


export const createStudentAsync = (data) => {

  return async (dispatch) => {

    // try {
    //   dispatch(createSudentStart());

    //   const response = await AdminStudentService.create(
    //    data,
    //   );

    //   dispatch(createStudentSuccess(response.data.results));
    // } catch (err) {
    //   dispatch(createStudentFailure(err));
    // }
    dispatch(createStudentStart());

    await axios.post('http://sfpm.herokuapp.com/api/students',data , {
        headers: {
          'Authorization': 'token ' + localStorage.getItem('token')
        }
      }).then((res)=>{
        dispatch(createStudentSuccess(res.data));
      })

      

      .catch(function (error) {
        dispatch(createStudentFailure(error));
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

export const uploadStudentAsync = (data) => {

  return async (dispatch) => {

    dispatch(uploadSudentStart());

    await axios.post('http://sfpm.herokuapp.com/api/students/2014',data , {
        headers: {
          'Authorization': 'token ' + localStorage.getItem('token'),
          'Content-Type':'multipart/form-data'
        }
      }).then((res)=>{
        dispatch(uploadStudentSuccess(res.data));
      })

      .catch(function (error) {
        dispatch(uploadStudentFailure(error));
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

export const updateStudentAsync = (id,data) => {
  return async (dispatch) => {

    // try {
    //   dispatch(updateStaffStart());

    //   const response = await AdminStudentService.update(
    //     id,
    //     data
    //   );
    //   dispatch(updateStudentSuccess(response.data.results));
    // } catch (err) {
    //   dispatch(updateStaffFailure(err));
    // }
    dispatch(updateStudentStart());
    await axios.put(`http://sfpm.herokuapp.com/api/students/${id}`,data , {
      headers: {
        'Authorization': 'token ' + localStorage.getItem('token')
      }
    }).then((res)=>{
      dispatch(updateStudentSuccess(res.data));
    }) 
  
    .catch(function (error) {
      dispatch(updateStudentFailure(error));
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

export const deleteStudentAsync = (id) => {
  return async (dispatch) => {

    // try {
    //   dispatch(deleteStudentStart());
    //   const response = await AdminStudentService.delete(

    //     id

    //   );
    //   dispatch(deleteStudentSuccess(response.data.results));
    // } catch (err) {
    //   dispatch(deleteStudentFailure(err));
    // }
    dispatch(deleteStudentStart());
    await axios.delete(`http://sfpm.herokuapp.com/api/students/${id}`, {
      headers: {
        'Authorization': 'token ' + localStorage.getItem('token')
      }
    }).then((res)=>{
      dispatch(deleteStudentSuccess(res.data));
    })


    .catch(function (error) {
      dispatch(deleteStudentFailure(error));
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
