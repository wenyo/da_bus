<template>
  <GMapMap :center="center" :zoom="15" ref="myMapRef" :options="options">
    <GMapCluster>
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
      <GMapMarker
        :position="center"
        :icon="{
          url: PositionIcon,
          scaledSize: { width: 20, height: 20 },
        }"
        :clickable="true"
        label="1"
      >
          <div>11</div>
        <GMapInfoWindow
          :opened="true"
          :options="{
            pixelOffset: {
              width: 0,
              height: 12,
            },
            maxWidth: 0,
            maxHeight: 0,
          }"
        >
          <div>00</div>
        </GMapInfoWindow>
      </GMapMarker>
    </GMapCluster>
  </GMapMap>
</template>

<script>
import { ref } from "vue";
import { mapState } from "vuex";
import MapStyle from "./MapStyle.json";
import PositionIcon from "../assets/img/position.png";

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
