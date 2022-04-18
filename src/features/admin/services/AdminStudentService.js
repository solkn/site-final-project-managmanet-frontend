import { authHeader } from "./auth_header";
import axios from "axios";

const baseURL = "http://sfpm.herokuapp.com/api";


class AdminStudentService{

    getAll() {
        

        return axios.get(
            `${baseURL}/students`,
            {
                headers: authHeader()
          
            }
            
        );
    }

    get(id) {
        return axios.get(
            `${baseURL}/students${id}`,
            {
                headers:authHeader()
            }
        );
    }

    create(data) {
        return axios.post(
           `${baseURL}/students`,
            data,
            {
                headers:authHeader()
            }
        );
    }

    upload(data){
        return axios.post(
            `${baseURL}/students`,
            data,
            {
                headers:authHeader()
            }
        );
    }

    update(username,email,is_staff,is_superuser,batch,is_active) {
        return axios.put(
            `${baseURL}/students${username}`,
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
            `${baseURL}/students${id}`,
            {
                headers:authHeader()
            }
        );
    }


}

export default new AdminStudentService();