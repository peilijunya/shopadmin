<template>
  <div class="goodsAdd">
    <!-- hello -->

    <!-- tabs标签页 -->
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <el-form label-width="120px">
          <el-form-item label="商品名称">
            <el-input v-model="addFormData.goods_name"></el-input>
          </el-form-item>

          <el-form-item label="商品价格">
            <el-input v-model="addFormData.goods_price"></el-input>
          </el-form-item>

          <el-form-item label="商品数量">
            <el-input v-model="addFormData.goods_number"></el-input>
          </el-form-item>

          <el-form-item label="商品重量">
            <el-input v-model="addFormData.goods_weight"></el-input>
          </el-form-item>

           <el-form-item label="商品分类">
                    <el-cascader
                        :options="options"
                        :props="optionsField"
                        v-model="selectedOptions"
                        @change="handleChange">
                    </el-cascader>
                </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-success" @click="submitFn">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="相册管理">
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
      </el-tab-pane>
    </el-tabs>
    <!-- /tabs标签页 -->
  </div>
</template>
<script>
import { postGoodsApi, getGoodsCateApi } from "@/api";
export default {
    created() {
      getGoodsCateApi(3).then(res => {
        console.log(res)
        this.options = res.data;
      });
    },
  methods: {
    uploadImgFn(response,file,fileList){
      console.log(response)
      this.addFormData.pics.push({
        pic:response.meta.status.tmp_path
      })

    },
    submitFn() {
      postGoodsApi(this.addFormData).then(res => {
          console.log(res)
        if (res.meta.status == 201) {
          this.$message.success("添加成功");
          this.$router.push({ path: "/goodsList" });
        } else {
          this.$message.error(res.meta.msg);
        }
      });
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
    }
  },
  data() {
    return {
      setHeaders:{
        Authorization:localStorage.getItem('token')
      },
      addFormData: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_cat: "1,1,1",

        pics: [
          // {"pic":"/tmp_uploads/30f08d52c551ecb447277eae232304b8"}
        ]
      },
      optionsField: {
                // 声明后期接口获取的数据用哪个字段填充数据
                value: 'cat_id',
                label: 'cat_name'
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
        
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
// create
.goodsAdd {
  width: 96%;
  margin: auto;
}
</style>