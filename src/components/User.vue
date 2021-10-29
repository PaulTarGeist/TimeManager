<template>
  <div>
    <h1>All Users</h1>
    <table>
      <tr>
        <td>Name</td>
        <td>Email</td>
        <td>&nbsp;</td>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td @click.prevent="deleteUser(user.id)" class="deleteUser">delete</td>
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

    const deleteUser = (id) => {
      console.log(id);
      store.dispatch("deleteUser", id);
    };

    return { deleteUser, users };
  },
};
</script>

<style scoped>
.deleteUser {
  cursor: pointer;
}
</style>
