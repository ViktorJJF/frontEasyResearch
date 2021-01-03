import axios from "axios";
export default {
  list(query = { sort: "name", order: "1" }) {
    return axios.get("/api/users", { params: query });
  },
  update(id, payload) {
    return axios.put(`/api/users/${id}`, payload);
  },
  create(payload) {
    return axios.post("/api/users", payload);
  },
  delete(id) {
    return axios.delete(`/api/users/${id}`);
  },
};
