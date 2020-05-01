<template>
<div class="userAdd">
    <!-- tabs标签页 -->
        
            <el-form label-width="120px">
                <el-form-item label="用户名">
                    <el-input v-model="addFormData.username"></el-input>
                </el-form-item>

                <el-form-item label="密码">
                   <el-input v-model="addFormData.password"></el-input>
                </el-form-item>

                <el-form-item label="邮箱">
                   <el-input v-model="addFormData.email"></el-input>
                </el-form-item>

                <el-form-item label="电话">
                   <el-input v-model="addFormData.mobile"></el-input>
                </el-form-item>

                <el-form-item>
                        <el-button type="primary" icon="el-icon-success" @click="submitFn">
                        提交</el-button>
                </el-form-item>
            </el-form>
    <!-- /tabs标签页 -->
    
</div>
</template>
<script>
import  {postUsersApi} from '@/api'
export default {
    
    methods: {
        submitFn() {
      postUsersApi(this.addFormData).then(res => {
          console.log(res)
        if (res.meta.status == 201) {
          this.$message.success("添加成功");
          this.$router.push({ path: "/userList" });
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },
        // 弹框
        handleChange(value) {
            console.log(value);
        },
        handleClose() {
            this.isShowEditTk = false
        },
        // 上传图片
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
    },
    data() {
        return {
            addFormData: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
        }
    }
}
</script>
<style lang="scss" scoped>
// create
.userAdd {
    width: 50%;
    .el-form{
        margin: 50px ;
    }
}
</style>