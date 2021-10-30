import axios from "axios";
const API_URL = "http://localhost:4000/api/workingtimes";

export const workingtimes = { 
    state: {
        workingtimes: null
    },

    getters: {
      getWorkingtimes: (state) => state.workingtimes,
      getWorkingtime: (state) => state.workingtime,
    }, 

    mutations: {
      setWorkingtimes: (state, data) => (state.workingtimes = data),
      setWorkingtime: (state, data) => (state.workingtime = data),
    }, 

    actions: {
        async loadWorkingtimes({ commit }, id) {
            try {
              let data = await axios.get(`${API_URL}/${id}`).then((res) => {
                return res.data.data;
              });
      
              commit("setWorkingtimes", data);
            } catch (e) {
              console.error(e);
            }
        },

        async editWorkingtime({ dispatch }, workingtimeData) {
            try {
              let data = await axios
                .post(`${API_URL}/${workingtimeData.userId}`, { workingtime: workingtimeData })
                .then((res) => {
                  return res.data.data;
                });
      
              if (data.lenght) dispatch("loadWorkingtimes");
            } catch (e) {
              console.error(e);
            }
        },

        async deleteWorkingtime({ dispatch }, id) {
            await axios.delete(`${API_URL}/${id}`).then((res) => {
              console.log(res);
            });
            dispatch("loadWorkingtimes");
        },
    }
};
