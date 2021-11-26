<template>
  <InfoBar />
  <div class="main">
    <Nav />
    <router-view />
  </div>
    <Footer />
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";
import InfoBar from "./components/InfoBar.vue";
export default {
  components: { Nav, InfoBar, Footer },
  mounted() {
    this.findMe();
  },
  computed: {
    ...mapState(["pos"]),
  },
  methods: {
    ...mapMutations(["posGetter"]),
    ...mapActions(["MyDistrictGetter"]),
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
  height: calc(100vh - 60px);
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
}
.contain {
  flex: 1 1 0;
  flex-wrap: wrap;
  display: flex;
}
</style>
