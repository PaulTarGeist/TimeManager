import axios from "axios";
const API_URL = "http://localhost:4000/api/workingtimes";

export const workingtimes = { 
    state: {
        workingtimes: null,
        workingtime:  null
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
        async loadWorkingtimes({ commit }, userId) {
            try {
              let data = await axios.get(`${API_URL}/${userId}`).then((res) => {
                return res.data.data;
              });
      
              commit("setWorkingtimes", data);
            } catch (e) {
              console.error(e);
            }
        },

        async loadWorkingtimesByDate({ commit }, workingtimeData) {
          try {
            let data = await axios.get(`${API_URL}/${workingtimeData.userId}`, { workingtime : workingtimeData}).then((res) => {
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
            const data =  await axios.get(`${API_URL}/${userId}/${workingtimeId}`).then((res) => { 
              return res.data.data 
            })

            commit("setWorkingtime", data);

          } catch (e) {
            console.error(e);
          }
        },

        async createWorkingtime({ dispatch }, workingtimeData) {
            try {
              let data = await axios
                .post(`${API_URL}/${workingtimeData.userId}`, { workingtime: workingtimeData })
                .then((res) => {
                  console.log("Workingtime crée");
                  return res.data.data;
                });
      
              if (data.lenght) dispatch("loadWorkingtimes");
            } catch (e) {
              console.error(e);
            }
        },

        async updateWorkingtime({ commit }, {userId, start, end}) {
          let data = await axios
            .put(`${API_URL}/${userId}`, { workingtime: { start, end }})
            .then((res) => {
              console.log("Workingtime modifié");
              return res.data.data;
            });

          commit("setWworkingtime", data);
        },

        async deleteWorkingtime({ dispatch }, id) {
            await axios.delete(`${API_URL}/${id}`).then((res) => {
              console.log(res);
            });
            dispatch("loadWorkingtimes");
        },
    }
};
