import { combineReducers } from 'redux';
import { AdminReducer } from './features/admin/Redux';
import assignCoordinatorReducer from './features/admin/Redux/assignCoordinator/reducer';

import { authReducer } from './features/auth/AuthReducer';

const rootReducer = combineReducers({
  auth:authReducer,
  admin:AdminReducer,
  assign:assignCoordinatorReducer
});

export default rootReducer;
