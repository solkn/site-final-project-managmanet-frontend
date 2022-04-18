import { authHeader } from "./auth_header";
import axios from "axios";

const baseURL = "http://sfpm.herokuapp.com/api";

class AdminStaffService{

    getAll() {
        
        return axios.get(
            `${baseURL}/staffs`,
            {
                headers: authHeader()
          
            }
            
        );
    }

    get(id) {
        return axios.get(
            `${baseURL}/staffs/${id}`,
            {
                headers:authHeader()
            }
        );
    }

    create(username,email,password,password2,first_name,last_name) { 
        console.log(username,email,password,password2,first_name,last_name);
        return axios.post(
            `${baseURL}/staffs`,
            {
                
                username:username,
                email:email,
                password:password,
                password2:password2,
                first_name:first_name,
                last_name:last_name,
                
                
            },

          
          
            {
                headers: authHeader()
          
            }
        );
    }

    update(username,email,is_staff,is_superuser) {
        return axios.put(
            `${baseURL}/staffs/${username}`,
            username,
            email,
            is_staff,
            is_superuser,
            {
                headers:authHeader()
            }
        );
    }

    delete(id) {
        return axios.delete(
            `${baseURL}/staffs/${id}`,
            {
                headers:authHeader()
            }
        );
    }

}


export default new AdminStaffService();