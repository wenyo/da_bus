<template>
  <div class="controller">
    <Tips />
    <Input v-model="searchText" />
    <div class="vice-tab">
      <Button type="second" icon="flag" text="市區公車路線" />
      <Button type="second" icon="bookmark" text="我的收藏" />
    </div>
    <div class="bus-stop">
      <div class="title font-size-m light-100 font-weight-500">最近站牌</div>
      <div class="detail">
        <h4 class="font-size-l light-100 font-weight-400">中央大學後門</h4>
        <span class="dark-300">255 m</span>
        <div class="dark-300 refresh">
          <span>資料更新時間：2021/11/16 11:32:31（15s）</span>
          <i class="icon-refresh-left"></i>
        </div>
      </div>
    </div>
    <Card />
  </div>
</template>

<script>
import Tips from "./components/Tips.vue";
import Card from "./components/Card.vue";
import Input from "../../components/Input.vue";
import Button from "../../components/Button.vue";

export default {
  name: "Controller",
  components: {
    Tips,
    Card,
    Input,
    Button,
  },
  data() {
    return {
      searchText: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.controller {
  & > * {
    margin-bottom: 24px;
  }
}

.vice-tab {
  display: flex;
  justify-content: space-between;

  & > button {
    &:first-child {
      flex: 0 2 60%;
    }

    &:last-child {
      flex: 0 1 35%;
    }
  }
}

.bus-stop {
  .title {
    margin-bottom: 20px;
  }

  .detail {
    h4 {
      display: inline-block;
      margin-right: 10px;
    }
    div {
      margin-top: 10px;
    }
  }
}

.refresh {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>