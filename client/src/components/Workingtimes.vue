<template>
  <div>
    <h1>Working times</h1>
    <form>
      <div class="form-group">
        <label for="start">Date de début:</label>
        <input type="datetime-local" id="start" name="start" v-model="start" />
      </div>
      <div class="form-group">
        <label for="end">Date de fin:</label>
        <input type="datetime-local" id="end" name="end" v-model="end" />
      </div>
      <div class="form-group">
        <input class="btn btn-primary mr-1" type="button" value="Rechercher" />
      </div>
    </form>
    <table>
      <tr>
        <td>Début</td>
        <td>Fin</td>
        <td>&nbsp;</td>
      </tr>
      <tr v-for="workingtime in workingtimes" :key="workingtime.id">
        <td>{{ workingtime.start }}</td>
        <td>{{ workingtime.end }}</td>
        <router-link
          :to="{
            name: 'WorkingtimeEdit',
            query: { userId: userId, workingtimeId: workingtime.id },
          }"
          >Editer</router-link
        >
      </tr>
    </table>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import moment from "moment";

export default {
  name: "Workingtimes",
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.getUser);

    const start = moment().subtract(29, "days").format("YYYY-MM-DD hh:mm:ss");
    const end = moment().add(1, "days").format("YYYY-MM-DD hh:mm:ss");
    const userId = user.value.id;
    const wtData = {
      userId,
      start,
      end,
    };

    store.dispatch("loadWorkingtimes", wtData);
    const workingtimes = computed(() => store.getters.getWorkingtimes);

    return { workingtimes, userId, start, end };
  },
};
</script>

<style scoped>
.deleteWorkingtime {
  cursor: pointer;
}
</style>
