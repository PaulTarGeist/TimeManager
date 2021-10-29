<template>
  <div>
    <h1>S'inscrire</h1>
    <form id="createUserForm">
      <div>
        <label>Username</label>
        <input type="text" v-model="username" />
      </div>
      <div>
        <label>Email</label>
        <input type="text" v-model="email" />
      </div>
      <div>
        <input
          class="submit_button"
          type="submit"
          value="submit"
          @click.prevent="submit"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Register",
  setup() {
    const store = useStore();
    const username = ref("");
    const email = ref("");

    const submit = () => {
      const userData = {
        username: username.value,
        email: email.value,
      };

      store.dispatch("register", userData);
      username.value = "";
      email.value = "";
    };

    return { submit, username, email };
  },
};
</script>

<style scoped>
.UserView {
  width: 100vw;
  height: 90vh;
  background: #f9f7f3;
  display: flex;
  justify-content: center;
  align-items: center;
}

.connectionPanel,
.informationPanel {
  width: 40%;
  background: white;
  border-radius: 5px;
  box-shadow: 5px 5px 3px -3px rgba(0, 0, 0, 0.2);
}

form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

form > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

form input.submit_button {
  color: white;
  background: #f7a072;
  border: none;
  text-transform: uppercase;
  box-sizing: border-box;
  padding: 10px 15px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s linear;
  border-radius: 5px;
  margin: 10px;
}

form input.submit_button:hover {
  color: white;
  background: #eddea4;
  transition: 0.3s linear;
}

form input[type="text"] {
  border-radius: 5px;
  width: 70%;
  border: 1px solid grey;
  height: 30px;
  margin: 10px;
}

.switchButton {
  cursor: pointer;
  font-size: 12px;
  margin: 10px;
}
</style>
