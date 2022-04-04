import { authHeader } from "./auth_header";
import axios from "axios";

const baseURL = "http://sfpm.herokuapp.com";


class AdminStudentService{

    getAll() {
        

        return axios.get(
            `${baseURL}/api/students/`,
            {
                headers: authHeader()
          
            }
            
        );
    }

    get(id) {
        return axios.get(
            `${baseURL}/api/students/${id}`,
            {
                headers:authHeader()
            }
        );
    }

    update(username,email,is_staff,is_superuser,batch,is_active) {
        return axios.put(
            `${baseURL}/api/students/${username}`,
            username,
            email,
            is_staff,
            is_superuser,
            batch,
            is_active,
            {
                headers:authHeader()
            }
        );
    }

    delete(id) {
        return axios.delete(
            `${baseURL}/api/students/${id}`,
            {
                headers:authHeader()
            }
        );
    }


}

export default new AdminStudentService();