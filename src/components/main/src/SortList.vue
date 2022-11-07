<template>
  <div ref="scrollbarRef" class="sort-list">
    <el-scrollbar class="el-scrollbar" :height="height">
      <template v-if="sortList.length != 0">
        <el-card
          class="card-signed"
          shadow="hover"
          v-for="(item, index) in sortList"
          :key="item.stuId"
          @click="InterCardClick(item.stuId)"
        >
          <el-descriptions :title="`${index + 1} ${item.stuName}`" size="small">
            <el-descriptions-item label="学号">{{ item.stuId }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </template>
      <template v-else>
        <div class="empty">
          <img alt="empty" class="empty-img" src="@/assets/icon/empty.svg" />
        </div>
      </template>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef, ref, onMounted, onUnmounted } from 'vue'
import { debounce } from '@/assets/ts/FunOperate/index'
import { getDomDistance } from '@/assets/ts/DomOperate/getDomDistance'

export default defineComponent({
  props: {
    list: {
      type: Array
    }
  },
  emits: ['navigateTo'],
  setup(props, ctx) {
    let scrollbarRef = ref()
    let height = ref<number>(500)
    let sortList = toRef(props, 'list')
    const InterCardClick = (stuId: string) => {
      ctx.emit('navigateTo', stuId)
    }
    const getHeight = () => {
      height.value = getDomDistance(scrollbarRef.value, 0, 90)
    }
    onMounted(() => {
      getHeight()
      window.addEventListener('resize', debounce(getHeight, 500, true), false)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', debounce(getHeight, 300, true))
      window.onresize = null
    })
    return {
      height,
      sortList,
      scrollbarRef,
      InterCardClick
    }
  }
})
</script>

<style scoped lang="less">
.sort-list {
  margin-left: 10px;
  ::v-deep(.el-card__body) {
    padding: 10px 10px 0 !important;
    .el-descriptions__header {
      margin-bottom: 6px;
    }
  }
  .el-card {
    margin-bottom: 10px;
  }
  .card-signed {
    border-left: 3px solid rgb(94, 169, 255);
  }
  .empty {
    width: 100%;
    display: flex;
    justify-content: center;
    .empty-img {
      opacity: 0.4;
    }
  }
}
</style>
