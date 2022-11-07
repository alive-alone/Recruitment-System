<template>
  <div ref="scrollbarRef">
    <el-scrollbar class="resume-list" :height="height">
      <template v-if="interList.length !== 0">
        <el-card
          shadow="hover"
          v-for="item in interList"
          :key="item.stuId"
          @click="InterCardClick(item.stuId)"
          :class="getStatus(item.status)"
        >
          <el-descriptions :title="item.name" size="small" :column="isAdjust ? 2 : 3">
            <el-descriptions-item v-if="!isAdjust" label="性别">{{ getSex(item.gender) }}</el-descriptions-item>
            <el-descriptions-item v-if="!isAdjust" label="第一意向部门">
              <el-tag size="small">{{ getDepart(item.firstDept) }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item v-if="!isAdjust" label="第二意向部门">
              <el-tag size="small" type="warning">{{ getDepart(item.secondDept) }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="学号">{{ item.stuId }}</el-descriptions-item>
            <el-descriptions-item v-if="isAdjust" label="调剂部门">
              <el-tag size="small">{{ getDepart(item.adjustDept) }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="学院">{{ getCollege(item.college) }}</el-descriptions-item>
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
import { computed, defineComponent, onMounted, ref, toRef, onUnmounted } from 'vue'
import { getDomDistance } from '@/assets/ts/DomOperate/getDomDistance'
import { debounce } from '@/assets/ts/FunOperate/index'
import { getSex, getDepart, getCollege } from '@/assets/ts/data-config'

export default defineComponent({
  name: 'ResumeList',
  components: {},
  emits: ['navigateTo'],
  props: {
    resumeList: {
      type: Array
    },
    isTrue: {
      type: Boolean
    }
  },
  setup(props, ctx) {
    let isAdjust = toRef(props, 'isTrue')
    let interList = toRef(props, 'resumeList')
    const scrollbarRef = ref()
    let height = ref<number>(500)

    const getHeight = () => {
      height.value = getDomDistance(scrollbarRef.value, 0, 80)
    }
    const InterCardClick = (stuId: string) => {
      ctx.emit('navigateTo', stuId)
    }
    const getStatus = computed(() => (status: number) => {
      let value = 'card-unsigned'
      switch (status) {
        case 0:
          value = 'card-unsigned'
          break
        case 1:
          value = 'card-signed'
          break
        case 2:
          value = 'card-interview'
          break
        case 3:
          value = 'card-adjust'
          break
        case -1:
          value = 'card-failed'
          break
        case -2:
          value = 'card-failed'
          break
        case 4:
          value = 'card-pass'
          break
        case 10:
          value = 'card-success'
          break
      }
      return value
    })
    onMounted(() => {
      getHeight()
      window.addEventListener('resize', debounce(getHeight, 500, true), false)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', debounce(getHeight, 300, true), false)
      window.onresize = null
    })
    return {
      height,
      scrollbarRef,
      interList,
      isAdjust,
      getStatus,
      InterCardClick,
      getSex,
      getDepart,
      getCollege,
      getHeight
    }
  }
})
</script>
<style lang="less" scoped>
.resume-list {
  ::v-deep(.el-card__body) {
    padding: 10px 10px 0 !important;
  }
  .el-card {
    margin-bottom: 10px;
  }
  // 未签到
  .card-unsigned {
    border-left: 6px solid black;
  }
  // 已签到
  .card-signed {
    border-left: 6px solid rgb(94, 169, 255);
  }
  // 面试中
  .card-interview {
    border-left: 6px solid rgb(255, 255, 89);
  }
  // 被调剂
  .card-adjust {
    border-left: 6px solid rgb(231, 150, 0);
  }
  // 未通过
  .card-failed {
    border-left: 6px solid rgb(255, 40, 40);
  }
  // 通过
  .card-pass {
    border-left: 6px solid rgb(203, 112, 248);
  }
  // 最终录用
  .card-success {
    border-left: 6px solid rgb(121, 248, 112);
  }
  .hidden {
    display: none;
    color: aqua;
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
