<template>
  <div>
    <h1>南京大学教室预定系统</h1>
    <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in 4" :key="item">
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  components: {},

  methods: {}
}
</script>

<style scoped>
div{
    text-align: center;
}


  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>