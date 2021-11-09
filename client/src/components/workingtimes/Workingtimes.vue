<template>
  <div>
    <Breadcrumb
      routeFirst="AllWorkingtimes"
      routeFirstName="All Working Times"
    />
    <h1>Working times</h1>
    <form class="form-group">
      <div class="mb-3">
        <label for="start">Start date:</label>
        <input
          type="date"
          id="start"
          name="start"
          v-model="startFilter"
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <label for="end">End date:</label>
        <input
          type="date"
          id="end"
          name="end"
          v-model="endFilter"
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <input
          class="submit_button btn btn-primary mr-1"
          type="submit"
          value="Search"
          @click.prevent="search"
        />
        <router-link
          class="btn btn-outline-primary"
          :to="{ name: 'WorkingtimeEdit', query: { userId: userId } }"
        >
          Create a working time
        </router-link>
      </div>
    </form>

    <table class="table" v-if="workingtimes?.length > 0">
      <thead>
        <tr>
          <td scope="col">Id</td>
          <td scope="col">Start date</td>
          <td scope="col">End date</td>
          <td scope="col">Action</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="workingtime in workingtimes" :key="workingtime.id">
          <td scope="row">{{ workingtime.id }}</td>
          <td>{{ moment(workingtime.start).format("YYYY-MM-DD HH:mm:ss") }}</td>
          <td>{{ moment(workingtime.end).format("YYYY-MM-DD HH:mm:ss") }}</td>
          <td>
            <router-link
              class="btn btn-outline-primary"
              :to="{
                name: 'WorkingtimeEdit',
                query: { userId: userId, workingtimeId: workingtime.id },
              }"
              >Edit</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else>
      You haven't working times between
      {{ moment(startFilter).format("DD/MM/YYYY") }} &
      {{ moment(endFilter).format("DD/MM/YYYY") }}
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import moment from "moment";
import { ref } from "@vue/reactivity";
import Breadcrumb from "../Breadcrumb.vue";

export default {
  components: { Breadcrumb },
  name: "Workingtimes",
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.getUser);
    const userId = user.value.id;
    const start = ref();
    const end = ref();
    const startFilter = ref();
    const endFilter = ref();

    start.value = moment().subtract(29, "days").format("YYYY-MM-DD HH:mm:ss");
    end.value = moment().add(1, "days").format("YYYY-MM-DD HH:mm:ss");
    startFilter.value = moment().subtract(29, "days").format("YYYY-MM-DD");
    endFilter.value = moment().add(1, "days").format("YYYY-MM-DD");

    const data = {
      start: start.value,
      end: end.value,
      userId: user.value.id,
    };

    store.dispatch("loadWorkingtimes", data);

    const search = () => {
      start.value =
        moment(startFilter.value).format("YYYY-MM-DD") + " 00:00:00";
      end.value = moment(endFilter.value).format("YYYY-MM-DD") + " 00:00:00";

      const data = {
        start: start.value,
        end: end.value,
        userId: user.value.id,
      };

      store.dispatch("loadWorkingtimes", data);
    };

    const workingtimes = computed(() => store.getters.getWorkingtimes);
    return {
      search,
      moment,
      workingtimes,
      userId,
      start,
      end,
      startFilter,
      endFilter,
    };
  },
};
</script>

<style scoped>
.deleteWorkingtime {
  cursor: pointer;
}
form input {
  width: 220px;
}
</style>
