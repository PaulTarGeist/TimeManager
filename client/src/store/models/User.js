import axios from "axios";
const API_URL = "http://localhost:4000/api/users";

export const users = {
  namespace: true,
  state: {
    users: null,
    user: null,
  },

  getters: {
    getUser: (state) => state.user,
    getUsers: (state) => state.users,
  },

  mutations: {
    setUser: (state, data) => (state.user = data),
    setUsers: (state, data) => (state.users = data),
  },

  actions: {
    async loadUsers({ commit }) {
      try {
        let data = await axios.get(API_URL).then((res) => {
          return res.data.data;
        });

        commit("setUsers", data);
      } catch (e) {
        console.error(e);
      }
    },
    async login({ commit }, { username, email }) {
      try {
        let user = await axios
          .get(`${API_URL}?username=${username}&email=${email}`)
          .then((res) => {
            return res.data.data;
          });

        if (user !== null) {
          commit("setUser", user);
        }
      } catch (e) {
        console.error(e);
      }
    },

    async register({ dispatch }, userData) {
      try {
        let data = await axios
          .post(`${API_URL}`, { user: userData })
          .then((res) => {
            return res.data.data;
          });
        console.log(data);

        if (data.lenght) dispatch("loadUsers");
      } catch (e) {
        console.error(e);
      }
    },

    async deleteUser({ dispatch }, id) {
      await axios.delete(`${API_URL}/${id}`).then((res) => {
        console.log(res);
      });
      dispatch("loadUsers");
    },
  },
};
