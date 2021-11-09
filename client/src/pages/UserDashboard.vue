<template>
  <div>
    <h1>Dashboard</h1>
    <div class="row">
      <div class="col-4">
        <h2>User Infos</h2>
        <p>Name: {{ user.username }}</p>
        <p>Email: {{ user.email }}</p>
        <router-link
          class="btn btn-outline-primary"
          :to="{
            name: 'Profil',
          }"
          >Edit</router-link
        >

        <h2>Clock</h2>
        <Clock :userId="userId" />
      </div>
      <div class="col-6">
        Last working times between {{ start }} & {{ end }}
        <WorkingtimeLineChart :workingtimes="{ workingtimes }" />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <WorkingtimeDoughnutChart :workingtimes="{ workingtimes }" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import WorkingtimeDoughnutChart from "../components/WorkingtimeDoughnutChart";
import WorkingtimeLineChart from "../components/WorkingtimeLineChart";
import moment from "moment";
import axios from "axios";
const API_URL = "http://localhost:4000/api/workingtimes";
import Clock from "../components/Clock.vue";

export default {
  components: { WorkingtimeDoughnutChart, WorkingtimeLineChart, Clock },
  name: "UserDashboard",
  setup() {
    const workingtimes = ref([]);
    const store = useStore();
    const user = computed(() => store.getters["getUser"]);
    const userId = ref(user.value.id);
    store.dispatch("loadUserClocks", userId.value);

    const start = moment().subtract(5, "days").format("YYYY-MM-DD HH:mm:ss");
    const end = moment().add(1, "days").format("YYYY-MM-DD HH:mm:ss");
    const data = {
      start: start,
      end: end,
      userId: user.value.id,
    };

    axios
      .get(`${API_URL}/${data.userId}?start=${data.start}&end=${data.end}`)
      .then((res) => {
        workingtimes.value = res.data;
      });

    return { user, workingtimes, start, end, userId };
  },
};
</script>

<style lang="scss" scoped></style>
