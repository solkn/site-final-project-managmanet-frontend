
// export function authHeader() {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (user && user.accessToken) {
//       return { 'x-access-token': user.accessToken };
//     } else {
//       return {};
//     }
//   }

const token = "d27dcefc9ee0dafeceac0b131a22cb6534861de6";

export function authHeader() {

  return {
    //'Authorization': `token ${localStorage.getItem('token')}`

    'Authorization': 'token ' + localStorage.getItem('token')

  }

}