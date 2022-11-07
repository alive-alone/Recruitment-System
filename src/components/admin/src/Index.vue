<template>
  <div class="tabs">
    <el-button class="advance-btn" @click="dialogVisible = true" size="large" type="danger">总进度推进</el-button>
    <el-dialog v-model="dialogVisible" width="30%">
      <span>是否确定推进总进度</span>
      <template #header>
        <el-tag class="el-tag" type="danger" size="large">温馨提示</el-tag>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="advance">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Index',
  components: {},
  emits: ['advance'],
  setup(props, ctx) {
    let dialogVisible = ref<boolean>(false)
    const advance = () => {
      dialogVisible.value = false
      ctx.emit('advance')
    }
    return {
      dialogVisible,
      advance
    }
  }
})
</script>

<style lang="less" scoped>
.el-tag {
  font-size: 16px;
  letter-spacing: 2px;
}
</style>
