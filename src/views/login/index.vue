<template>
  <div class="login-container">
    <el-form ref="form" :model="form" :rules="rule" label-width="80px" class="login-form">
      <h2 class="login-title">南京大学教室预定系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/login";

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rule: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //alert("submit!");
          login(this.form.username, this.form.password).then(response => {
            const resp = response.data;
            console.log(resp, resp.flag);
            if (resp.flag) {
              //验证成功
              getUserInfo(resp.data.token).then(response => {
                const respUser = response.data;

                if (respUser.flag) {
                  console.log(respUser.data);
                  localStorage.setItem(
                    "nju-booking-user",
                    JSON.stringify(respUser.data)
                  );
                  localStorage.setItem("nju-booking-token", resp.data.token);
                  //前往首页
                  this.$router.push("/");
                } else {
                  this.$message({
                    message: respUser.message,
                    type: "warning"
                  });
                }
                //获取用户信息
              });
            } else {
              this.$message({
                message: resp.message,
                type: "warning"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-form {
  width: 350px;
  margin: 160px auto;
  background: rgb(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 20px;
}

.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../../assets/nju_bg.png);
}

.login-title {
  color: #303133;
  text-align: center;
}
</style>