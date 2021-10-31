<template>
  <div>
    <h1>Profil</h1>

    <form>
      <div class="form-group row">
        <label for="username" class="col-sm-2 col-form-label"> Username </label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="username"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="email" class="col-sm-2 col-form-label"> Email </label>
        <div class="col-sm-10">
          <input type="email" class="form-control" id="email" v-model="email" />
        </div>
      </div>
    </form>

    <div>
      <button @click.prevent="saveUser">Mettre à jour</button>
      <button @click.prevent="delteUser">Supprimer mon profil</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { computed, ref } from "vue/";
import { useStore } from "vuex";
export default {
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
      if (window.confirm("Êtes vous sur de supprimer votre profil ?")) {
        store.dispatch("deleteUser", userId.value).then(() => {
          router.go("/");
        });
      }
    };

    return { username, email, saveUser, delteUser };
  },
};
</script>

<style scoped></style>
