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
        <router-link :to="{ name: 'WorkingtimeEdit', query:{userId: userId, workingtimeId : workingtime.id} }">Editer</router-link>
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
    const user  = computed(() => store.getters.getUser);
    store.dispatch("loadWorkingtimes", user.value.id);
    const userId = user.value.id;
    const workingtimes = computed(() => store.getters.getWorkingtimes);

    return { workingtimes, userId };
  },
};
</script>

<style scoped>
.deleteWorkingtime {
  cursor: pointer;
}
</style>
