<template>
  <div class="adjust">
    <el-drawer v-model="drawer" :direction="direction" size="30%">
      <template #default>
        <el-radio-group v-model="radioSelect">
          <el-radio class="el-radio" v-for="(item, index) in options" :key="index" :label="index + 1" border>{{
            item
          }}</el-radio>
        </el-radio-group>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">调剂</el-button>
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
    let direction = ref('ttb')
    let drawer = ref(false)
    let radioSelect = ref(1)
    let commentForm = reactive({
      mark: 5,
      comment: '',
      interviewer: ''
    })
    const options = ['维修部', '秘书部', '项目部', '实践部', '外联部', '网宣部', '网络组']
    const changeDrawer = (value: boolean) => {
      drawer.value = value
    }
    const confirmClick = () => {
      ctx.emit('submit', radioSelect.value)
    }
    const cancelClick = () => {
      drawer.value = false
    }
    return {
      direction,
      drawer,
      radioSelect,
      commentForm,
      options,
      cancelClick,
      confirmClick,
      changeDrawer
    }
  }
})
</script>
<style lang="less" scoped>
.adjust {
  .el-radio {
    margin-bottom: 5px;
  }
}
</style>
