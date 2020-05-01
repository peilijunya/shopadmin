<template>
<div class="goods">
    <!-- hello -->

    <!-- 表格头 -->
    <div class="tableHeader">

        <el-input placeholder="请输入内容" class="search">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <span class="mr10"></span>
        <el-button type="success">添加角色</el-button>
        <el-button type="success">导出Excel<i class="el-icon-download"></i></el-button>
    </div>
    <!-- /表格头 -->

    <!-- 表格内容 -->
    <div class="tableContent">
        <el-table
            v-loading="loading"
            border
            rowKey="id"
            :data="tableData"
            stripe
            style="width: 100%"
            
            >

            <!-- 
                label 列名称
                width 列宽度
                prop  列填充数据（先不管等接口请求
             -->

            <el-table-column label="编号" width="80"  align="center" prop="id">
                
            </el-table-column>

            <el-table-column
            prop="roleName"
            label="角色名称"
            width="180" >
            </el-table-column>

            <el-table-column label="角色描述" width="240" align="center" prop="roleDesc">
            </el-table-column>

           

            <el-table-column
            fixed="right"
            label="操作">
                <template slot-scope="scope"> 
                <!-- scope.row 代表当前行数据 -->
                    <el-button @click="handleEdit(scope.row)"  size="mini" type="danger" icon="el-icon-edit">分配权限</el-button>
                    <el-button @click="deleteFn(scope.row.id)" size="mini" type="info" icon="el-icon-delete-solid"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <!-- /表格内容 -->

    <!-- 表格分页 -->
    <div class="tablePage">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 200, 300, 400]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDataTotal"
        >
        </el-pagination>
    </div>
    <!-- /表格分页 -->

    <!-- 其他 -->
    <el-dialog
    title="编辑商品"
    :visible.sync="isShowEditTk"
    width="30%"
    :before-close="handleClose">
    
        <el-form label-width="90px">
            <el-form-item label="商品名称">
                <el-input></el-input>
            </el-form-item>

            <el-form-item label="商品价格">
                <el-input></el-input>
            </el-form-item>

            <el-form-item label="商品数量">
                <el-input></el-input>
            </el-form-item>

            <el-form-item label="商品重量">
                <el-input></el-input>
            </el-form-item>

            <el-form-item label="商品分类">
                  <el-cascader
                    :options="options"
                    v-model="selectedOptions"
                    @change="handleChange">
                </el-cascader>
            </el-form-item>
        </el-form>
        
        <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    
        <span slot="footer" class="dialog-footer">
            <el-button @click="isShowEditTk = false">取 消</el-button>
            <el-button type="primary" @click="isShowEditTk = false">确 定</el-button>
        </span>
    </el-dialog>
    <!-- /其他 -->
