import axios from "axios";
const API_URL = "http://localhost:4000/api/users";
const user = JSON.parse(localStorage.getItem("user"));
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

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
              throw new Error("incorrect credentials.");
            localStorage.setItem("user", JSON.stringify(res.data.data));
            commit("setUser", res.data.data);
          });
      } catch (e) {
        createToast(e.message, {
          type: "danger",
        });
      }
    },

    async register({ dispatch, getters }, userData) {
      try {
        const users = getters.getUsers;

        users.filter((u) => {
          if (u.email === userData.email)
            throw new Error("Email already exists.");
        });

        const data = await axios
          .post(`${API_URL}`, { user: userData })
          .then((res) => {
            createToast("You have been successfully registered", {
              type: "success",
            });
            return res.data.data;
          });

        if (data.lenght) dispatch("loadUsers");
      } catch (e) {
        createToast(e.message, {
          type: "danger",
        });
      }
    },

    async deleteUser({ dispatch }, id) {
      await axios.delete(`${API_URL}/${id}`).then(() => {
        console.log("utilisateur supprimé");
      });
      createToast("The user has been successfully deleted", {
        type: "success",
      });
      dispatch("logout");
    },

    async updateUser({ commit, dispatch }, { id, username, email }) {
      let data = await axios
        .put(`${API_URL}/${id}`, { user: { username, email } })
        .then((res) => {
          createToast("The user has been successfully updated", {
            type: "success",
          });
          return res.data.data;
        });
      commit("setUser", data);

      dispatch("login", ({ username, email } = data));
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
