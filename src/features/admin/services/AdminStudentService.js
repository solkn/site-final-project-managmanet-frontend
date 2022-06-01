import { authHeader } from "./auth_header";
import axios from "axios";
import { COMMON_URL } from "src/common/api";


class AdminStudentService{

    getAll() {
        

        return axios.get(
            `${COMMON_URL}/students`,
            {
                headers: authHeader()
          
            }
            
        );
    }

    get(id) {
        return axios.get(
            `${COMMON_URL}/students${id}`,
            {
                headers:authHeader()
            }
        );
    }

    create(data) {
        return axios.post(
           `${COMMON_URL}/students`,
            data,
            {
                headers:authHeader()
            }
        );
    }

    upload(data){
        return axios.post(
            `${COMMON_URL}/students`,
            data,
            {
                headers:authHeader()
            }
        );
    }

    update(username,email,is_staff,is_superuser,batch,is_active) {
        return axios.put(
            `${COMMON_URL}/students${username}`,
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
            `${COMMON_URL}/students${id}`,
            {
                headers:authHeader()
            }
        );
    }


}

export default new AdminStudentService();