<template>
  <div>
    <h3>Timer</h3>
    <p>timer: {{ timer }}</p>
    <button @click="createTimer" :disabled="stopBtn">Start</button>
    <button @click="stopTimer" :disabled="startBtn">Stop</button>
  </div>
</template>

<script>
import moment from "moment";
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";

export default {
  name: "Clock",
  props: ["userId"],
  setup(props) {
    const store = useStore();
    const lastClock = computed(() => store.getters.getLastClock);

    const startBtn = ref();
    const stopBtn = ref();
    const timerInterval = ref();
    const timer = ref(
      lastClock.value
        ? computed(() => timer.value)
        : moment({ hours: 0, minutes: 0, setSeconds: 0 }).format("HH:mm:ss")
    );

    const startTimer = () => {
      return setInterval(() => {
        console.log("id", lastClock.value.id);
        const clockTime = moment(lastClock.value.time);
        const diff = moment(moment(), "HH:mm:ss").diff(
          moment(clockTime, "HH:mm:ss")
        );
        const duration = moment.duration(diff);

        timer.value = `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
        console.log("timer: ", timer.value);
      }, 1000);
    };

    watch(lastClock, (curr, prev) => {
      console.log("prev", prev);
      if (!prev && curr.status === true) {
        timerInterval.value = startTimer();
      }

      if (curr.status === true) {
        startBtn.value = false;
        stopBtn.value = true;
      }
    });

    const createTimer = () => {
      console.log("start");
      const payload = {
        userId: props.userId,
        time: moment().format("YYYY-MM-DD HH:mm:ss"),
        status: true,
      };
      console.log(payload);
      timerInterval.value = startTimer();

      startBtn.value = false;
      stopBtn.value = true;
      store.dispatch("createClock", payload);
    };

    const stopTimer = () => {
      console.log("stop");
      const payload = {
        userId: props.userId,
        time: moment().format("YYYY-MM-DD HH:mm:ss"),
        status: false,
      };
      console.log(payload);

      clearInterval(timerInterval.value);

      console.log("TTTTTTTTTTTT", timer.value);

      startBtn.value = true;
      stopBtn.value = false;
      store.dispatch("createClock", payload);

      // wtPayload = {}
      // store.dispatch("", payload);
      timer.value = moment({ hours: 0, minutes: 0, setSeconds: 0 }).format(
        "HH:mm:ss"
      );
    };

    return {
      timer,
      startBtn,
      stopBtn,
      createTimer,
      stopTimer,
    };
  },
};
</script>

<style lang="scss" scoped></style>
