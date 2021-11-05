import axios from "axios";
const API_URL = "http://localhost:4000/api/workingtimes";

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
        console.error(e);
      }
    },

    async createWorkingtime({ commit }, { start, end, userId }) {
      try {
        return await axios.post(`${API_URL}/${userId}`, {
          start,
          end,
          user: userId,
        });
      } catch (e) {
        console.error(e);
      }
      commit("setWorkingtime", { start, end, userId });
    },

    async updateWorkingtime({ commit }, { wtId, start, end }) {
      let data = await axios
        .put(`${API_URL}/${wtId}`, { start, end })
        .then((res) => {
          return res.data.data;
        });

      commit("setWorkingtime", data);
    },

    async deleteWorkingtime({ commit }, id) {
      try {
        return await axios.delete(`${API_URL}/${id}`);
      } catch (e) {
        console.error(e);
      }

      commit("setWorkingtime", id);
    },
  },
};
