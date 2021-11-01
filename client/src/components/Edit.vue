<template>
  <div>
    <h1 v-if="workingtime">Edition un workingtime</h1>
    <h1 v-else>Créer un workingtime</h1>
    {{workingtime}}
    <!--
      <form id="createWorkingtimeForm">
      <div>
        <label for="workingtime_start">Date de début</label>
        <input id="workingtime_start" type="datetime-local" v-model="start" /> zefezfez
      </div>
      <div>
        <label for="workingtime_end">Date de fin</label>
        <input id="workingtime_end" type="datetime-local" v-model="end" />
      </div>
      <div>
        <input
          class="submit_button"
          type="submit"
          value="submit"
          @click.prevent="submit"
        />
      </div>
      <button v-if="workingtime" @click.prevent="deleteWorkingtime(workingtime.id)" value="Supprimer" />
    </form>
  -->
  </div>
</template>

<script>

export default {
  name: "Edit",
  props: { workingtime: Object },
  setup() {


    /*
    return {};
    */
  }
};
</script>

<style scoped>
form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

form > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

form input.submit_button {
  color: white;
  background: #f7a072;
  border: none;
  text-transform: uppercase;
  box-sizing: border-box;
  padding: 10px 15px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s linear;
  border-radius: 5px;
  margin: 10px;
}

form input.submit_button:hover {
  color: white;
  background: #eddea4;
  transition: 0.3s linear;
}

form input[type="text"] {
  border-radius: 5px;
  width: 70%;
  border: 1px solid grey;
  height: 30px;
  margin: 10px;
}
</style>
