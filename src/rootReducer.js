import { combineReducers } from "redux"
import { AdminReducer } from "./features/admin/Redux/AdminReducer";

const rootReducer =  combineReducers ({
  admin:AdminReducer, 
});

export default rootReducer;

// import { combineReducers } from "redux";
// import userReducer from "./user/reducer";
// import messageReducer from "./message/reducer";

// const rootReducer = combineReducers({
//   user: userReducer,
//   message:messageReducer,

// });

// export default rootReducer;