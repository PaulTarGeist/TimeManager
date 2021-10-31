<template>
  <div>
    <h1>Working times</h1>
    <table>
      <tr>
        <td>Début</td>
        <td>Fin</td>
        <td>&nbsp;</td>
      </tr>
      <tr v-for="workingtime in workingtimes" :key="workingtime.id">
        <td>{{ workingtime.start }}</td>
        <td>{{ workingtime.end }}</td>
        <router-link :to="{ name: 'WorkingtimeEdit', query:{userId: 1, workingtimeId : workingtime.id} }">Editer</router-link>
        <!-- <td @click.prevent="deleteWorkingtime(workingtime.id)" class="deleteWorkingtime">Supprimer</td> -->
      </tr>
    </table>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "Workingtimes",
  setup() {
    const store = useStore();
    store.dispatch("loadWorkingtimes", 1);
    const workingtimes = computed(() => store.getters.getWorkingtimes);

    const deleteWorkingtime = (id) => {
      store.dispatch("deleteWorkingtime", id);
    };

    return { deleteWorkingtime, workingtimes };
  },
};
</script>

<style scoped>
.deleteWorkingtime {
  cursor: pointer;
}
</style>
