import { combineReducers } from 'redux';
import userGetReducer from './common/redux/Profile/reducer';
import snackbarReducer from './common/redux/Profile/snackbarReducer';
import { AdminReducer } from './features/admin/Redux';
import assignCoordinatorReducer from './features/admin/Redux/assignCoordinator/reducer';
import batchReducer from './features/admin/Redux/batch/batchReducer';
import AddStudents from './features/admin/Redux/staff/addStudents';
import AddStaffsWithFormReducer from './features/admin/Redux/staff/staffReducer';
import ListStudentsReducer from './features/admin/Redux/staff/studentReducer';
import adGetGroupsReducer from './features/advisor/redux/reducer';
import { authReducer } from './features/auth/AuthReducer';
import groupListReducer from './features/coordiator/Redux/FetchGrpoup/reducer';
import CoordinatorDeadlinesReducer from './features/coordiator/Redux/Submission/deadlinesReducer';
import CoordinatorSubmissionTypeReducer from './features/coordiator/Redux/Submission/SubmissionType';
import listExaminerGroupsReducer from './features/examiner/redux/ExaminerReducer';

import { StudentReducer } from './features/student/Redux/StudentReducer';

const rootReducer = combineReducers({
  ///anackbar
  snackbar: snackbarReducer,

  auth: authReducer,

  //ADMIN
  admin: AdminReducer,
  ad_staff: AddStaffsWithFormReducer,
  add_student:AddStudents,
  assign: assignCoordinatorReducer,
  batch: batchReducer,
  ad_student: ListStudentsReducer,

  //COORDINATOR
  co_group: groupListReducer,
  oneUser:userGetReducer,
  ad_group:adGetGroupsReducer,
  student: StudentReducer,
  co_deadline: CoordinatorDeadlinesReducer,
  co_submissionT: CoordinatorSubmissionTypeReducer,

  //EXAMINER
  ex_group: listExaminerGroupsReducer
});

export default rootReducer;
