<template>
  <div ref="container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, toRef, watch } from 'vue'
import type { PropType } from 'vue'

import { Chart } from '@antv/g2'

export default defineComponent({
  name: 'BarChart',
  components: {},
  props: {
    countData: {
      type: Array as PropType<any>
    }
  },
  setup(props) {
    const container = ref()
    let chart: Chart
    const data = toRef(props, 'countData')
    // const data = [
    //   { depart: '总人数', total: 390 },
    //   { depart: '维修部', total: 38 },
    //   { depart: '秘书部', total: 52 },
    //   { depart: '项目部', total: 61 },
    //   { depart: '实践部', total: 145 },
    //   { depart: '外联部', total: 48 },
    //   { depart: '网宣部', total: 38 },
    //   { depart: '网络组', total: 38 }
    // ]
    const initChart = () => {
      chart = new Chart({
        container: container.value,
        autoFit: true,
        height: 400
      })
      chart.data(data.value)
      chart.scale('total', {
        alias: '总人数',
        nice: true
      })
      chart.tooltip({
        showMarkers: false
      })
      chart.interaction('active-region')
      chart.interval().position('depart*total')
      chart.line().position('depart*total').color('#9AD681').shape('dash').label('total')
      chart.render()
    }
    watch(data.value, () => {
      chart.changeData(data.value)
    })
    onMounted(() => {
      initChart()
    })
    onUnmounted(() => {
      chart.destroy()
    })
    return {
      container
    }
  }
})
</script>

<style lang="less" scoped></style>
