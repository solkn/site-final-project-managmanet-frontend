import http from '../../../common/api';

export default class StudentDataService{
    static getAllStudents(){
        return http.get('/students?batch=2014&all=False');
    }
    static createStudentGroup(data){
        return http.post('/groups', data);
    }
    static fetchStudentGroup(){
        return http.get('/groups/mygroup');
    }
    static fetchTitle(group_id){
        return http.get(`/groups/${group_id}/titles`);
    }
    static submitTitle(group_id, data){
        return http.post(`/groups/${group_id}/titles`, data);
    }
    static fetchProposal(group_id){
        return http.get(`/submissions?group=${group_id}&submissionType=Proposal`);
    }
    static submitProposal(data){
        return http.post(`/submissions`, data)
    }
    static fetchSRS(group_id){
        return http.get(`/submissions?group=${group_id}&submissionType=SRS`);
    }
    static submitSRS(data){
        return http.post(`/submissions`, data);
    }
    static fetchSDS(group_id){
        return http.get(`/submissions?group=${group_id}&submissionType=SDS`);
    }
    static submitSDS(data){
        return http.post(`/submissions`, data);
    }
    static fetchSourceCode(group_id){
        return http.get(`/submissions?group=${group_id}&submissionType=CODE`);
    }
    static submitSourceCode(data){
        return http.post(`/submissions`, data);
    }

    /**
     *  Deadlines 
     */
    static fetchTitleDeadline(group_id){
        return http.get();
    }
}