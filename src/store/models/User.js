import axios from "axios";
const API_URL = "http://localhost:4000/api/users";

export const users = {
  namespace: true,
  state: {
    users: [],
    user: {},
  },

  getters: {
    getUser: (state) => state.user,
    getUsers: (state) => state.users,
    // getUser = (state, id) {
    //    state.users.map((user) => {
    //     if (user.id = id)
    //       return user
    //   })
    // }
  },

  mutations: {
    setUser: (state, data) => (state.users = data),
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

    async login({ commit }, id) {
      try {
        let data = await axios.get(`${API_URL}/${id}`).then((res) => {
          return res.data.data;
        });
        console.log(data);
        commit("setUser", data);

        // if (data.lenght) dispatch("getUser", data);
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
  },
};
