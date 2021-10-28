<template>
  <div>
    <p>dashboard</p>
    <p>{{ user }}</p>
    <User />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import User from "../components/User.vue";
export default {
  components: { User },
  name: "UserDashboard",
  setup() {
    const store = useStore();
    const user = computed(() => store.getters["getUser"]);

    console.log("user", user);
    return { user };
  },
};
</script>

<style lang="scss" scoped></style>
