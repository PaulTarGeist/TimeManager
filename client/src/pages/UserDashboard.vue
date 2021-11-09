<template>
  <div>
    <h1>Dashboard</h1>
    <div v-if="user">
      <p>User Infos</p>
      <p>Name: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
    <Clock :userId="userId" />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Clock from "../components/Clock.vue";

const store = useStore();
const user = computed(() => store.getters["getUser"]);
const userId = ref(user.value.id);
store.dispatch("loadUserClocks", userId.value);
</script>

<style lang="scss" scoped></style>
