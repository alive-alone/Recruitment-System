<template>
  <div class="tabs">
    <el-tabs tab-position="left" style="height: 200px" class="demo-tabs">
      <el-tab-pane label="进度推进">
        <slot name="advance"></slot>
      </el-tab-pane>
      <el-tab-pane label="发送提醒">
        <slot name="send"></slot>
      </el-tab-pane>
      <el-tab-pane label="获取名单">
        <slot name="gain"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Tabs',
  components: {}
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
.tabs {
  ::v-deep(.el-tabs__header) {
    width: 250px;
    .el-tabs__item {
      font-size: 16px;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
