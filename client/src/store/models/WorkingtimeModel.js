import axios from "axios";
const API_URL = "http://localhost:4000/api/workingtimes";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
export const workingtimes = {
  namespace: true,
  state: {
    workingtimes: null,
    workingtime: null,
    load: true,
  },

  getters: {
    getWorkingtimes: (state) => state.workingtimes,
    getWorkingtime: (state) => state.workingtime,
    getLoad: (state) => state.load,
  },

  mutations: {
    setWorkingtimes: (state, data) => (state.workingtimes = data),
    setWorkingtime: (state, data) => (state.workingtime = data),
    setLoad: (state, data) => (state.load = data),
  },

  actions: {
    async loadWorkingtimes({ commit }, { userId, start, end }) {
      try {
        return await axios
          .get(`${API_URL}/${userId}?start=${start}&end=${end}`)
          .then((res) => {
            commit("setWorkingtimes", res.data.data);
            return res.data.data;
          });
      } catch (e) {
        createToast("An error occurred during rendering working times", {
          type: "error",
        });
        console.error(e);
      }
    },

    async loadWorkingtime({ commit }, { userId, workingtimeId }) {
      try {
        const data = await axios
          .get(`${API_URL}/${userId}/${workingtimeId}`)
          .then((res) => {
            return res.data.data;
          });

        commit("setWorkingtime", data);
      } catch (e) {
        createToast("An error occurred during rendering working time", {
          type: "error",
        });
      }
    },

    async createWorkingtime({ commit }, { start, end, userId }) {
      try {
        return await axios
          .post(`${API_URL}/${userId}`, {
            start,
            end,
            user: userId,
          })
          .then(() => {
            createToast("Working time has been created successfully", {
              type: "success",
            });
          });
      } catch (e) {
        createToast("An error occurred during working time creation", {
          type: "error",
        });
      }
      commit("setWorkingtime", { start, end, userId });
    },

    async updateWorkingtime({ commit }, { wtId, start, end }) {
      try {
        await axios.put(`${API_URL}/${wtId}`, { start, end }).then((res) => {
          createToast("Working time has been updated successfully", {
            type: "success",
          });
          commit("setWorkingtime", res.data.data);
          return res.data.data;
        });
      } catch (e) {
        createToast("An error occurred during update", {
          type: "error",
        });
        console.error(e);
      }
    },

    async deleteWorkingtime({ commit }, id) {
      try {
        return await axios.delete(`${API_URL}/${id}`).then(() => {
          createToast("Working time has been deleted", {
            type: "success",
          });
        });
      } catch (e) {
        createToast("An error occurred during deletion", {
          type: "error",
        });
      }

      commit("setWorkingtime", id);
    },
  },
};
