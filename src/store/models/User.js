import axios from "axios";
const API_URL = "http://localhost:4000/api/users";
const user = JSON.parse(localStorage.getItem("user"));

export const users = {
  namespace: true,
  state: {
    users: null,
    user: user ? user : null,
    loggedIn: user ? true : false,
  },

  getters: {
    getLoggedIn: (state) => state.loggedIn,
    getUser: (state) => state.user,
    getUsers: (state) => state.users,
  },

  mutations: {
    setUser: (state, data) => (state.user = data),
    setUsers: (state, data) => (state.users = data),
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
    },
  },

  actions: {
    async login({ commit }, { username, email }) {
      try {
        await axios
          .get(`${API_URL}?username=${username}&email=${email}`)
          .then((res) => {
            if (res.data.data === null)
              throw new Error("identifiants inccorect.");

            localStorage.setItem("user", JSON.stringify(res.data.data));
            commit("setUser", res.data.data);
          });
      } catch (e) {
        console.error(e.message);
      }
    },

    async register({ dispatch, getters }, userData) {
      try {
        const users = getters.getUsers;

        users.filter((u) => {
          if (u.email === userData.email)
            throw new Error("l'email existe déja.");
        });

        const data = await axios
          .post(`${API_URL}`, { user: userData })
          .then((res) => {
            return res.data.data;
          });

        if (data.lenght) dispatch("loadUsers");
      } catch (e) {
        console.log(e.message);
      }
    },

    async deleteUser({ dispatch }, id) {
      await axios.delete(`${API_URL}/${id}`).then(() => {
        console.log("utilisateur supprimé");
      });
      dispatch("loadUsers");
    },

    logout({ commit }) {
      localStorage.removeItem("user");
      commit("logout");
    },

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
  },
};
