import axios from 'axios';
export default {
  list(query = { sort: 'createdAt', order: '1' }) {
    return axios.get('/api/brands', { params: query });
  },
  update(id, payload) {
    return axios.put(`/api/brands/${id}`, payload);
  },
  create(payload) {
    return axios.post('/api/brands', payload);
  },
  delete(id) {
    return axios.delete(`/api/brands/${id}`);
  },
};
