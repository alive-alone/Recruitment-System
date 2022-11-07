<template>
  <el-container>
    <el-header>
      <Steps :index="activeIndex"></Steps>
    </el-header>
    <el-main class="el-main">
      <Index @advance="advance"></Index>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Steps, Index } from '@/components/admin/index'

import { proAdvanceRequest } from '@/service/admin/admin'
import { getCurProgress } from '@/service/login/login'
import router from '@/router'

import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'Rteps',
  components: { Steps, Index },
  setup() {
    let activeIndex = ref<number>(0)
    const getProgress = async () => {
      const result = await getCurProgress()
      if (result.code === 200) {
        activeIndex.value = advanceTransform(result.data)
      } else if (result.code == 403) {
        router.push('/login')
      }
    }
    const advance = async () => {
      const advResult = await proAdvanceRequest()
      console.log(advResult)
      if (advResult.code === 200) {
        activeIndex.value = advanceTransform(advResult.data)
        ElMessage({
          message: '总进度推进成功！',
          type: 'success'
        })
      }
    }
    const advanceTransform = (index: number) => {
      let value = 0
      switch (index) {
        case 10:
          value = 0
          break
        case 20:
          value = 1
          break
        case 30:
          value = 2
          break
        case 40:
          value = 3
          break
        case 50:
          value = 4
          break
        default:
          value = 0
      }
      return value
    }
    onMounted(() => {
      getProgress()
    })
    return {
      activeIndex,
      advance,
      getProgress
    }
  }
})
</script>

<style lang="less" scoped>
.el-main {
  text-align: center;
  .advance-btn {
    margin-top: 20px;
  }
}
</style>
