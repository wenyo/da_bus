<template>
  <div>
    <i class="icon-search" v-if="!modelValue"></i>
    <input
      type="text"
      placeholder="你想去哪裡？"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  width: 100%;
  position: relative;
  font-size: 14px;

  i {
    position: absolute;
    color: $dark-300;
    top: 50%;
    left: 35%;
    transform: translateY(-50%);
  }
}
input {
  color: $light-100;
  width: 100%;
  border-radius: 12px;
  background-color: $dark-200;
  outline: unset;
  border: unset;
  text-align: center;
  padding: 16px 0;
  &:focus {
    border: 1px solid $light-100;
  }
}
</style>