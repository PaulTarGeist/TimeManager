<template>
  <div>
    <div>
      <h1 v-if="wtId">Edit a working time</h1>
      <h1 v-else>Create a workingtime</h1>

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
            @click.prevent="saveItem"
          />
        </div>
        <button
          v-if="wtId"
          @click.prevent="deleteWorkingtime(wtId)"
          class="btn btn-danger"
        >
          Delete
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import { computed } from "vue";
import moment from "moment";
import { useRouter } from "vue-router";

export default {
  name: "Edit",
  props: { workingtime: Object },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const user = computed(() => store.getters.getUser);
    const wtId = ref(props.workingtime.wtId);
    const start = ref(props.workingtime.start);
    const end = ref(props.workingtime.end);

    const saveItem = () => {
      const data = {
        wtId: wtId.value,
        start: moment(start.value).format("YYYY-MM-DD HH:mm:ss"),
        end: moment(end.value).format("YYYY-MM-DD HH:mm:ss"),
        userId: user.value.id,
      };

      if (wtId.value != undefined) {
        store.dispatch("updateWorkingtime", data);
      } else {
        store.dispatch("createWorkingtime", data).then(() => {
          router.replace("/allWorkingtimes");
        });
      }
    };

    const deleteWorkingtime = (wtId) => {
      store.dispatch("deleteWorkingtime", wtId).then((res) => {
        if (res) router.replace("/allWorkingtimes");
      });
    };

    return { saveItem, deleteWorkingtime, wtId, start, end, user };
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
