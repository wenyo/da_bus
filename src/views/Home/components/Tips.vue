<template>
  <div v-if="hasTips">
    <i class="icon-info-circle"></i>
    <p>目前僅限桃園、臺中、高雄地區提供動態「預估到站時間」功能，敬請見諒。</p>
    <i class="icon-close" @click="hasTips = false"></i>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hasTips: true,
    };
  },
};
</script>
<style lang="scss" scoped>
div {
  width: 100%;
  background-color: $primary-color-master;
  padding: 26px 20px;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    margin: 0 20px;
  }
}
i {
  &:first-child {
    font-size: 20px;
  }
  &:last-child {
    font-size: 12px;
    cursor: pointer;
  }
}
</style>
