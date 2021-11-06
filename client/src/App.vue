<template>
  <main class="px-4">
    <div class="mb-4">
      <Navbar :user="user" :logout="logout" />
    </div>
    <router-view />
  </main>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
import Navbar from "./components/Navbar.vue";
export default {
  components: { Navbar },
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
html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
