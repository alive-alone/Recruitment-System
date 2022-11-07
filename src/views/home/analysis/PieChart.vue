<template>
  <div ref="container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onUnmounted, toRef, watch } from 'vue'
import type { PropType } from 'vue'

import { Chart } from '@antv/g2'

export default defineComponent({
  name: 'PieChart',
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
    //   { depart: '维修部', percent: 0.1 },
    //   { depart: '秘书部', percent: 0.1 },
    //   { depart: '项目部', percent: 0.1 },
    //   { depart: '实践部', percent: 0.2 },
    //   { depart: '外联部', percent: 0.2 },
    //   { depart: '网宣部', percent: 0.2 },
    //   { depart: '网络组', percent: 0.1 }
    // ]
    const initChart = () => {
      chart = new Chart({
        container: container.value,
        autoFit: true,
        limitInPlot: false,
        height: 300
      })
      chart.coordinate('theta', {
        radius: 0.7
      })
      chart.data(data.value)
      chart.scale('percent', {
        formatter: (val) => {
          val = Math.round(val * 1000) / 10 + '%'
          return val
        }
      })
      chart.tooltip({
        showTitle: false,
        showMarkers: false
      })
      chart
        .interval()
        .position('percent')
        .color('depart')
        .label('percent', {
          layout: [{ type: 'limit-in-plot', cfg: { action: 'ellipsis' } }],
          content: (data) => {
            return `${data.depart}: ${Math.round(data.percent * 1000) / 10}%`
          }
        })
        .adjust('stack')

      chart.interaction('element-active')
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
