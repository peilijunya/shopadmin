<template>
  <div>
   
  <span  :class="isFullscreen?'iconfont icon-quanping':'iconfont icon-sousuo'" @click="click" ></span>
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-sousuo {
  line-height: 0px;
  
  cursor: pointer;
  color: red;
  background-color: aqua;
  width: 50px;
  height: 50px;
  font-size: 50px;
  // vertical-align: 10px;
}
</style>
