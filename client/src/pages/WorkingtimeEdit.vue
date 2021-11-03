<template>
  <div>
    <Edit :workingtime="workingtime" />
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import Edit from "../components/Edit.vue";
import { useRoute } from "vue-router";

export default {
  components: { Edit },
  setup() {
    const store = useStore();
    const route = useRoute();

    if (route.query.workingtimeId) {
      const payload = {
        userId: route.query.userId,
        workingtimeId: route.query.workingtimeId,
      };
      store.dispatch("loadWorkingtime", payload);
    }

    const wtId = ref();
    const start = ref();
    const end = ref();
    const workingtime = computed(() => store.getters.getWorkingtime);

    onMounted(() => {
      watch(workingtime, (curr) => {
        wtId.value = curr.id;
        start.value = curr.start;
        end.value = curr.end;
      });
    });

    return { workingtime: { start, end, wtId } };
  },
};
</script>

<style lang="scss" scoped></style>
