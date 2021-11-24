<template>
  <div class="contain">
    <GoogleMap />
    <Controller />
  </div>
</template>

<script>
import GoogleMap from "../../components/GoogleMap.vue";
import Controller from "./Controller.vue";

export default {
  name: "Home",
  components: {
    GoogleMap,
    Controller,
  },
};
</script>
<style lang="scss" scoped>
.contain {
  flex-direction: row;

  .vue-map-container {
    flex: 0 2 70%;
  }
  .controller {
    flex: 0 0 30%;
    padding-left: 30px;
  }
}
</style>
