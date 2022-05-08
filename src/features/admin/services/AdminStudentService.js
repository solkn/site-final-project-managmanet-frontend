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

    update(id,data) {
        return axios.put(
            `${baseURL}/students${id}`,
            data,
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