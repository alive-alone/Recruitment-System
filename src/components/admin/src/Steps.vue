<template>
  <div class="steps">
    <el-steps :active="activeIndex" align-center finish-status="success">
      <el-step title="报名阶段" />
      <el-step title="一面阶段" />
      <el-step title="笔试阶段" />
      <el-step title="二面阶段" />
      <el-step title="招新结束" />
    </el-steps>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'

export default defineComponent({
  name: 'Steps',
  components: {},
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    let activeIndex = toRef(props, 'index')
    return {
      activeIndex
    }
  }
})
</script>

<style lang="less" scoped>
.resume-list {
  .el-menu-vertical-demo {
    .el-menu-span {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
