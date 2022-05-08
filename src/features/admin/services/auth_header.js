

export function authHeader() {

  return {

    'Authorization': 'token ' + localStorage.getItem('token')
    

  }

}