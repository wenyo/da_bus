<template>
  <GMapMap
    :center="center"
    :zoom="17"
    ref="myMapRef"
    :options="options"
    @center_changed="updateRouteLatLng"
  >
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
    <!-- <GMapCluster :styles="clusterStyles" :minimumClusterSize="3" > need fix: 定位不在地圖上，而是畫面正中間 -->
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
    <!-- </GMapCluster> -->
  </GMapMap>
</template>

<script>
import { ref } from "vue";
import { mapState, mapActions } from "vuex";
import MapStyle from "../assets/map/MapStyle.json";
import PositionIcon from "../assets/img/pos/my-pos-l.svg";
import BusStopIcon from "../assets/img/pos/busstop-pos.svg";
import Test1 from "../assets/img/pos/after-pos.svg";
import Test2 from "../assets/img/pos/end-pos.svg";
import Test3 from "../assets/img/pos/nearby-pos.svg";

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
      clusterStyles: [
        {
          textColor: "red",
          url: Test3,
        },
        {
          textColor: "white",
          url: Test1,
        },
        {
          textColor: "white",
          url: Test2,
        },
      ],
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
        const { StopName, StopPosition, StopID, StopUID, StationGroupID } =
          bus_info;
        return {
          StopName,
          StopPosition: {
            lat: StopPosition.PositionLat,
            lng: StopPosition.PositionLon,
          },
          StopID,
          StopUID,
          StationGroupID,
        };
      });
    },
    MarkerInfoOpen(id) {
      this.openedMarkerID = id;
    },
    updateRouteLatLng() {
      // console.log(place.lat());
      // console.log(place.lat());
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
