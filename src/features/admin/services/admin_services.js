import http from "../../../common/api";
export default class ItemDataService {

  // signIn(data){
  //   return http.post("/login", data);
  // }
 static getAllStudents() {
    return http.get("/students");
  }

  // get(id) {
  //   return http.get(`/items/${id}`);
  // }
 static create(data) {
   console.log("wwwwwwwwwwwwwwwwwwwwwwwwww ",data);
    return http.post("/coordinators", {data});
  }
  // update(id, data) {
  //   return http.put(`/items/${id}`, data);
  // }
  // delete(id) {
  //   return http.delete(`/items/${id}`);
  // }
  // deleteAll() {
  //   return http.delete(`/items`);
  // }
  // findByTitle(title) {
  //   return http.get(`/items?title=${title}`);
  // }
}
// export default new ItemDataService();