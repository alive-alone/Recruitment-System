<template>
  <div class="not-found">
    <el-empty class="empty" description="404 Not Found" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'notFound',
  components: {}
})
</script>

<style lang="less" scoped>
.not-found {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
