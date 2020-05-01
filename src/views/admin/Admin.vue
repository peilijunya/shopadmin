<template>
  <div class="admin">
    <div class="nav" :style="navsStyleObj">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#263445"
        text-color="#fff"
        active-text-color="#ffd04b "
      >
        <!--首页-->
       <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">后台首页</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">
              <router-link to="/welcome">后台首页</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!--用户管理模块!-->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">
              <router-link to="/userList">用户列表</router-link>
            </el-menu-item>
            <el-menu-item index="2-2">
              <router-link to="/userAdd">用户添加</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!--商品管理模块!-->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-goods"></i>
            <span slot="title">商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">
              <router-link to="/goodsList">商品列表</router-link>
            </el-menu-item>
            <el-menu-item index="3-2">
              <router-link to="/goodsAdd">商品添加</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!--订单管理模块!-->
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span slot="title">订单管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">
              <router-link to="/orderList">订单列表</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!--订单管理模块!-->
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-lock"></i>
            <span slot="title">权限管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1" @click="clickFns" style="color:red">
              <router-link to="/powerList">权限列表</router-link>
            </el-menu-item>
            <el-menu-item index="5-2">
              <router-link to="/roleList">用户列表</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>

    <div class="main">
      <div class="navbar">
        <div class="l" v-show="minbaoHidden" id="some-element2">
          <i class="el-icon-s-fold" @click="navsFn"></i>
         
            <el-breadcrumb separator-class="el-icon-arrow-right" class="miaobaoxie">
              <el-breadcrumb-item>
                <i style="font:16px/18px '';font-weight:800 "
                >首页</i>
              </el-breadcrumb-item>
              <el-breadcrumb-item
                v-show="mianbaoxieData[0]"
                style="font-weight:800;"
                class="animated fadeInRight remove"
              >{{mianbaoxieData[0]}}</el-breadcrumb-item>
              <el-breadcrumb-item
                v-show="mianbaoxieData[1]"
                class="animated fadeInRight remove"
                ref="animateFn"
              >{{mianbaoxieData[1]}}</el-breadcrumb-item>
            </el-breadcrumb>
        

        </div>
        <div class="r">
          <el-tooltip content="搜索" placement="top" effect="light">
            <span class="iconfont icon-sousuo"></span>
          </el-tooltip>
          <el-tooltip content="全屏" placement="top" effect="light">
          <span @click="clickFullscreen" class="iconfont icon-quanping"></span>
           </el-tooltip>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <span class="usernames iconfont icon-yonghu">
                {{name}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
       <div style="height:30px">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <el-tag
                  v-for="(tag,index) in dynamicTags"
                  :key="index"
                  :effect="tag.color"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag,index)"
                  @click="chatRouter(tag,index)"
                  class="animated bounceInLeft"
                  id="some-element5"
                >{{tag.authName}}</el-tag>
              </div>
            </div>
          </div>
        </div>
        <!-- <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button> -->
        <div class="router">
          <br />      
      <router-view></router-view>
    </div>
  </div>
  </div>
