<template>
  <main>
    <div>
      <router-link to="/">Login</router-link> |
      <router-link to="/register">Register</router-link>
    </div>
    <router-view />
  </main>
</template>

<script>
import { useStore } from "vuex";

export default {
  components: {},
  setup() {
    const store = useStore();
    store.dispatch("loadUsers");

    return {};
  },
};
</script>

<style lang="scss" scoped></style>
