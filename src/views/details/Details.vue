<template>
  <div class="details">
    <el-container>
      <el-main class="el-main">
        <el-card shadow="hover" ref="elCard" class="el-card">
          <UserInfo class="user-info" :userInfo="userInfo"></UserInfo>
          <el-divider />
          <div class="comment-box">
            <span class="comment">评论</span>
            <div>
              <el-button @click="getCommentList" class="refresh-btn" type="primary" plain>刷新</el-button>
              <el-button type="primary" @click="addComment">添加评论</el-button>
            </div>
          </div>
          <CommentList ref="comment_list" :commentList="commentList"></CommentList>
          <div class="inter-result">
            <el-button color="#626aef" @click="sendInvite">邀请面试</el-button>
            <div>
              <el-button type="danger" @click="showAdjust">调剂该面试者</el-button>
              <el-button type="success" @click="passInterview">通过本次面试</el-button>
            </div>
          </div>
        </el-card>
        <Comment ref="commentRef" @submit="comSubmit"></Comment>
        <Adjust ref="adjustRef" @submit="adjustSubmit"></Adjust>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

import {
  getComments,
  getDetailInfo,
  postComment,
  putInviteInter,
  putInterAdjust,
  putAdjustInviteInter,
  putFirPassInter,
  putSecPassInter
} from '@/service/details/details'
import { CommentsType, DetailsDataType } from '@/service/details/types'

import { UserInfo, CommentList, Comment, Adjust } from '@/components/details/index'

export default defineComponent({
  name: 'Details',
  components: { UserInfo, CommentList, Comment, Adjust },
  setup() {
    const comment_list = ref()
    const router = useRouter()
    const routeInfo = router.currentRoute.value.query.stuId
    const isAdjust = Number(router.currentRoute.value.query.isAdjust)
    let userInfo = ref<DetailsDataType>()
    let commentList = ref<CommentsType[]>([])
    const commentRef = ref<InstanceType<typeof Comment>>()
    const adjustRef = ref<InstanceType<typeof Adjust>>()
    // 添加评论
    const addComment = () => {
      commentRef.value?.changeDrawer(true)
    }
    // 关闭
    const closeComment = () => {
      commentRef.value?.changeDrawer(false)
    }
    // 提交评论
    const comSubmit = (comInfo: any) => {
      ElMessageBox.confirm('提交评论后无法撤回，确认提交？', '提示', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await postComment({ ...comInfo, stuId: `${routeInfo}` })
        if (result.code == 200) {
          ElMessage({
            message: '提交评论成功',
            type: 'success'
          })
        }
        getCommentList()
      })
    }
    // 获取面试者详细信息
    const getUserInfo = async () => {
      const infoResult = await getDetailInfo(`${routeInfo}`)
      if (infoResult.code === 200) {
        userInfo.value = infoResult.data
      }
      nextTick(() => {
        comment_list.value?.getHeight()
      })
    }
    // 获取所有评论
    const getCommentList = async () => {
      const comResult = await getComments(`${routeInfo}`)
      if (comResult.code === 200) {
        commentList.value = comResult.data
      }
    }
    // 邀请面试
    const sendInvite = async () => {
      ElMessageBox.confirm('邀请后无法撤回，确认邀请？', '提示', {
        confirmButtonText: '邀请',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = isAdjust ? await putAdjustInviteInter(`${routeInfo}`) : await putInviteInter(`${routeInfo}`)
        if (result.code === 200) {
          ElMessage({
            message: '邀请成功',
            type: 'success'
          })
        }
      })
    }
    // 通过本次面试
    const passInterview = async () => {
      ElMessageBox.confirm('通过后无法撤回，确认通过？', '提示', {
        confirmButtonText: '通过',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let result
        if (!isAdjust) {
          result = await putFirPassInter(`${routeInfo}`)
        } else {
          result = await putSecPassInter(`${routeInfo}`)
        }
        if (result.code === 200) {
          ElMessage({
            message: '已通过',
            type: 'success'
          })
        }
      })
    }
    // 显示调剂页面
    const showAdjust = () => {
      adjustRef.value?.changeDrawer(true)
    }
    // 确认调剂
    const adjustSubmit = async (dept: number) => {
      if (isAdjust) {
        ElMessage({
          message: '该面试者已被调剂，无法再次调剂',
          type: 'warning'
        })
      } else {
        ElMessageBox.confirm('调剂后无法后无法撤回，确认提交？', '提示', {
          confirmButtonText: '调剂',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const result = await putInterAdjust({ stuId: `${routeInfo}`, dept: dept })
          if (result.code == 200) {
            adjustRef.value?.changeDrawer(false)
            ElMessage({
              message: '调剂成功',
              type: 'success'
            })
          }
        })
      }
    }
    onMounted(() => {
      getUserInfo()
      getCommentList()
    })
    return {
      comment_list,
      commentRef,
      adjustRef,
      userInfo,
      commentList,
      addComment,
      closeComment,
      comSubmit,
      getCommentList,
      sendInvite,
      passInterview,
      adjustSubmit,
      showAdjust
    }
  }
})
</script>
<style lang="less" scoped>
.el-main {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  min-width: 800px;
  .el-card {
    width: 80%;
    ::v-deep(.el-card__body) {
      padding: 20px 20px 0 20px;
    }
    .comment-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
      .comment {
        font-size: 18px;
        font-weight: bold;
        margin: 0;
        margin-bottom: 10px;
      }
    }
    .inter-result {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
