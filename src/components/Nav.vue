<template>
  <nav>
    <h2 class="title">
      <span>Da Bus</span>
      <img src="@/assets/img/logo-text.svg" alt="Da Bus logo" />
    </h2>
    <ul>
      <template v-for="routeInfo in routes" :key="routeInfo.name">
        <router-link
          :to="routeInfo.path"
          v-slot="{ isActive, navigate }"
          custom
        >
          <li :class="{ active: isActive }" @click="navigate">
            {{ routeInfo.name }}
          </li>
        </router-link>
      </template>
    </ul>
  </nav>
</template>

<script>
import { routes } from "../router";
export default {
  data() {
    return {
      routes,
    };
  },
};
</script>
<style lang="scss" scoped>
nav {
  width: 100%;
  position: relative;
  flex: 0 0 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  position: absolute;
  left: 10%;
  display: inline-flex;
  justify-content: center;
  padding: 15px 0;

  span {
    display: none;
  }
  img {
    width: 64px;
  }
}

ul {
  display: flex;
  flex-direction: row;
  color: $light-100;

  li {
    cursor: pointer;
    margin: auto 20px;

    &.active {
      color: $primary-color-master;
    }
  }
}
</style>
