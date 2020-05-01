<template>
<div class="goods">
    <!-- hello -->

    <!-- 表格头 -->
    <div class="tableHeader">   
    <el-date-picker
      v-model="value2"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>

       <el-button type="success" @click="exportExcel" class="upload">导出Excel<i class="el-icon-download"></i></el-button>
    </div>
    <!-- /表格头 -->

    <!-- 表格内容 -->
    <div class="tableContent">
        <el-table
            v-loading="loading"
            border
            :data="tableData"
            stripe
            style="width: 100%"
            id="aa">

            <!-- 
                label 列名称
                width 列宽度
                prop  列填充数据（先不管等接口请求
             -->

            <el-table-column label="订单编号" width="200"  align="center" prop="order_number">
               
            </el-table-column>

             <el-table-column label="订单状态" width="100"  align="center">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.order_pay === '1'">已付款</el-tag>
                    <el-tag type="danger" v-if="scope.row.order_pay === '0'">未付款</el-tag>
                </template>
            </el-table-column>

            <el-table-column label="订单总价" width="150" align="center" prop="order_price">
            </el-table-column>

            <el-table-column label="购买用户" width="150"  align="center" prop="user_id">
            </el-table-column>

            <el-table-column label="是否发货" width="100"  align="center" prop="is_send">
              
            </el-table-column>

            <el-table-column
            fixed="right"
            label="操作">
                <template slot-scope="scope"> 
                <!-- scope.row 代表当前行数据 -->
                    <el-button @click="handleEdit(scope.row)"  size="mini" type="danger" icon="el-icon-edit"></el-button>
                    
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
        :page-sizes="[5, 200, 300, 400]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </div>
    <!-- /表格分页 -->

    <!-- 其他 -->
    <el-dialog
      title="编辑订单状态"
      :model="editFormData"
      :visible.sync="isShowEditTk"
      width="30%"
      :before-close="handleClose">
      <el-form label-width="90px">
        <el-form-item label="订单支付">
          <el-input v-model="editFormData.order_pay"></el-input>
        </el-form-item>

        <el-form-item label="订单价格">
          <el-input v-model="editFormData.order_price"></el-input>
        </el-form-item>

        <el-form-item label="订单数量">
          <el-input v-model="editFormData.order_number"></el-input>
        </el-form-item>

        <el-form-item label="发货状态">
          <el-input v-model="editFormData.is_send"></el-input>
        </el-form-item>


      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowEditTk = false">取 消</el-button>
        <el-button type="primary" @click="submitFn">确 定</el-button>
      </span>
    </el-dialog>
    
    <!-- /其他 -->
</div>
</template>
<script>
import {getOrdersApi,putOrdersApi} from '@/api'
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
    methods: {
      exportExcel() {
      alert("开始打印");
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector("#aa"));
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "订单列表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
         submitFn(editFormData) {
      console.log(this.editFormData);
      putOrdersApi(this.editFormData, this.newId).then(res => {
        console.log(res);
        console.log(this.editFormData);
        if (res.meta.status == 201) {
          this.$message.success("修改成功");
          this.initData();
          this.isShowEditTk = false;
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },
      // 删除
      open() {
        this.$alert('物流状态', '已发货', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      //编辑按钮传参
      handleEdit( row) {
          //显示模型数据
          this.tableData.name=row.name;
          //显示修改弹框
          this.isShowEditTk = true;
          this.editFormData = {
        order_number: row.order_number,
        id: row.order_id,
        is_send: row.is_send,
        order_pay: row.order_pay,
        order_price: row.order_price,
        pay_status:row.pay_status
        
      };
        console.log( row);
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        val = this.pagesize;
        this.initData()
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
        //   console.log('this is clode')
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
          getOrdersApi({
              pagesize: this.pagesize,
              pagenum: this.pagenum,
          }).then(res=>{
              console.log(res);
              this.total = res.data.goods.length
              this.tableData = res.data.goods
          })
        

      }

    },
    created() {
        this.initData()
    },
    data() {
        return {
        editFormData: {
        order_number: "",
        order_price: "",
        is_send: "",
        order_pay: "",
        pay_status:'',
        pics: [
          // {"pic":"/tmp_uploads/30f08d52c551ecb447277eae232304b8"}
        ]
      },
            //日期数据
            total:0,
            pagenum:1,
            pagesize:5,
            pickerOptions: {
            shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: '',
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
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
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
    .upload{
      margin-left: 20px;
    }
    
}
</style>