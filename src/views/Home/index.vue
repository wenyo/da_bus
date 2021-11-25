<template>
  <div class="contain">
    <GoogleMap :bus-stops="busStops" :click-bus-stop="clickBusStop" />
    <Controller />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import GoogleMap from "../../components/GoogleMap.vue";
import Controller from "./Controller.vue";

export default {
  name: "Home",
  components: {
    GoogleMap,
    Controller,
  },
  computed: {
    ...mapState(["pos", "busStops", "busStopID", "routeInfoByStop", "busInfo"]),
  },
  methods: {
    ...mapMutations(["busStopIDGetter"]),
    ...mapActions([
      "NearBusStopGetter",
      "MyDistrictGetter",
      "RouteFromStationGetter",
      "EstimatedTimeOfArrivalFromStationGetter",
    ]),
    clickBusStop(StationID) {
      console.log('clickBusStop');
      this.busStopIDGetter(StationID);
    },
  },
  watch: {
    pos() {
      this.MyDistrictGetter();
      this.NearBusStopGetter();
    },
    busStopID() {
      console.log('busStopID');
      this.RouteFromStationGetter(this.busStopID);
    },
    routeInfoByStop() {
      console.log('routeInfoByStop');
      this.EstimatedTimeOfArrivalFromStationGetter(this.busStopID);
    },
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
