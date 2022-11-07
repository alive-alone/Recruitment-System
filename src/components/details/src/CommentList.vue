<template>
  <div ref="commentListRef" v-if="comment_list">
    <el-scrollbar :height="height">
      <el-timeline v-if="comment_list.length !== 0">
        <el-timeline-item v-for="(activity, index) in comment_list" :key="index" :timestamp="activity.timestamp">
          <p class="comment-depart">{{ activity.interviewer }}</p>
          <div class="comment-content">
            <div class="comment-mark">
              <label>
                评分: <el-tag> {{ activity.mark }} </el-tag>
              </label>
            </div>
            <span>{{ activity.comment }}</span>
          </div>
        </el-timeline-item>
      </el-timeline>
      <template v-else>
        <div class="empty">
          <img alt="empty" class="empty-img" src="@/assets/icon/empty.svg" />
        </div>
      </template>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRef, onUnmounted } from 'vue'
import { getDomDistance } from '@/assets/ts/DomOperate/getDomDistance'
import { debounce } from '@/assets/ts/FunOperate/index'

export default defineComponent({
  name: 'CommentList',
  components: {},
  props: {
    commentList: {
      type: Array
    }
  },
  setup(props) {
    const commentListRef = ref()
    let height = ref<number>(0)
    let comment_list = toRef(props, 'commentList')
    const getHeight = () => {
      height.value = getDomDistance(commentListRef.value, 0, 80)
    }
    onMounted(() => {
      getHeight()
      window.addEventListener('resize', debounce(getHeight, 300, true), false)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', debounce(getHeight, 500, true), false)
    })
    return {
      commentListRef,
      height,
      comment_list,
      getHeight
    }
  }
})
</script>

<style lang="less" scoped>
.comment-depart {
  font-size: 17px;
  font-weight: bold;
  margin: 0;
}
.comment-content {
  padding: 10px;
  letter-spacing: 1px;
  .comment-mark {
    margin-bottom: 2px;
  }
}
.empty {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  .empty-img {
    opacity: 0.4;
  }
}
</style>
