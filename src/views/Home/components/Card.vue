<template>
  <ul class="cards">
    <li>
      <div class="title font-size-l light-100">132</div>
      <ul class="dark-300">
        <li>
          <div>
            <div class="icon-img">
              <img :src="StartPos" alt="公車起點站" />
              <div class="decoration-line"></div>
            </div>
            <span>國鼎圖書館</span>
          </div>
          <div>
            <div class="icon-img">
              <img :src="EndPos" alt="公車終點站" />
            </div>
            <span>中壢公車站</span>
          </div>
        </li>
        <li>
          <div>
            <i class="icon-clock"></i>
            <span class="light-100">17</span>
            <span>分鐘</span>
          </div>

          <div>
            <i class="icon-user"></i>
            <span class="light-100">18/45</span>
            <span>位乘客</span>
          </div>
        </li>
      </ul>
      <div class="ring">
        <i class="icon-bell light-100"></i>
        <!-- <i class="icon-bell-fill primary-color-master"></i> -->
      </div>
      <div class="nex-bus light-100">
        <div>463-FT</div>
      </div>
    </li>
  </ul>
</template>

<script>
import { StartPos, EndPos } from "../../../components/PosIconPath";

export default {
  data() {
    return {
      StartPos,
      EndPos,
    };
  },
};
</script>
<style lang="scss" scoped>
.cards {
  & > li {
    position: relative;
    background-color: $dark-200;
    border-radius: 16px;
    padding: 20px 24px;
    overflow: hidden;
  }
  .title {
    margin-bottom: 16px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      flex: 0 0 50%;

      div {
        display: flex;
        align-items: center;
        flex-direction: row;
      }

      & > :first-child {
        margin-bottom: 20px;
      }
    }

    img,
    i {
      transform: translateY(2px);
      margin-right: 8px;
    }
  }
}

.icon-img {
  position: relative;
  display: inline-block;
}

.decoration-line {
  content: "";
  position: absolute;
  top: 20px;
  left: calc(50% - 5px);
  width: 2px;
  height: 14px;
  background: linear-gradient(
    to bottom,
    $dark-300 2px,
    transparent 4px,
    $dark-300 6px,
    transparent 8px,
    $dark-300 10px,
    transparent 12px,
    $dark-300 14px
  );
}

.nex-bus {
  position: absolute;
  top: 0;
  right: 0;
  background-color: $primary-color-third;
  height: 100%;
  width: 40px;
  display: flex;
  align-items: center;

  & > div {
    transform: rotate(90deg) translateY(50%);
    white-space: nowrap;
  }
}

.ring {
  position: absolute;
  font-size: 20px;
  top: 20px;
  right: 60px;
}
</style>