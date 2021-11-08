import axios from "axios";
const API_URL = "http://localhost:4000/api/clocks";

export const clocks = {
  namespace: true,

  state: {
    Clocks: null,
    lastClock: null,
  },

  getters: {
    getClocks: (state) => state.Clocks,
    getLastClock: (state) => state.lastClock,
  },

  mutations: {
    setClocks(state, newClocks) {
      state.Clocks = newClocks;
    },
    setLastClock(state, newClock) {
      state.lastClock = newClock;
    },
  },

  actions: {
    async loadUserClocks({ commit }, userId) {
      try {
        await axios.get(`${API_URL}/${userId}`).then((res) => {
          commit("setClocks", res.data.data);
          commit("setLastClock", res.data.data.at(-1));
        });
      } catch (error) {
        console.error(error);
      }
    },
    async createClock({ commit }, { userId, time, status }) {
      try {
        await axios
          .post(`${API_URL}/${userId}`, { time, status })
          .then((res) => {
            console.log(res.data.data);
            commit("setLastClock", res.data.data);
          });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
