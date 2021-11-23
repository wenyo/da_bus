<template>
  <GMapMap :center="center" :zoom="15" ref="myMapRef" :options="options">
    <GMapCluster>
      <!-- my possition -->
      <GMapMarker
        :position="center"
        :clickable="true"
        :icon="{
          url: PositionIcon,
          anchor: { x: 32, y: 32 },
        }"
      >
        <!-- my possition -->
      </GMapMarker>
    </GMapCluster>
  </GMapMap>
</template>

<script>
import { ref } from "vue";
import { mapState } from "vuex";
import MapStyle from "../assets/map/MapStyle.json";
import PositionIcon from "../assets/img/pos/my-pos-l.svg";

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
      markers: [],
    };
  },
  computed: {
    ...mapState(["pos"]),
    center() {
      return this.pos;
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
