<template>
<div class="admin">
    <div class="nav">
       <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-radio-button :label="false">展开</el-radio-button>
  <el-radio-button :label="true">收起</el-radio-button>
</el-radio-group> -->
<el-menu default-active="1-4-1" 
class="el-menu-vertical-demo" 
@open="handleOpen" @close="handleClose" :collapse="isCollapse"
background-color="rgb(51,64,80)" text-color="rgb(178,190,203)">
  <el-submenu index="1">
    <template slot="title">
      <i class="iconfont icon-delete"></i>
      <span slot="title">XX管理</span>
    </template>
    <el-menu-item-group>

      <el-menu-item index="1-1">列表</el-menu-item>
      <el-menu-item index="1-2">添加</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group >
      <el-menu-item index="1-3">选项3</el-menu-item>
    </el-menu-item-group>
 
  </el-submenu>
  <el-submenu index="2">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">XX管理</span>
    </template>
    <el-menu-item-group>

      <el-menu-item index="1-1">列表</el-menu-item>
      <el-menu-item index="1-2">添加</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group >
      <el-menu-item index="1-3">选项3</el-menu-item>
    </el-menu-item-group>
 
  </el-submenu>
  <el-submenu index="3">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">导航一</span>
    </template>
    <el-menu-item-group>
      
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group >
      <el-menu-item index="1-3">选项3</el-menu-item>
    </el-menu-item-group>

  </el-submenu>
 
</el-menu>

    </div>
    <div class="main">
        <router-view></router-view>
    </div>

</div>

</template>
<script>
export default {
    data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style  lang="scss" scoped>
.admin{
    width: 100%;
    height: 100%;
    background-color: rgb(221,223,226);
    .nav{
        width: 200px;
        height: 100%;
        float: left;
        background-color: rgb(51,64,80);
        .icon-delete{
            font-size: 25px;
            margin-right: 10px;

        }
    }
    .main{
        float: left;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>