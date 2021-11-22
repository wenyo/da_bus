<template>
  <router-view />
  <Button icon="plus"> </Button>
  <Button> </Button>
  <IconButton />
</template>

<script>
import Button from "./components/Button.vue";
import IconButton from "./components/IconButton.vue";
export default {
  components: { Button, IconButton },
};
</script>

<style lang="scss">
#app {
  background: $dark-100;
  width: 100vw;
  height: 100vh;
}
</style>