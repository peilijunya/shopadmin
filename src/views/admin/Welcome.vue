<template>
  <div class="dashboard-editor-container">


    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import Driver from "driver.js" // import driver.js
import "driver.js/dist/driver.min.css" // import driver.js css
import steps from "@/vendor/guide"


const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
//   name: 'DashboardAdmin',
   name:'guide',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,

  },
  data() {
      
    return {
      lineChartData: lineChartData.newVisitis,
       driver: null
    }
  },
  mounted() {
    this.$nextTick(function () {
        this.driver = new Driver({
            doneBtnText: "完成", //结束按钮的文字
            stageBackground: "#ffffff", //突出显示元素的背景颜色
            nextBtnText: "下一步", //下一步按钮的文字
            prevBtnText: "上一步", //上一步按钮的文字
            closeBtnText: "关闭", //关闭按钮的文字
            animate: true, // Animate while changing highlighted element
            opacity: 0.75, // Background opacity (0 means only popovers and without overlay)
            padding: 10, // Distance of element from around the edges
            allowClose: true, // Whether clicking on overlay should close or not
            overlayClickNext: false, // Should it move to next step on overlay click


        });
        this.driver.defineSteps(steps);
        this.driver.start()
    })
},
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },

  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  margin-bottom: 50px;
  height: 800px;
  overflow: scroll;
  

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
