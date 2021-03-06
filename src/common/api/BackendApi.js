import axios from 'axios';

// const URL = 'http://ec2-54-153-45-16.us-west-1.compute.amazonaws.com:3000';
// const URL = 'http://192.168.86.81:3000';
const URL = 'http://localhost:3000';
const instance = axios.create({ timeout: 10000, baseURL: URL });


instance.interceptors.request.use((i_config) => {
  if (process.env.NODE_ENV !== 'production') {
    // console.log(`\n(${i_config.method.toUpperCase()}) ${i_config.url} ${i_config.params ? JSON.stringify(i_config.params) : JSON.stringify(i_config.data)}`);
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
  patchEvent(eventId, params) {
    return instance.patch(`/events/${eventId}`,params);
  }
  postUser(params) {
    return instance.post(`/users`, params);
  }
  patchUser(userId, params) {
    return instance.patch(`/users/${userId}`, params);
  }
  getUsers(params) {
    return instance.get(`/users`, { params });
  }
  getUser(params, userId) {
    return instance.get(`/users/${userId}`, { params });
  }
  postGroup(params) {
    return instance.post(`/groups`, params);
  }
  patchGroups(userId, params) {
    return instance.patch(`/groups/${groupId}`, params);
  }
  getGroups(params) {
    return instance.get(`/groups`, { params });
  }
  signIn(params) {
    return instance.get(`/signin`, { params });
  }

  getInvitations(params) {
    return instance.get(`/invitations`, { params });
  }
  patchInvitation(params) {
    return instance.patch(`/invitations`, params);
  }

}
export default new API();
