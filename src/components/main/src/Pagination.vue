<template>
  <el-pagination
    v-model:currentPage="currentPage"
    background
    :page-size="pageSize"
    layout="total, prev, pager, next"
    :total="listTotal"
    @current-change="handleSizeChange"
  />
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue'

export default defineComponent({
  name: 'Pagination',
  components: {},
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number
    }
  },
  emits: ['changePage'],
  setup(props, ctx) {
    let listTotal = toRef(props, 'total')
    let currentPage = ref<number>(1)
    const handleSizeChange = (value: number) => {
      currentPage.value = value
      ctx.emit('changePage', value)
    }
    return {
      currentPage,
      listTotal,
      handleSizeChange
    }
  }
})
</script>
