import axios from 'axios';
export default {
  list(query) {
    if (query && !query.sort && !query.order) {
      (query.sort = 'createdAt'), (query.order = 'desc');
    }
    return axios.get('/api/users', { params: query });
  },
  update(id, payload) {
    return axios.put(`/api/users/${id}`, payload);
  },
  create(payload) {
    return axios.post('/api/users', payload);
  },
  delete(id) {
    return axios.delete(`/api/users/${id}`);
  },
};
