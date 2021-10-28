import axios from "axios";
const API_URL = "http://localhost:4000/api/users";

export const users = {
  namespace: true,
  state: {
    users: [],
  },

  getters: {
    getUsers: (state) => state.users,
    // getUser = (state, id) {
    //    state.users.map((user) => {
    //     if (user.id = id) 
    //       return user
    //   })
    // }
  },

  mutations: {
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
  },
};

