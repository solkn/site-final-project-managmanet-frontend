import http from '../../../common/api';

export default class StudentDataService{

    static getAllStudents(){
        return http.get('/students');
    }

    static createStudentGroup(data){
        return http.post('/groups', data);
    }

    static getStudentGroup(){
        return http.get('/groups');
    }
}