<template>
  <main>
    <div>
      <div v-if="!user">
        <router-link :to="{ name: 'Login' }">Login</router-link>
      </div>
      <div v-if="!user">
        <router-link :to="{ name: 'Register' }">Register</router-link>
      </div>
      <div>
        <router-link :to="{ name: 'AllUsers' }">User list</router-link>
      </div>
      <div v-if="user">
        <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
      </div>
      <div v-if="user">
        <router-link :to="{ name: 'WorkingtimeChart' }">
          WorkingtimeChart
        </router-link>
      </div>
      <div v-if="user">
        <router-link to="/" @click="logout"> Logout </router-link>
      </div>
    </div>
    <router-view />
  </main>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
  components: {},
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.getUser);

    const logout = () => {
      store.dispatch("logout");
    };

    return {
      user: user !== null ? user : null,
      logout,
    };
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
