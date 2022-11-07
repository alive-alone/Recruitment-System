<template>
  <div ref="container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

import { Chart } from '@antv/g2'

export default defineComponent({
  name: 'BarChart',
  components: {},
  setup() {
    const container = ref()
    let chart: Chart
    const data = [
      { depart: '', type: '未签到', value: 20 },
      { depart: '', type: '已签到', value: 100 }
    ]
    const initChart = () => {
      chart = new Chart({
        container: container.value,
        autoFit: true,
        height: 50
      })
      chart.data(data)
      chart.axis('depart', {
        tickLine: null,
        line: null
      })
      chart.axis('value', {
        label: null,
        grid: null
      })
      chart.legend(false)
      chart.coordinate('rect').transpose()
      chart.tooltip({
        shared: true,
        showMarkers: false
      })
      // chart.interaction('active-region')
      chart
        .interval()
        .adjust('stack')
        .position('depart*value')
        .color('type*depart', (type, depart): any => {
          if (type === '已签到') {
            return 'rgb(94, 169, 255)'
          }
          if (type === '未签到') {
            return 'rgb(0, 0, 0)'
          }
        })
        .size(26)
        .label('value*type', (val, t) => {
          const color = 'white'
          if (val < 0.05) {
            return null
          }
          return {
            position: 'middle',
            offset: 0,
            style: {
              fontSize: 12,
              fill: color,
              lineWidth: 0,
              stroke: null,
              shadowBlur: 2,
              shadowColor: 'rgba(0, 0, 0, .45)'
            }
          }
        })
      chart.render()
    }
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
