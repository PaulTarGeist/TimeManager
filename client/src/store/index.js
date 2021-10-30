import { createStore } from "vuex";

// models
import { users } from "./models/User";
// import Clock from "./models/Clock";
import { workingtimes } from "./models/Workingtime";

const store = createStore({
  modules: {
    users,
    workingtimes
  },
});

export default store;
