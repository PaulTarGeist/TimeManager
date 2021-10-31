import { createStore } from "vuex";

// models
import { users } from "./models/UserModel";
// import { clock } from "./models/ClockModel";
import { workingtimes } from "./models/WorkingtimeModel";

const store = createStore({
  modules: {
    users,
    // clock,
    workingtimes,
  },
});

export default store;
