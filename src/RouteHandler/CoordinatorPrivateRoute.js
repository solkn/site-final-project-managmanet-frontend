// // import React from "react";
// import { Navigate } from 'react-router-dom';
// // import { loggedin_user } from "./loggedindata";
// // // import { useAuthState } from "../context";

// // const PrivateRoute = ({exact, component: Component, ...rest }) => {
// //   // const { auth_user } = useAuthState(); //read user details from context
// //   const auth_user = loggedin_user
// //   return (
// //     <Route
// //       exact
// //       {...rest}
// //       render={(props) =>
// //         // localStorage.getItem("token")
// //         auth_user ? (
// //           <Component {...props} />
// //         ) : (
// //           <Redirect
// //             to={{
// //               pathname: "/auth/login",
// //               state: { from: props.location },
// //             }}
// //           />
// //         )
// //       }
// //     />
// //   );
// // };

// // export default PrivateRoute;
// // const PrivateRoute = ({ component: Component, ...restOfProps }) => {
// //   const isAuthenticated = localStorage.getItem('token');
// //   console.log('this', isAuthenticated);

// //   return (
// //     <Route
// //       {...restOfProps}
// //       render={(props) => (isAuthenticated ? <Component {...props} /> : <Navigate to="/signin" />)}
// //     />
// //   );
// // };

// function CooPrivateRoute({ children }) {
//   const isAuthenticated = localStorage.getItem('user_id');
//   console.log('user_ID: ', isAuthenticated);
//   const is_admin = localStorage.getItem('is_superadmin');

//   return isAuthenticated && is_admin ? children : <Navigate to="/login" />;
// }
// export default CooPrivateRoute;
