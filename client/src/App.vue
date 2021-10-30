<template>
  <main>
    <div class="nav">
      <ul>
        <li v-if="!user">
          <router-link :to="{ name: 'Login' }">Login</router-link>
        </li>
        <li v-if="!user">
          <router-link :to="{ name: 'Register' }">Register</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'AllUsers' }">User list</router-link>
        </li>
        <li v-if="user">
          <router-link :to="{ name: 'WorkingtimeEdit' }">Créer un workingtime</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'AllWorkingtimes' }">Liste des workingtimes</router-link>
        </li>
        <li v-if="user">
          <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
        </li>
        <li v-if="user">
          <router-link :to="{ name: 'WorkingtimeChart' }">WorkingtimeChart</router-link>
        </li>
        <li v-if="user">
          <router-link to="/" @click="logout"> Logout </router-link>
        </li>
      </ul>
    </div>
    <router-view />
  </main>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";

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
