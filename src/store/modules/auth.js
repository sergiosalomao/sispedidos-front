import { http } from '../../service/Http';

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
};

const actions = {
  AUTH_REQUEST: ({ commit, dispatch }, user) => new Promise((resolve, reject) => {
    commit('AUTH_REQUEST');
    http.post(`${process.env.API_URL}/login`, user).then((resp) => {
      const token = `${resp.data.token_type} ${resp.data.access_token}`;
      localStorage.setItem('user-token', token);
      // window.axios.defaults.headers.common.Authorization = token;
      commit('AUTH_SUCCESS', token);
      dispatch('user/USER_REQUEST', null, { root: true });
      resolve(resp.data);
    }).catch((err) => {
      commit('AUTH_ERROR');
      localStorage.removeItem('user-token');
      reject(err);
    });
  }),


  AUTH_LOGOUT: ({ commit }) => new Promise((resolve) => {
    commit('AUTH_LOGOUT');
    localStorage.removeItem('user-token');
    resolve();
  }),
};

const mutations = {
  AUTH_REQUEST: (state) => {
    state.status = 'loading';
  },
  AUTH_SUCCESS: (state, resp) => {
    state.status = 'success';
    state.token = resp;
  },
  AUTH_LOGOUT: (state) => {
    state.token = '';
  },
  AUTH_ERROR: (state) => {
    state.status = 'error';
  },
};

const state = {
  token: localStorage.getItem('user-token') || '',
  status: '',
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
