<template>
  <button
    :class="`btn-${type} ${className} ${active ? 'active' : ''}`"
    @click="clickFun"
  >
    <i :class="`icon-${icon}`" v-if="!!icon"></i>
    <span>{{ text }}</span>
  </button>
</template>

<script>
const TYPE_MOUDLE = ["primary", "second", "third", "text"];
export default {
  props: {
    type: {
      type: String,
      default: TYPE_MOUDLE[1],
    },
    icon: {
      type: String,
    },
    text: {
      type: String,
      default: "Button",
    },
    className: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      default: false,
    },
    clickFun: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-primary {
  min-width: 300px;

  i {
    margin-right: 20px;
  }
}

.btn-second {
  padding: 10px 20px;

  i {
    margin-right: 20px;
  }
}

.btn-text {
  i {
    margin-right: 20px;
  }
}
</style>
