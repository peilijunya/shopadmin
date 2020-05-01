<template>
  <div class="goods">
    <!-- hello -->

    <!-- 表格头 -->
    <div class="tableHeader">
      <el-input placeholder="请输入内容" class="search">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <span class="mr10"></span>
      <el-button type="success">添加商品</el-button>
      <el-button type="success" @click="exportExcel">导出Excel<i class="el-icon-download"></i>
      </el-button>
    </div>
    <!-- /表格头 -->

    <!-- 表格内容 -->
    <div class="tableContent">
      <el-table  v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)" border :data="tableData" stripe style="width: 100%" id="aa">
        <!-- 
                label 列名称
                width 列宽度
                prop  列填充数据（先不管等接口请求
        -->

        <el-table-column label="编号" width="50" align="center" prop="goods_id"></el-table-column>

        <el-table-column prop="goods_name" label="商品名称" width="580"></el-table-column>

        <el-table-column label="商品价格" width="80" align="center" prop="goods_price"></el-table-column>

        <el-table-column label="是否上架" width="80" align="center">
         <el-switch active-color="#13ce66" inactive-color="#666" prop="is_promote"></el-switch>
        </el-table-column>

        <el-table-column label="是否推荐" width="80" align="center">
         <el-switch active-color="#13ce66" inactive-color="#666" prop="is_promote"></el-switch>
        </el-table-column>

        <el-table-column label="是否热卖" width="80" align="center">
          <el-switch active-color="#13ce66" inactive-color="#666" prop="is_promote"></el-switch>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- scope.row 代表当前行数据 -->
            <el-button @click="handleEdit(scope.row)" size="mini" type="danger" icon="el-icon-edit"></el-button>
            <el-button
              @click="deleteFn(scope.row.goods_id)"
              size="mini"
              type="info"
              icon="el-icon-delete-solid"
            ></el-button>
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
        :page-sizes="[15, 200, 300, 400]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDataTotal"
      ></el-pagination>
    </div>
    <!-- /表格分页 -->

    <!-- 其他 -->
    <el-dialog
      title="编辑商品"
      :model="editFormData"
      :visible.sync="isShowEditTk"
      width="30%"
      :before-close="handleClose">

      <el-form label-width="90px">
        <el-form-item label="商品名称">
          <el-input v-model="editFormData.goods_name"></el-input>
        </el-form-item>

        <el-form-item label="商品价格">
          <el-input v-model="editFormData.goods_price"></el-input>
        </el-form-item>

        <el-form-item label="商品数量">
          <el-input v-model="editFormData.goods_number"></el-input>
        </el-form-item>

        <el-form-item label="商品重量">
          <el-input v-model="editFormData.goods_weight"></el-input>
        </el-form-item>

        <el-form-item label="商品分类">
          <el-cascader
            :options="options"
            :props="optionsField"
            v-model="selectedOptions"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>

      <el-upload
        class="upload-demo"
        action="http://localhost:8888/api/private/v1/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        list-type="picture"
        :headers="setHeaders"
        :on-success="uploadImgFn"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowEditTk = false">取 消</el-button>
        <el-button type="primary" @click="submitFn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- /其他 -->
  </div>
</template>
<script>
import { getGoodsApi, getGoodsCateApi } from "@/api";
import { deleteGoodsApi } from "@/api";
import { putGoodsApi } from "@/api";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  methods: {
    //图片上传成功
    uploadImgFn(response,file,fileList){
      this.addFormData.pics.push({
        pic:response.meta.status.tmp.path
      })

    },
    submitFn(editFormData) {
      console.log(this.editFormData);
      putGoodsApi(this.editFormData, this.newId).then(res => {
        console.log(res);
        console.log(this.editFormData);
        if (res.meta.status == 200) {
          this.$message.success("修改成功");
          this.initData();
          this.isShowEditTk = false;
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },
    exportExcel() {
      alert("fdajsfguia");
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
          "商品列表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },

    // 删除
    deleteFn(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteGoodsApi(id).then(res => {
            if (res.meta.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              //记录总页数,
              //此时已经实现删除操作，所以total的值需要减1，Math.ceil是向上取整，保证始终大于等于1
              const totalPages = Math.ceil(
                (this.tableDataTotal - 1) / this.pagesize
              );
              //  console.log(totalPages)
              //记录当前页码
              //记住删除最后一条数据时当前码是最后一页
              const pagenum =
                this.pagenum > totalPages ? totalPages : this.pagenum;
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
    handleEdit(row) {
      getGoodsCateApi(3).then(res => {
        console.log(res);
        this.options = res.data;
      });
      this.editFormData = {
        goods_name: row.goods_name,
        id: row.goods_id,
        goods_number: row.goods_number,
        goods_weight: row.goods_weight,
        goods_price: row.goods_price,
        goods_cat: "1,1"
      };
      //显示模型数据
      //显示修改弹框
      this.newId = row.goods_id;
      this.isShowEditTk = true;
      console.log(row);
    },
    // 分页
    handleSizeChange(val) {
      // 1. 改变模型数据
      this.pagesize = val;
      // 2. 重新发送异步请求
      this.initData();
    },
    handleCurrentChange(val) {
      // 1. 改变模型数据
      this.pagenum = val;
      // 2. 重新发送异步请求即可
      this.initData();
    },
    // 弹框
    handleChange(value) {
      console.log(value);
      this.addFormData.goods_cat = value.join(",");
    },
    handleClose() {
      //   console.log('this is clode')
      this.isShowEditTk = false;
    },
    // 上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    initData() {
      getGoodsApi({
        pagesize: this.pagesize,
        pagenum: this.pagenum,
        query: this.query
      }).then(res => {
        console.log(res);
        // 数据同步到模型，模型改变同步到视图
        this.tableData = res.data.goods;
        this.tableDataTotal = res.data.total;
      });
    }
  },
  created() {
    this.initData();
  },
  data() {
    return {
      loading: true,
      setHeaders:{
        Authorization:localStorage.getItem('token')
      },
      editFormData: {
        goods_name: "",
        goods_price: "", 
        goods_number: "",
        goods_weight: "",
        goods_cat: "1,1",
        pics: [
          
        ]
      },
      newId: 0,
      value: true,
      is_promote: false,
      //查询条件
      pagesize: 15,
      pagenum: 1,
      query: "",
      tableDataTotal: 0,
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
      tableData: [{}],
      optionsField: {
        // 声明后期接口获取的数据用哪个字段填充数据
        value: "cat_id",
        label: "cat_name"
      },
      // 联级选择器数据
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      selectedOptions: [],
      selectedOptions2: [],
      // 联级选择器结束

      // 上传图片
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
// goods
.goods {
  width: 96%;
  margin: auto;
  .el-table {
    height: 600px;
    overflow: scroll;
  }
  // tableHeader
  .tableHeader {
    width: 100%;
    padding: 10px 0px;
    background: #fff;

    // search
    .search {
      width: 300px;
    }
  }

  // tableContent
  .tableContent {
    margin: 10px 0px;
  }
  // tablePage
  .tablePage {
    width: 100%;
    padding: 10px 0px;
    background: #fff;
  }
}
</style>