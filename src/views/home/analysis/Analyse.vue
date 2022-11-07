<template>
  <el-container>
    <el-header height="100px">
      <div class="header">
        <div>
          <el-select v-model="selectValue" @change="changeSelect" class="m-2" placeholder="Select">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <Steps class="steps" :index="activeIndex"></Steps>
      </div>
    </el-header>
    <el-main>
      <div class="analyse">
        <div class="bar-chart">
          <BarChart :countData="Data"></BarChart>
        </div>
        <div class="pie-chart">
          <PieChart :countData="Data.slice(1)"></PieChart>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, onUnmounted, ref } from 'vue'
import router from '@/router'

import BarChart from './BarChart.vue'
import PieChart from './PieChart.vue'
import { Steps } from '@/components/admin/index'

import { getDeptPeopleCount, getStatePeopleCount } from '@/service/main/main'
import { getCurProgress } from '@/service/login/login'

export default defineComponent({
  name: 'Analyse',
  components: { BarChart, PieChart, Steps },
  setup() {
    let selectValue = ref('1')
    let activeIndex = ref(0)
    const options = [
      {
        value: '1',
        label: '部门数据'
      },
      {
        value: '2',
        label: '状态数据'
      }
    ]
    const countData = ['总人数', '维修部', '秘书部', '项目部', '实践部', '外联部', '网宣部', '网络组']
    const stateData = ['总人数', '未通过', '未签到', '已签到', '面试中', '被调剂', '通过', '最终通过']
    let Data = reactive([
      { depart: '总人数', total: 462, percent: 1 },
      { depart: '维修部', total: 66, percent: 0.1428 },
      { depart: '秘书部', total: 66, percent: 0.1428 },
      { depart: '项目部', total: 66, percent: 0.1428 },
      { depart: '实践部', total: 66, percent: 0.1428 },
      { depart: '外联部', total: 66, percent: 0.1428 },
      { depart: '网宣部', total: 66, percent: 0.1428 },
      { depart: '网络组', total: 66, percent: 0.1428 }
    ])
    const changeSelect = () => {
      getCount()
    }
    const getProgress = async () => {
      const result = await getCurProgress()
      if (result.code === 200) {
        activeIndex.value = advanceTransform(result.data)
      } else if (result.code == 403) {
        router.push('/login')
      }
    }
    const getCount = async () => {
      let result
      if (selectValue.value == '1') {
        result = await getDeptPeopleCount()
      } else {
        result = await getStatePeopleCount()
      }
      if (result.code == 200) {
        computePercent(result.data)
      }
    }
    const computePercent = (data: number[]) => {
      let total = data[0]
      if (total > 0) {
        for (let i = 0; i < Data.length; i++) {
          Data[i].depart = selectValue.value == '1' ? countData[i] : stateData[i]
          Data[i].total = data[i]
          Data[i].percent = Math.round((data[i] / total) * 1000) / 1000
        }
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
      window.onresize = null
      getCount()
      getProgress()
    })
    return {
      countData,
      stateData,
      selectValue,
      options,
      activeIndex,
      Data,
      changeSelect
    }
  }
})
</script>

<style lang="less" scoped>
.title {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.analyse {
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .bar-chart {
    width: 600px;
  }
  .pie-chart {
    width: 700px;
  }
}
.header {
  display: flex;
  align-items: center;
  height: 100%;
  .steps {
    flex: 1;
  }
}
</style>
