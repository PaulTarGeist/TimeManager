<template>
  <main>
    <div class="nav">
      <div>
        <router-link :to="{ name: 'Login' }">Login</router-link>
      </div>
      <div>
        <router-link :to="{ name: 'Register' }">Register</router-link>
      </div>
      <div>
        <router-link :to="{ name: 'AllUsers' }">User list</router-link>
      </div>
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

<style scoped>
.nav {
  width: 100%;
  height: 2.5em;
  background-color: grey;
  display: flex;
  justify-content: space-evenly;
  justify-items: center;
}
</style>
