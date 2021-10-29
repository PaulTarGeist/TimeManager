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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
