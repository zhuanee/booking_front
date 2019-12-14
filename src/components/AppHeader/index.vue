<template>
  <div class="header">
    <!-- 头部左侧Logo和标题 -->
    <a href="#/">
      <img class="logo" src="@/assets/logo.png" width="25px" />
      <span class="company">南京大学教室预定系统</span>
    </a>

    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        admin
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">修改密码</el-dropdown-item>
        <el-dropdown-item command="b">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { logout } from "@/api/login";

export default {
  data() {
    return {};
  },

  components: {},

  methods: {
    handleCommand(command) {
      switch (command) {
        case "a":
          //修改密码
          break;
        case "b":
          //退出系统
          logout(
            localStorage.getItem(localStorage.getItem("nju-booking-token"))
          ).then(response => {
            // 清除本地数据
            localStorage.removeItem("nju-booking-token");
            localStorage.removeItem("nju-booking-user");
            this.$router.push("/login");
          });
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped>
.logo {
  vertical-align: middle;
  /* 上 右 下 左 */
  padding: 0 10px 0 40px;
}
.company {
  position: absolute;
  color: white;
}
.el-dropdown {
  float: right;
  margin-right: 40px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
</style>