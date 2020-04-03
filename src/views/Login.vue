<template>
<div class="login">
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm">
   <el-form-item  prop="age">
    <el-input v-model.number="ruleForm.age"></el-input>
  </el-form-item>
  <el-form-item  prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入用户名" clearable></el-input>
  </el-form-item>
 
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')" class="btn">登录</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
         
          age: ''
        }, 
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
         
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  } 
</script>

<style lang="scss" scoped>
.login{
    width: 100%;
    height: 100%;
    background-color: rgb(57, 96, 146);
          display: flex;
      justify-content: center;
      align-items: center;
    .el-form{
      width: 300px;
      height: 200px;

    }
}
.btn{
  width: 100%;
}

</style>