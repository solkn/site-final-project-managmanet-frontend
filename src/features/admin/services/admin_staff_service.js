
import { authHeader } from "./auth_header";
import axios from "axios";

const baseURL = "http://sfpm.herokuapp.com";

class AdminStaffService{

    getAll() {
        
        return axios.get(
            `${baseURL}/api/staffs/`,
            {
                headers: authHeader()
          
            }
            
        );
    }

    get(id) {
        return axios.get(
            `${baseURL}/api/staffs/${id}`,
            {
                headers:authHeader()
            }
        );
    }

    update(username,email,is_staff,is_superuser) {
        return axios.put(
            `${baseURL}/api/staffs/${username}`,
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
            `${baseURL}/api/staffs/${id}`,
            {
                headers:authHeader()
            }
        );
    }

}


export default new AdminStaffService();