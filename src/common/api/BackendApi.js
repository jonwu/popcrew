import axios from 'axios';

const URL = 'http://localhost:3000';
const instance = axios.create({ timeout: 10000, baseURL: URL });


instance.interceptors.request.use((i_config) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`\n(${i_config.method.toUpperCase()}) ${i_config.url} ${i_config.params ? JSON.stringify(i_config.params) : JSON.stringify(i_config.data)}`);
  }
  return i_config;
}, (error) => {
  return Promise.reject(error);
});


class API {
  getEvents(params) {
    return instance.get(`/events`, { params });
  }
  postEvents(params) {
    return instance.post(`/events`, params);
  }
  postUser(params) {
    return instance.post(`/users`, params);
  }
  getUsers(params) {
    return instance.get(`/users`, { params });
  }
  getUser(params, userId) {
    return instance.get(`/users/${userId}`, { params });
  }
  signIn(params) {
    return instance.get(`/signIn`, { params });
  }

  getInvitations(params) {
    return instance.get(`/invitations`, { params });
  }

}
export default new API();
