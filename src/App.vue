<template>
  <InfoBar />
  <div class="contain">
    <Nav />
    <router-view />
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import InfoBar from "./components/InfoBar.vue";
export default {
  components: { Nav, InfoBar },
};
</script>

<style lang="scss">
#app {
  background: $dark-100;
  width: 100vw;
  height: 100vh;
  display: flex;
}
</style>