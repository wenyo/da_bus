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
        url: MyPosL,
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
          url: BusstopPos,
        }"
        @click="MarkerInfoOpen(busStop.StopUID, busStop.StationID)"
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
import { mapState } from "vuex";
import MapStyle from "../assets/map/MapStyle.json";
import { MyPosL, BusstopPos } from "../components/PosIconPath";

export default {
  setup() {
    const myMapRef = ref();
    const popUp = ref();
    return {
      myMapRef,
      popUp,
    };
  },
  props: {
    busStops: {
      type: [],
    },
    clickBusStop: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      MyPosL,
      BusstopPos,
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
      openedMarkerID: "",
      clusterStyles: [
        {
          textColor: "red",
          url: BusstopPos,
        },
        {
          textColor: "white",
          url: BusstopPos,
        },
        {
          textColor: "white",
          url: BusstopPos,
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
    MarkerInfoOpen(stop_uid, station_id) {
      this.openedMarkerID = stop_uid;
      this.clickBusStop(station_id);
    },
    updateRouteLatLng() {
      // console.log(place.lat());
      // console.log(place.lat());
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
