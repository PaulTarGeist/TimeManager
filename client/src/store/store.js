import { createStore } from "vuex";

// models
import { users } from "./models/UserModel";
import { clocks } from "./models/ClockModel";
import { workingtimes } from "./models/WorkingtimeModel";

const store = createStore({
  modules: {
    users,
    clocks,
    workingtimes,
  },
});

export default store;
