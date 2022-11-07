<template>
  <div class="name-list">
    <el-select v-model="selectStatus" size="large">
      <el-option v-for="(item, index) in status" :key="index" :label="item" :value="index"></el-option>
    </el-select>
    <el-select v-model="selectDepar" placeholder="Select" size="large">
      <el-option v-for="(item, index) in options" :key="index" :label="item" :value="index" />
    </el-select>
    <el-button type="primary" plain size="large" @click="exportList">导出</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

import { ElMessage } from 'element-plus'

import {
  getFirListRequest,
  getFinListRequest,
  getNameListApply,
  getNameListFitst,
  getNameListSecond,
  getNameListSecondAdjust
} from '@/service/admin/admin'

export default defineComponent({
  name: 'Rteps',
  components: {},
  setup() {
    let selectDepar = ref(0)
    let selectStatus = ref(0)
    const status = reactive(['报名名单', '一面通过', '二面通过', '调剂名单'])
    const options = reactive(['总名单', '维修部', '秘书部', '项目部', '实践部', '外联部', '网宣部', '网络组'])
    const getFile = (res: Blob) => {
      if (res && res.size != 0) {
        let blob = new Blob([res])
        let url = window.URL.createObjectURL(blob) // 创建 url 并指向 blob
        let a = document.createElement('a')
        a.href = url
        a.download = `${options[selectDepar.value]}.csv`
        a.click()
        window.URL.revokeObjectURL(url) // 释放该 url
      } else {
        ElMessage({
          duration: 1000,
          message: '当前无名单导出/网络连接错误',
          type: 'error'
        })
      }
    }
    const exportList = async () => {
      let result
      if (selectStatus.value == 0) {
        result = await getNameListApply(selectDepar.value).then((res) => {
          getFile(res)
          return res
        })
      } else if (selectStatus.value == 1) {
        result = await getNameListFitst(selectDepar.value).then((res) => {
          getFile(res)
          return res
        })
      } else if (selectStatus.value == 2) {
        result = await getNameListSecond(selectDepar.value).then((res) => {
          getFile(res)
          return res
        })
      } else if (selectStatus.value == 3) {
        result = await getNameListSecondAdjust(selectDepar.value).then((res) => {
          getFile(res)
          return res
        })
      }
    }
    return {
      selectDepar,
      selectStatus,
      options,
      status,
      exportList
    }
  }
})
</script>

<style lang="less" scoped></style>
