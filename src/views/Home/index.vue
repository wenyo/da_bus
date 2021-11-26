<template>
  <div class="contain">
    <div id="map">
      <GoogleMap :bus-stops="busStops" :click-bus-stop="clickBusStop" />
    </div>
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
    ...mapState(["pos", "busStops", "busStopID", "routeInfoByStop"]),
  },
  methods: {
    ...mapMutations(["busStopIDGetter"]),
    ...mapActions([
      "NearBusStopGetter",
      "MyDistrictGetter",
      "RouteFromStationGetter",
    ]),
    clickBusStop(StationID) {
      this.busStopIDGetter(StationID);
    },
  },
  watch: {
    pos() {
      this.MyDistrictGetter();
      this.NearBusStopGetter();
    },
    busStopID() {
      this.RouteFromStationGetter(this.busStopID);
    },
  },
};
</script>
<style lang="scss" scoped>
.contain {
  flex-direction: row;
  height: calc(100% - 60px);

  #map {
    border-radius: 0px 24px 24px 24px;
    overflow: hidden;
    flex: 0 2 60%;
    height: 100%;
  }
  .controller {
    flex: 0 0 40%;
    padding-left: 30px;
  }
}
</style>
