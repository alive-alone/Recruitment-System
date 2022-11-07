<template>
  <div class="resume-list">
    <el-drawer v-model="drawer" :direction="direction" size="30%" @closed="resetFileds">
      <template #default>
        <el-form ref="commentRef" label-width="100px" :rules="rules" :model="commentForm" style="max-width: 460px">
          <el-form-item label="评分" prop="mark">
            <el-slider v-model="commentForm.mark" :max="10" show-stops show-input />
          </el-form-item>
          <el-form-item label="评价" prop="comment">
            <el-input
              v-model="commentForm.comment"
              :autosize="{ minRows: 4, maxRows: 8 }"
              type="textarea"
              placeholder="Please input"
              clearable
            />
          </el-form-item>
          <el-form-item label="评价人" prop="interviewer">
            <el-input size="large" v-model="commentForm.interviewer" @keyup.enter="confirmClick" />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">提交</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'

export default defineComponent({
  name: 'ResumeList',
  components: {},
  emits: ['submit'],
  setup(props, ctx) {
    const commentRef = ref()
    let direction = ref('ltr')
    let drawer = ref(false)
    let rateTexts = reactive([1, 2, 3, 4, 5])
    let rules = reactive({
      mark: [
        {
          required: true
        }
      ],
      interviewer: [
        {
          required: true,
          message: '请输入评价人',
          trigger: ['blur', 'change']
        }
      ]
    })
    let commentForm = reactive({
      mark: 5,
      comment: '',
      interviewer: ''
    })
    const changeDrawer = (value: boolean) => {
      drawer.value = value
    }
    const confirmClick = () => {
      commentRef.value?.validate((valid: boolean) => {
        if (valid) {
          ctx.emit('submit', { ...commentForm })
          drawer.value = false
        }
      })
    }
    const cancelClick = () => {
      drawer.value = false
    }
    const resetFileds = () => {
      commentRef.value?.resetFields()
    }
    return {
      commentRef,
      direction,
      drawer,
      rateTexts,
      rules,
      cancelClick,
      confirmClick,
      changeDrawer,
      resetFileds,
      commentForm
    }
  }
})
</script>
<style lang="less" scoped></style>
