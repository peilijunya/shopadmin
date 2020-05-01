<template>
  <div class="login">
    <!--粒子特效!-->
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    ></vue-particles>

    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      class="demo-ruleForm animated bounceInDown"
    >
      <h1 class="title">电商后台管理系统</h1>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          autocomplete="off"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button v-loading="fullscreenLoading" type="primary"  @click="submitForm('loginForm')" class="btn">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { postLoginApi } from "@/api";
export default {
  data() {
    return {
      fullscreenLoading:false,
      loginForm: {
        username: "",
        password: ""
      },
      //校验规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.fullscreenLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          postLoginApi(this.loginForm).then(res => {
            console.log(res);
            if (res.meta.status == 200) {
              //设置token
              this.fullscreenLoading = false;
              localStorage.setItem("token", res.data.token);
              //设置username
              localStorage.setItem("username", res.data.username);
              this.$message.success("登录成功");
              this.$router.push({ path: "/welcome" });
            } else {
              this.$message.error(res.meta.msg);
            }
          });
        } else {
          this.$message.error("输入的内容有误，请重新输入");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: rgb(57, 96, 146);
  display: flex;
  justify-content: center;
  align-items: center;
  .lizi {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .el-form {
    width: 350px;
    height: 300px;
    .title {
      text-align: center;
      margin-bottom: 20px;
    }
  }
}
.btn {
  width: 100%;
}
</style>