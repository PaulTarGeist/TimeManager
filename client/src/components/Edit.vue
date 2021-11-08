<template>
  <div>
    <Breadcrumb
      routeFirst="AllWorkingtimes"
      routeFirstName="All Working Times"
      routeSecondName="Working time form"
    />
    <div>
      <h1 v-if="wtId">Edit a working time</h1>
      <h1 v-else>Create a workingtime</h1>

      <form class="form-group">
        <div class="mb-3">
          <label for="workingtime_start" class="form-label">Start Date</label>
          <input
            id="workingtime_start"
            type="datetime-local"
            v-model="start"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="workingtime_end" class="form-label">End Date</label>
          <input
            id="workingtime_end"
            type="datetime-local"
            v-model="end"
            class="form-control"
          />
        </div>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button
            type="submit"
            class="btn btn-outline-primary"
            @click.prevent="saveItem()"
          >
            Submit
          </button>
          <button
            v-if="wtId"
            @click.prevent="deleteWorkingtime(wtId)"
            class="btn btn-outline-danger"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import moment from "moment";
import { useRouter } from "vue-router";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import Breadcrumb from "./Breadcrumb.vue";

export default {
  name: "Edit",
  props: { workingtime: Object },
  components: { Breadcrumb },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const user = JSON.parse(localStorage.getItem("user"));
    const wtId = ref(props.workingtime.wtId);

    const start = ref(props.workingtime.start);
    const end = ref(props.workingtime.end);

    const saveItem = () => {
      const data = {
        wtId: wtId.value,
        start: moment(start.value).format("YYYY-MM-DD HH:mm:ss"),
        end: moment(end.value).format("YYYY-MM-DD HH:mm:ss"),
        userId: user.id,
      };

      const isafter = moment(start.value).isAfter(end.value);

      /**
       * Impossible case, start must be < to end
       */
      if (isafter) {
        createToast(
          "An error occurred: the start date must be < to the end date",
          {
            type: "danger",
          }
        );
        return;
      }

      if (wtId.value != undefined) {
        store.dispatch("updateWorkingtime", data);
      } else {
        store.dispatch("createWorkingtime", data).then(() => {
          router.replace("/allWorkingtimes");
        });
      }
    };

    const deleteWorkingtime = (wtId) => {
      if (confirm("Do you really want to delete this working time ?")) {
        store.dispatch("deleteWorkingtime", wtId).then(() => {
          router.replace("/allWorkingtimes");
        });
      }
    };

    return { saveItem, deleteWorkingtime, wtId, start, end, user };
  },
};
</script>

<style scoped>
form input {
  width: 220px;
}
</style>
