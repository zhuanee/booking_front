<template>
  <div>
    <!-- 头部区域 -->
    <AppHeader />
    <!-- 左侧导航区域 -->
    <AppNavbar />
    <!-- 右侧主区域 -->
    <AppMain />
  </div>
</template>

<script>
import AppHeader from "./AppHeader";
import AppNavbar from "./AppNavbar";
import AppMain from "./AppMain";

export default {
  data() {
    return {};
  },

  components: { AppHeader, AppNavbar, AppMain },

  methods: {}
};
</script>

<style scoped>
.header {
  position: absolute;
  line-height: 50px;
  padding: 0px;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 90px;
  background-color: #2d3a4b;
}
/* 上侧导航栏 */
.navbar {
  position: absolute;
  width: 100%;
  top: 90px;
  left: 0px;
  height: 61px;
  overflow-y: auto;
  background-color: #545c64;
}
/* 右侧主区域 */
.main {
  background: rgb(237, 234, 223);
  position: absolute;
  top: 170px;
  left: 230px;
  right: 230px;
  bottom: 10px;
  padding: 10px;
  overflow-y: auto;
}
</style>