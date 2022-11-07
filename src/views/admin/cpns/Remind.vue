<template>
  <div class="remind">
    <div class="select">
      <el-select v-model="notifySelect" placeholder="Select" size="large">
        <el-option v-for="(item, index) in notifyOptions" :key="index" :label="item" :value="index" />
      </el-select>
      <el-button type="danger" plain size="large" @click="sendRequest(1)">发送提醒</el-button>
    </div>
    <div class="select">
      <el-select v-model="resultSelect" placeholder="Select" size="large">
        <el-option v-for="(item, index) in resultOptions" :key="index" :label="item" :value="index" />
      </el-select>
      <el-button type="success" plain size="large" @click="sendRequest(2)">发送结果</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'

import {
  firstNotifyRequest,
  secondNotifyRequest,
  writeNotifyRequest,
  firstResultRequest,
  secondResultRequest
} from '@/service/admin/admin'

export default defineComponent({
  name: 'Rteps',
  components: {},
  setup() {
    let notifySelect = ref(0)
    let resultSelect = ref(0)
    const notifyOptions = reactive(['一面提醒', '笔试提醒', '二面提醒'])
    const resultOptions = reactive(['一面结果', '二面结果'])
    const sendRequest = async (type: number) => {
      ElMessageBox.confirm(
        `发送${
          type === 1 ? notifyOptions[notifySelect.value] : resultOptions[resultSelect.value]
        }后无法撤回，确认发送？`,
        '提示',
        {
          confirmButtonText: '发送',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(async () => {
        let result
        if (type === 1) {
          switch (notifySelect.value) {
            case 0:
              result = await firstNotifyRequest()
              break
            case 1:
              result = await writeNotifyRequest()
              break
            case 2:
              result = await secondNotifyRequest()
              break
          }
        } else if (type === 2) {
          switch (resultSelect.value) {
            case 0:
              result = await firstResultRequest()
              break
            case 1:
              result = await secondResultRequest()
              break
          }
        }
        if (result && result.code == 200) {
          console.log(result)
          ElMessage({
            message: '发送成功！',
            type: 'success'
          })
        }
      })
    }

    return {
      notifySelect,
      resultSelect,
      notifyOptions,
      resultOptions,
      sendRequest
    }
  }
})
</script>

<style lang="less" scoped>
.remind {
  width: 100%;
  display: flex;
  flex-direction: row;
  .select {
    padding: 0 20px;
  }
}
</style>
