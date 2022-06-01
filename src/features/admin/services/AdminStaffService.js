import { authHeader } from "./auth_header";
import axios from "axios";
import { COMMON_URL } from "src/common/api";


class AdminStaffService{

    getAll() {
        
        return axios.get(
            `${COMMON_URL}/staffs`,
            {
                headers: authHeader()
          
            }
            
        );
    }

    get(id) {
        return axios.get(
            `${COMMON_URL}/staffs/${id}`,
            {
                headers:authHeader()
            }
        );
    }

    create(username,email,first_name,last_name) { 
        console.log(username,email,first_name,last_name);
        return axios.post(
            `${COMMON_URL}/staffs`,
            {
                
                username:username,
                email:email,
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
            `${COMMON_URL}/staffs/${username}`,
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
            `${COMMON_URL}/staffs/${id}`,
            {
                headers:authHeader()
            }
        );
    }

}


export default new AdminStaffService();