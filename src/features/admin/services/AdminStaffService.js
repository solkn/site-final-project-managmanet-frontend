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

    create(data) { 
        return axios.post(
            `${baseURL}/staffs`,
            
              data,
            
          
            {
                headers: authHeader()
          
            }
        );
    }

    update(id,data) {
        return axios.put(
            `${baseURL}/staffs/${id}`,
            data,
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