<template>
  <button class="btn-primary" @click="clickFun">
    <slot />
    <i :class="`icon-${icon}`"></i>
  </button>
</template>

<script>
const ICON = ["search", "sort", "bus"];
export default {
  props: {
    icon: {
      type: String,
      default: ICON[2],
      validator: (val) => ICON.includes(val),
    },
    clickFun: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
button {
  border-radius: 8px;
}
</style>
