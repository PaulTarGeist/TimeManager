<template>
  <div>
    <Breadcrumb routeFirst="Profil" routeFirstName="Profil Edit" />
    <h1>Profil</h1>

    <form>
      <div class="mb-3">
        <label for="username" class="form-label"> Username </label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="username"
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label"> Email </label>
        <input type="email" class="form-control" id="email" v-model="email" />
      </div>
    </form>

    <div>
      <button @click.prevent="saveUser" class="btn btn-outline-primary">
        Update
      </button>
      <button @click.prevent="delteUser" class="btn btn-outline-danger">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { computed, ref } from "vue/";
import { useStore } from "vuex";
import Breadcrumb from "../components/Breadcrumb.vue";

export default {
  components: { Breadcrumb },
  name: "Profil",
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = computed(() => store.getters.getUser);
    const userId = ref(user.value.id);
    const username = ref(user.value.username);
    const email = ref(user.value.email);

    const saveUser = () => {
      const payload = {
        id: userId.value,
        username: username.value.toLowerCase().trim(),
        email: email.value.toLowerCase().trim(),
      };

      store.dispatch("updateUser", payload);
    };

    const delteUser = () => {
      if (window.confirm("Are you sure you want to delete your profile ?")) {
        store.dispatch("deleteUser", userId.value).then(() => {
          router.go("/");
        });
      }
    };

    return { username, email, saveUser, delteUser };
  },
};
</script>

<style scoped>
form input {
  width: 220px;
}
</style>
