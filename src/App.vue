<template>
  <InfoBar />
  <div class="main">
    <Nav />
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Nav from "./components/Nav.vue";
import InfoBar from "./components/InfoBar.vue";
export default {
  components: { Nav, InfoBar },
  mounted() {
    this.findMe();
  },
  methods: {
    ...mapMutations(["posGetter"]),
    findMe() {
      navigator.geolocation.getCurrentPosition(this.posGetter, (error) => {
        console.error(error);
      });
    },
  },
};
</script>

<style lang="scss">
#app {
  background: $dark-100;
  width: 100vw;
  height: 100vh;
  display: flex;
}
.main {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
}
.contain {
  flex: 1 1 0;
  flex-wrap: wrap;
}
</style>