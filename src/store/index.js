import { createStore } from "vuex";

// models
import { users } from "./models/User";
// import Clock from "./models/Clock";
// import WorkingTime from "./models/WorkingTime";

const store = createStore({
  modules: {
    users,
  },
});

export default store;
