<template>
  <div>
    <Edit :workingtime="workingtime" />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Edit from '../components/Edit.vue';

export default {
  components: { Edit },
  
  setup() {
    const store   = useStore(); 
    const user    = computed(() => store.getters.getUser);

    const payload = {
      userId          : user.value.id,
      workingtimeId   : 5 // @TODO get from query  
    }

    store.dispatch("loadWorkingtime", payload)
    
    // no synchron results
    // must return a promise
    // On click on update/edit button, block page and launch loader still than promise isn't resolved
    const workingtime = computed(() => store.getters.getWorkingtime)
    
    const handler = {
      get(target, prop, ){
        console.log("Data Get: ", target, prop);
        return target[prop];
      },
      set(target, key, value) {
        console.log("Data Set: ", target, key, value);
        return target[key] = value;
      }
    }

    const proxy = new Proxy(workingtime, handler);
    console.log("proxy", proxy.value);


    return { workingtime };
  },
};
</script>

<style lang="scss" scoped></style>
