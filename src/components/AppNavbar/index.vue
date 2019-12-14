<template>
  <div class="navbar">
    <el-menu
      :router = "true"
      :default-active="$route.path"
      mode="horizontal"
      class="el-menu-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/member/" v-show="isAdmin">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/booking/" v-show="!isAdmin">
        <i class="el-icon-user"></i>
        <span slot="title">教室预定</span>
      </el-menu-item>
      <el-menu-item index="/room/" v-show="isAdmin">
        <i class="el-icon-user"></i>
        <span slot="title">教室管理</span>
      </el-menu-item>
      <el-menu-item index="/process/" v-show="isAdmin">
        <i class="el-icon-user"></i>
        <span slot="title">预定处理</span>
      </el-menu-item>
      <el-menu-item index="/record/" v-show="!isAdmin">
        <i class="el-icon-user"></i>
        <span slot="title">我的预定</span>
      </el-menu-item>
      <el-menu-item index="/info/" >
        <i class="el-icon-user"></i>
        <span slot="title">信息修改</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAdmin: ''
    }
  },

  components: {},
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const userInfo = JSON.parse(localStorage.getItem('nju-booking-user'))
      if(userInfo.role == 'admin')
      {
        this.isAdmin = true
      }
      else{
        this.isAdmin = false
      }
    },
  }
};
</script>

<style scoped>
.el-menu {
border-right: none;
margin-left: 350px;
}
.el-menu-item{
  margin-right: 110px;
}
</style>