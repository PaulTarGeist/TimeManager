<template>
  <div>
    <h1>All Users</h1>
    <table>
      <tr>
        <td>Name</td>
        <td>Email</td>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "User",
  setup() {
    const store = useStore();
    store.dispatch("loadUsers");
    const users = computed(() => store.getters.getUsers);

    return { users };
  },
};
</script>

<style lang="scss" scoped></style>
