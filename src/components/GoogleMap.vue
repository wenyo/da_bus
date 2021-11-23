<template>
  <GMapMap :center="center" :zoom="18" ref="myMapRef" :options="options">
    <!-- my possition -->
    <GMapMarker
      :position="center"
      :clickable="true"
      :icon="{
        url: PositionIcon,
        anchor: { x: 32, y: 32 },
      }"
    >
    </GMapMarker>
    <!-- my possition -->
    <!-- bus stop possition -->
    <template v-if="busStops.length > 0">
      <GMapMarker
        v-for="busStop in busStops"
        :key="busStop.StopUID"
        :position="busStop.StopPosition"
        :clickable="true"
        :icon="{
          url: BusStopIcon,
        }"
        @click="MarkerInfoOpen(busStop.StopUID)"
      >
        <GMapInfoWindow :opened="openedMarkerID === busStop.StopUID">
          {{ busStop.StopName.Zh_tw }}
        </GMapInfoWindow>
      </GMapMarker>
    </template>
  </GMapMap>
</template>

<script>
import { ref } from "vue";
import { mapState, mapActions } from "vuex";
import MapStyle from "../assets/map/MapStyle.json";
import PositionIcon from "../assets/img/pos/my-pos-l.svg";
import BusStopIcon from "../assets/img/pos/busstop-pos.svg";

export default {
  setup() {
    const myMapRef = ref();
    const popUp = ref();
    return {
      myMapRef,
      popUp,
    };
  },
  data() {
    return {
      PositionIcon,
      BusStopIcon,
      options: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: true,
        rotateControlOptions: {
          position: 6,
        },
        fullscreenControl: false,
        styles: MapStyle.map_style,
      },
      busStops: [],
      openedMarkerID: "",
    };
  },
  computed: {
    ...mapState(["pos"]),
    center() {
      return this.pos;
    },
  },
  methods: {
    ...mapActions(["NearBusStopGetter"]),
    busStopsForm(bus_stops_fetch) {
      return bus_stops_fetch.map((bus_info) => {
        const { StopName, StopPosition, StopID, StopUID } = bus_info;
        return {
          StopName,
          StopPosition: {
            lat: StopPosition.PositionLat,
            lng: StopPosition.PositionLon,
          },
          StopID,
          StopUID,
        };
      });
    },
    MarkerInfoOpen(id) {
      this.openedMarkerID = id;
    },
  },
  watch: {
    pos() {
      this.NearBusStopGetter().then(
        (res) => (this.busStops = this.busStopsForm(res))
      );
    },
  },
};
</script>

<style lang="scss">
.vue-map-container {
  width: 100%;
  height: 100%;
}
</style>
