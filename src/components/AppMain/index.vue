<template>
  <div class="main">
    <!-- 子路由渲染出口 -->
    <AppLink v-show="$route.path !== '/home'"/>
    <router-view></router-view>
  </div>
</template>

<script>
import AppLink from './link'

export default {
  data() {
    return {};
  },

  components: { AppLink },

  methods: {}
};
</script>

<style scoped>
</style>