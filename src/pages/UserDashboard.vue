<template>
  <div>
    <h1>Dashboard</h1>
    <div v-if="user">
      <p>User Infos</p>
      <p>Name: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
// import User from "../components/User.vue";
export default {
  components: {},
  name: "UserDashboard",
  setup() {
    const store = useStore();
    const user = computed(() => store.getters["getUser"]);
    return { user };
  },
};
</script>

<style lang="scss" scoped></style>
