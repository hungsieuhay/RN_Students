import axiosClient from './axiosClient';

const subjectsApi = {
  getAll(params) {
    const url = '/subjects';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/subjects/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/subjects';
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/subjects/${data.id}`;
    return axiosClient.put(url, data);
  },
  remove(id) {
    const url = `/subjects/${id}`;
    return axiosClient.delete(url);
  },
};

export default subjectsApi;
