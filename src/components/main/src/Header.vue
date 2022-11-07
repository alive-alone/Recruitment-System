<template>
  <div class="header">
    <el-select v-model="selectValue" @change="changeSelect" class="m-2" placeholder="Select">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <div class="search">
      <div class="search-box" :style="isShow ? {} : { display: 'none' }">
        <el-input
          v-model="searchValue"
          clearable
          placeholder="请输入姓名、学号"
          class="input-with-select"
          @keyup.enter="search"
          @input="searchValChange"
        >
          <template #prepend>
            <img alt="search" class="search-icon" src="@/assets/icon/search.svg" />
          </template>
        </el-input>
      </div>
    </div>
    <div class="signout">
      <el-button @click="Refresh" color="#626aef" class="refresh-btn" type="primary" plain>刷新</el-button>
      <el-dropdown class="portrait" @command="dropdownSelect">
        <img alt="portrait" class="icon-portrait" src="@/assets/icon/portrait.svg" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="switch">切换账号</el-dropdown-item>
            <el-dropdown-item command="signout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue'
import { ElMessage } from 'element-plus'

import { debounce } from '@/assets/ts/FunOperate/index'

export default defineComponent({
  name: 'Header',
  components: {},
  emits: ['changeState', 'refresh', 'switchAccount', 'logOut', 'search'],
  props: {
    isShowSearchBox: {
      type: Boolean
    }
  },
  setup(props, ctx) {
    let isShow = toRef(props, 'isShowSearchBox')
    let searchValue = ref<string>()
    let selectValue = ref('20')
    const options = [
      {
        value: '20',
        label: '不筛选'
      },
      {
        value: '1',
        label: '通过一面'
      },
      {
        value: '2',
        label: '通过二面'
      }
    ]
    const changeSelect = () => {
      if (searchValue.value) {
        search()
      } else {
        ctx.emit('changeState', selectValue.value)
      }
    }
    const Refresh = () => {
      ctx.emit('refresh')
    }
    const dropdownSelect = (item: string) => {
      if (item === 'switch') {
        ctx.emit('switchAccount')
      } else {
        ctx.emit('logOut')
      }
    }
    const searchValChange = debounce(
      () => {
        if (searchValue.value === '') {
          Refresh()
        }
      },
      300,
      true
    )
    const searchList = () => {
      const StuIdRules = /^[0-9]*$/g
      const NameRules = /^[\u4E00-\u9FA5]+$/
      if (searchValue.value) {
        if (NameRules.test(searchValue.value)) {
          ctx.emit('search', 'name', searchValue.value)
        } else if (StuIdRules.test(searchValue.value)) {
          ctx.emit('search', 'stuId', searchValue.value)
        } else {
          ElMessage({
            duration: 1000,
            message: '请单纯输入姓名或学号',
            type: 'error'
          })
        }
      } else {
        Refresh()
      }
    }
    const search = debounce(searchList, 300, true)
    return {
      searchValue,
      selectValue,
      options,
      isShow,
      search,
      changeSelect,
      Refresh,
      dropdownSelect,
      searchValChange,
      debounce
    }
  }
})
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .search {
    width: 60%;
  }
  .search-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .input-with-select {
      font-size: 15px;
      width: 80%;
    }
    .search-icon {
      width: 20px;
      height: 20px;
    }
    ::v-deep(.el-input-group__prepend) {
      padding: 0;
      background-color: #fff;
      box-shadow: none;
    }
    ::v-deep(.el-input__wrapper) {
      box-shadow: none;
    }
    .bar-chart {
      display: flex;
      justify-content: center;
      align-items: center;
      .historgarm {
        width: 80%;
      }
    }
  }

  .signout {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .refresh-btn {
    width: 100px;
    margin-right: 30px;
  }
  .portrait {
    border-radius: 50%;
    background-color: rgb(227, 241, 255);
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-portrait {
      width: 30px;
      // color: #ffbb8b;
    }
  }
}
</style>
