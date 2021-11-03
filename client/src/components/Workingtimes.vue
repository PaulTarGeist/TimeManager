<template>
  <div>
    <h1>Working times</h1>
    <form>
      <div class="form-group">
        <label for="start">Date de début:</label>
        <input type="date" id="start" name="start" v-model="startFilter" />
      </div>
      <div class="form-group">
        <label for="end">Date de fin:</label>
        <input type="date" id="end" name="end" v-model="endFilter" />
      </div>
      <div class="form-group">
       <input
            class="submit_button"
            type="submit"
            value="Search"
            @click.prevent="search"
          />
      </div>
    </form>
    <table>
      <tr>
        <td>Id</td>
        <td>Début</td>
        <td>Fin</td>
        <td>&nbsp;</td>
      </tr>
      <tr v-for="workingtime in workingtimes" :key="workingtime.id">
        <td>{{ workingtime.id }}</td>
        <td>{{ moment(workingtime.start).format('YYYY-MM-DD hh:mm:ss') }}</td>
        <td>{{ moment(workingtime.end).format('YYYY-MM-DD hh:mm:ss') }}</td>
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
import { ref } from "@vue/reactivity";

export default {
  name: "Workingtimes",
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.getUser);
    const userId = user.value.id;
    const start = ref();
    const end = ref();
    const startFilter = ref();
    const endFilter = ref();

    start.value = moment().subtract(29, "days").format("YYYY-MM-DD hh:mm:ss");
    end.value = moment().add(1, "days").format("YYYY-MM-DD hh:mm:ss");
    startFilter.value = moment().subtract(29, "days").format('YYYY-MM-DD');
    endFilter.value = moment().add(1, "days").format('YYYY-MM-DD');

    const data = {
      start: start.value,
      end: end.value,
      userId: user.value.id,
    };

    store.dispatch("loadWorkingtimes", data);

    const search = () => { 
      start.value = moment(startFilter.value).format("YYYY-MM-DD") + " 00:00:00";
      end.value = moment(endFilter.value).format("YYYY-MM-DD") + " 00:00:00";

      const data = {
        start: start.value,
        end: end.value,
        userId: user.value.id,
      };

      store.dispatch("loadWorkingtimes", data);
    };
    
    const workingtimes = computed(() => store.getters.getWorkingtimes);
    
    return { search, moment, workingtimes, userId, start, end , startFilter, endFilter };
  },
};
</script>

<style scoped>
.deleteWorkingtime {
  cursor: pointer;
}
</style>
