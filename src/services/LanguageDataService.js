import http from "../http-common";

class LanguageDataService {
  getAll() {
    return http.get("/languages");
  }

  get(id) {
    return http.get(`/languages/${id}`);
  }

  create(data) {
    return http.post("/languages", data);
  }

  update(id, data) {
    return http.put(`/languages/${id}`, data);
  }

  delete(id) {
    return http.delete(`/languages/${id}`);
  }

  deleteAll() {
    return http.delete(`/languages`);
  }

  findByTitle(title) {
    return http.get(`/languages?title=${title}`);
  }
}

export default new LanguageDataService();