</div>
</template>
<script>
import {getRolesApi,deleteRolesApi} from '@/api'
export default {
    methods: {
      // 删除
      deleteFn(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteRolesApi(id).then(res => {
            if (res.meta.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              const totalPages = Math.ceil((this.total - 1) / this.pagesize);

              //记录当前页码
              //记住删除最后一条数据时当前码是最后一页
              const pagenum =this.pagenum > totalPages ? totalPages : this.pagenum;
              //实现跳转
              this.pagenum = pagenum < 1 ? 1 : pagenum;

              this.initData();
            } else {
              this.$message.error("删除失败");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
      //编辑按钮传参
      handleEdit( row) {
          //显示模型数据
          this.tableData.name=row.name;
          //显示修改弹框
          this.isShowEditTk = true;
        console.log( row);
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        val = this.pagesize;
        this.initData();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        val = this.pagenum;
        this.initData();
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
      },
      initData(){
          getRolesApi({
        pagesize: this.pagesize,
        pagenum: this.pagenum,
        query: this.query
      }).then(res => {
        console.log(res);
        // 数据同步到模型，模型改变同步到视图
        this.tableData = res.data;
        this.tableDataTotal = res.data.length;
      });
      }
    },
    created() {
        this.initData();
    },
    data() {
        return {
            tableDataTotal:0,
            pagenum:1,
            pagesize:10,
            // 表格数据
            isShowEditTk: false,
            // 表格page
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,
            // 表格loading
            loading: false,
            // 表格数据
            tableData: [],
            // 联级选择器数据
            options: [
                {
            value: 'zhinan',
            label: '指南',
            children: [{
                value: 'shejiyuanze',
                label: '设计原则',
                children: [{
                value: 'yizhi',
                label: '一致'
                }, {
                value: 'fankui',
                label: '反馈'
                }, {
                value: 'xiaolv',
                label: '效率'
                }, {
                value: 'kekong',
                label: '可控'
                }]
            }, {
                value: 'daohang',
                label: '导航',
                children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
                }, {
                value: 'dingbudaohang',
                label: '顶部导航'
                }]
            }]
            }, {
            value: 'zujian',
            label: '组件',
            children: [{
                value: 'basic',
                label: 'Basic',
                children: [{
                value: 'layout',
                label: 'Layout 布局'
                }, {
                value: 'color',
                label: 'Color 色彩'
                }, {
                value: 'typography',
                label: 'Typography 字体'
                }, {
                value: 'icon',
                label: 'Icon 图标'
                }, {
                value: 'button',
                label: 'Button 按钮'
                }]
            }, {
                value: 'form',
                label: 'Form',
                children: [{
                value: 'radio',
                label: 'Radio 单选框'
                }, {
                value: 'checkbox',
                label: 'Checkbox 多选框'
                }, {
                value: 'input',
                label: 'Input 输入框'
                }, {
                value: 'input-number',
                label: 'InputNumber 计数器'
                }, {
                value: 'select',
                label: 'Select 选择器'
                }, {
                value: 'cascader',
                label: 'Cascader 级联选择器'
                }, {
                value: 'switch',
                label: 'Switch 开关'
                }, {
                value: 'slider',
                label: 'Slider 滑块'
                }, {
                value: 'time-picker',
                label: 'TimePicker 时间选择器'
                }, {
                value: 'date-picker',
                label: 'DatePicker 日期选择器'
                }, {
                value: 'datetime-picker',
                label: 'DateTimePicker 日期时间选择器'
                }, {
                value: 'upload',
                label: 'Upload 上传'
                }, {
                value: 'rate',
                label: 'Rate 评分'
                }, {
                value: 'form',
                label: 'Form 表单'
                }]
            }, {
                value: 'data',
                label: 'Data',
                children: [{
                value: 'table',
                label: 'Table 表格'
                }, {
                value: 'tag',
                label: 'Tag 标签'
                }, {
                value: 'progress',
                label: 'Progress 进度条'
                }, {
                value: 'tree',
                label: 'Tree 树形控件'
                }, {
                value: 'pagination',
                label: 'Pagination 分页'
                }, {
                value: 'badge',
                label: 'Badge 标记'
                }]
            }, {
                value: 'notice',
                label: 'Notice',
                children: [{
                value: 'alert',
                label: 'Alert 警告'
                }, {
                value: 'loading',
                label: 'Loading 加载'
                }, {
                value: 'message',
                label: 'Message 消息提示'
                }, {
                value: 'message-box',
                label: 'MessageBox 弹框'
                }, {
                value: 'notification',
                label: 'Notification 通知'
                }]
            }, {
                value: 'navigation',
                label: 'Navigation',
                children: [{
                value: 'menu',
                label: 'NavMenu 导航菜单'
                }, {
                value: 'tabs',
                label: 'Tabs 标签页'
                }, {
                value: 'breadcrumb',
                label: 'Breadcrumb 面包屑'
                }, {
                value: 'dropdown',
                label: 'Dropdown 下拉菜单'
                }, {
                value: 'steps',
                label: 'Steps 步骤条'
                }]
            }, {
                value: 'others',
                label: 'Others',
                children: [{
                value: 'dialog',
                label: 'Dialog 对话框'
                }, {
                value: 'tooltip',
                label: 'Tooltip 文字提示'
                }, {
                value: 'popover',
                label: 'Popover 弹出框'
                }, {
                value: 'card',
                label: 'Card 卡片'
                }, {
                value: 'carousel',
                label: 'Carousel 走马灯'
                }, {
                value: 'collapse',
                label: 'Collapse 折叠面板'
                }]
            }]
            }, {
            value: 'ziyuan',
            label: '资源',
            children: [{
                value: 'axure',
                label: 'Axure Components'
            }, {
                value: 'sketch',
                label: 'Sketch Templates'
            }, {
                value: 'jiaohu',
                label: '组件交互文档'
            }]
            }],
            selectedOptions: [],
            selectedOptions2: [],
            // 联级选择器结束

            // 上传图片
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        }
    }
}
</script>
<style lang="scss" scoped>
// goods
.goods {
    width: 96%;
    margin: auto;

    // tableHeader
    .tableHeader {
        width:100%;
        padding:10px 0px;
        background: #fff;

        // search
        .search {width: 300px;}
    }

    // tableContent
    .tableContent { margin: 10px 0px;  }
    // tablePage
    .tablePage {
        width: 100%;
        padding: 10px 0px;
        background: #fff;
    }
}
</style>