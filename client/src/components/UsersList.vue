<template>
  <div>
    <Breadcrumb routeFirst="AllUsers" routeFirstName="All Users" />
    <h1>All Users</h1>
    <table class="table">
      <thead>
        <tr>
          <td scope="col">Name</td>
          <td scope="col">Email</td>
          <td scope="col">&nbsp;</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import Breadcrumb from "./Breadcrumb.vue";

export default {
  components: { Breadcrumb },
  name: "User",
  setup() {
    const store = useStore();
    store.dispatch("loadUsers");
    const users = computed(() => store.getters.getUsers);

    return { users };
  },
};
</script>

<style scoped>
.deleteUser {
  cursor: pointer;
}
</style>
