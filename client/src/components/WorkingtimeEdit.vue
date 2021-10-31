<template>
  <div>
    <h1>Créer un workingtime</h1>
    <form id="createWorkingtimeForm">
      <div>
        <label for="workingtime_start">Date de début</label>
        <input id="workingtime_start" type="datetime-local" v-model="start" />
      </div>
      <div>
        <label for="workingtime_end">Date de fin</label>
        <input id="workingtime_end" type="datetime-local" v-model="end" />
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
import { computed } from "vue";

export default {
  name: "WorkingtimeEdit",
  setup() {
    const store       = useStore();
    const user        = computed(() => store.getters.getUser);
    const workingtime = computed(() => store.getters.getWorkingtime, user.value.id, 4);

    let start = ref("");
    let end   = ref("");

    if (workingtime.value) {
      console.log('temp');
    }
   
    const submit = () => {
      const workingtimeData = {
        start   : start.value,
        end     : end.value,
        userId  : user.value.id
      };
    
      store.dispatch("editWorkingtime", workingtimeData);
      start.value = "";
      end.value   = "";
    };

    return { submit, start, end };
  },
};
</script>

<style scoped>
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
</style>