</template>
<script>
import screenfull from "screenfull";
import Driver from "driver.js" // import driver.js
import "driver.js/dist/driver.min.css" // import driver.js css
export default {
  data() {
    return {
      dynamicTags: [
        {
          id: 110,
          authName: "首页",
          // path: "welcome",
          color: "light",
          fatherName: ""
        }
      ],

      minbaoHidden: true,
      mianbaoxieData: [],
      isFullscreen: false,
      name: localStorage.getItem("username"),
      isCollapse: false,
      navsStyleObj: { width: "245px" },
      clickStyleObj: { color: "red" }
    };
  },

  methods: {
     newHeader() {
      //  console.log(1);
      this.$driver.defineSteps(driverStep);
      this.$driver.start();
    },
    // 点击tags标签
    handleClose(tag) {
      let pathIndex = this.dynamicTags.indexOf(tag);
      this.dynamicTags.splice(pathIndex, 1);
      let pathParams =
        this.dynamicTags.length == pathIndex
          ? this.dynamicTags[pathIndex - 1].path
          : this.dynamicTags[pathIndex].path;
      let nameParam =
        this.dynamicTags.length == pathIndex
          ? this.dynamicTags[pathIndex - 1].authName
          : this.dynamicTags[pathIndex].authName;
      let fatherParam =
        this.dynamicTags.length == pathIndex
          ? this.dynamicTags[pathIndex - 1].fatherName
          : this.dynamicTags[pathIndex].fatherName;
      let numColor =
        this.dynamicTags.length == pathIndex ? pathIndex - 1 : pathIndex;
      this.chatRouter(
        { authName: nameParam, fatherName: fatherParam, path: pathParams },
        numColor
      );
    },

    chatRouter(pathParams, index) {
      // ? this.mianbaoxieData=[pathParams.authName] : this.mianbaoxieData[1]=pathParams.authName
      if (index=='1') {
        this.mianbaoxieData.length = 0;
      } else {
        this.mianbaoxieData[0] = index;
        this.mianbaoxieData[1] = index;
      }
      this.daohangColor(index);
      // 切换面包屑
      this.$router.push({ path: pathParams.path });
      this.breadAnimate();
    },
    // 点击首页
    headerFn() {
      this.mianbaoxieData = [];
    },
    // 导航标签变色
    daohangColor(index) {
      for (let i = 0; i < this.dynamicTags.length; i++) {
        this.dynamicTags[i].color = "light";
      }
      if (/^\d*$/g.test(index)) {
        this.dynamicTags[index].color = "dark";
      } else {
        this.dynamicTags[this.dynamicTags.indexOf(index)].color = "dark";
      }
    },
    //面包屑
    fun(data, pathParams) {
      // 点击标题将路由添加到tabs选项数据中
      // 判断是否已存在
      pathParams.color = "light";
      pathParams.fatherName = data[0];
      if (this.dynamicTags.indexOf(pathParams) == -1) {
        if (pathParams.authName == "首页") {
          this.daohangColor(0);
          return;
        }
        this.dynamicTags.push(pathParams);
        // 标签的名字
      }
      this.breadAnimate();
      this.mianbaoxieData = data;
      this.daohangColor(pathParams);
    },
    handleCommand(command) {
      if (command == "a") this.logout();
      if (command == "b") this.newHeader();
    },
breadAnimate() {
      this.minbaoHidden = false;
      setTimeout(() => {
        this.minbaoHidden = true;
      }, 100);
    },

    logout() {
      // console.log("退出");
      this.$notify({
        title: "退出成功",
        message: "感谢您的访问，再见！",
        offset: 100,
        duration: 2000
      });
      // 清除登录状态
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      // 跳转到登录页面
      setTimeout(() => {
        this.$router.push({ path: "login" });
      }, 1000);
    },

    clickFullscreen() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: "you browser can not work",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    navsFn() {
      this.isCollapse = !this.isCollapse;
      this.navsStyleObj = this.isCollapse
        ? { width: "50px", transition: "all .3s linear" }
        : { width: "245px", transition: "all .3s linear" };
    },
    clickFns() {
      this.clickStyleObj = { color: "rgb(75, 139, 218)" };
      console.log(1);
    }
  }
};
</script>
<style  lang="scss" scoped>
.admin {
  width: 100%;
  height: 100%;
  background-color: rgb(221, 223, 226);
  display: flex;
  overflow: hidden;
  .nav {
    width: 245px;
    height: 100%;
    // float: left;
    background-color: #263445;
    overflow: hidden;

    .el-menu-item a {
      color: rgb(191, 203, 217);
      text-decoration: none;
      display: block;
    }
    .el-menu-vertical-demo {
      border: none;
    }
  }
  .main {
    // float: left;
    width: 100%;
    .navbar {
      height: 50px;
      width: 100%;
      line-height: 50px;
      // margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      background-color: aquamarine;
      .l {
        width: 800px;
        font-size: 30px;
        margin-left: 2px;
        cursor: pointer;
        // background-color: aquamarine;
        .el-breadcrumb {
          display: inline-block;
          font-size: 20px;
          
        }
        .el-icon-s-fold {
          width: 50px;
        }
      }

      .r {
        .el-dropdown {
          float: right;
          margin-right: 10px;
        }
        .el-dropdown-link {
          cursor: pointer;
          color: #3da9c4;
        }
        .el-icon-arrow-down {
          font-size: 16px;
        }
        float: right;
        width: 280px;
        .usernames {
          font-size: 16px;
          margin-right: 10px;
        }
        .icon-sousuo {
          font-size: 20px;
          cursor: pointer;
        }

        .icon-quanping {
          margin: 0 10px;
          cursor: pointer;
          font-size: 25px;
          line-height: 30px;
        }
        .icon-yonghu {
          margin: 0 10px;
        }
      }
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
}
</style>