<template>
  <div class="contain">
    <GoogleMap />
    <div>11</div>
  </div>
</template>

<script>
import GoogleMap from "../../components/GoogleMap.vue";
export default {
  name: "Home",
  components: {
    GoogleMap,
  },
};
</script>
<style lang="scss" scoped>
.contain {
  flex-direction: row;
  .vue-map-container {
    flex: 0 2 60%;
  }
}
</style>