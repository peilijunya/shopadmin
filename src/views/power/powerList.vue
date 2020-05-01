<template>
  <div>
      <!-- 表格 -->
      <!-- 表格动画 -->
      <transition
        appear
        enter-active-class="animated fadeInUpBig"
        leave-active-class="animated fadeOutDownBig"
        mode="out-in"
    >
    <!-- 表格展示 -->
      <template>
        <el-table
            :data="tableData"
            border
            stripe
            style="width: 95%" rowKey="id">
            <el-table-column
              type="index"
              label="编号"
              width="50"
              prop="id">
            </el-table-column>
            <el-table-column
            prop="authName"
            label="权限名称"
            width="350">
            </el-table-column>
            <el-table-column
            prop="path"
            label="路径"
            width="350">
            </el-table-column>
            <el-table-column
              prop="children.length"
              label="权限等级">
                
            </el-table-column>
        </el-table>
        </template>
      </transition>


  </div>
</template>

<script>
import {
    getPowersApi
} from '@/api'
export default {
    data() {
      return {
        //表格数据
       
        tableData:[],
        type:'tree'
          
      }
    },
   
     
   methods:{
     initData() {
      getPowersApi(this.type).then(res => {
        console.log(res);
        this.tableData = res.data;
      
      });
    },
   
   },
    created() {
    this.initData();
  },
    
}
</script>

<style lang="scss" scoped>
.el-table{
  margin: 20px;

  
}
</style>