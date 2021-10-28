<template>
  <div>
    <User/>
  </div>
</template>

<script>
import User from './components/User.vue'
import { useStore } from "vuex";

export default {
  components: { User },
  setup () {
     const store = useStore();
    store.dispatch("loadUsers");

    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>