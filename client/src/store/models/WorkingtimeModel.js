import axios from "axios";
const API_URL = "http://localhost:4000/api/workingtimes";

export const workingtimes = {
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
        let data = await axios
          .get(`${API_URL}/${userId}?start=${start}&end=${end}`)
          .then((res) => {
            return res.data.data;
          });

        commit("setWorkingtimes", data);
      } catch (e) {
        console.error(e);
      }
    },

    async loadWorkingtimesByDate({ commit }, workingtimeData) {
      try {
        let data = await axios
          .get(`${API_URL}/${workingtimeData.userId}`, {
            workingtime: workingtimeData,
          })
          .then((res) => {
            return res.data.data;
          });

        commit("setWorkingtimes", data);
      } catch (e) {
        console.error(e);
      }
    },

    /**
     * @TODO workingtimeId is undefined
     */
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
    async createWorkingtime({}, { start, end, userId }) {
      try {
        return await axios.post(`${API_URL}/${userId}`, {
          start,
          end,
          user: userId,
        });
      } catch (e) {
        console.error(e);
      }
    },

    async updateWorkingtime({ commit }, { wtId, start, end }) {
      let data = await axios
        .put(`${API_URL}/${wtId}`, { start, end })
        .then((res) => {
          console.log("Workingtime modifié");
          return res.data.data;
        });

      commit("setWworkingtime", data);
    },

    async deleteWorkingtime({ dispatch }, id) {
      return await axios.delete(`${API_URL}/${id}`);
      dispatch("loadWorkingtimes");
    },
  },
};
