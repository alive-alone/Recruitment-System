<template>
  <div class="home">
    <el-container>
      <el-header height="90px" class="el-header">
        <Header
          class="header"
          :isShowSearchBox="isShowSearchBox"
          @changeState="changeState"
          @refresh="mainRefresh"
          @switchAccount="switchAccount"
          @logOut="logOut"
          @search="search"
        ></Header>
        <Colors class="colors"></Colors>
      </el-header>
      <el-main class="el-main-body">
        <ResumeList
          class="resume-list"
          @navigateTo="navigateTo"
          :resumeList="resumeList"
          :isTrue="isAdjust"
        ></ResumeList>
        <el-aside :width="`${isShowSortList}px`">
          <SortList :list="signLists" @navigateTo="navigateTo"></SortList>
        </el-aside>
      </el-main>
      <el-footer height="50px">
        <Pagination :pageSize="10" :total="listTotal" @changePage="changePage" class="pagination"></Pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch, onUnmounted } from 'vue'
import router from '@/router'
import { useStore } from '@/store'

import { ResumeList, Pagination, Header, Colors, SortList } from '@/components/main/index'

import { debounce } from '@/assets/ts/FunOperate/index'

import { getLogOut } from '@/service/main/main'

export default defineComponent({
  name: 'Home',
  components: { ResumeList, Pagination, Header, Colors, SortList },
  setup() {
    let timeInter: number | null = null
    let searchValue = reactive({
      type: '',
      value: ''
    })
    const store = useStore()
    let isShowList = computed(() => store.getters['mainModule/getIsShowList'])
    let isShowSortList = computed(() => store.getters['mainModule/getIsShowSortList'])
    let isShowSearchBox = computed(() => store.getters['mainModule/getIsShowSearchBox'])
    let activeIndex = computed(() => store.getters['mainModule/getDepart'])
    let isAdjust = computed(() => store.getters['mainModule/getIsAdjust'])
    let isSearch = computed(() => store.getters['mainModule/getIsSearch'])
    // 面试者列表
    let resumeList = computed(() => store.getters['mainModule/getResumeList'])
    let signLists = computed(() => store.getters['mainModule/getSignList'])
    // 列表总数
    let listTotal = computed(() => store.getters['mainModule/getTotal'])

    // 改变当前页
    const changePage = (index: string) => {
      store.commit('mainModule/changePagesPage', index)
      if (isSearch.value) {
        if (searchValue.type == 'name') {
          store.dispatch('mainModule/getList', { type: 'name', value: searchValue.value })
        } else {
          store.dispatch('mainModule/getList', { type: 'stuId', value: searchValue.value })
        }
      } else {
        getInterList()
      }
    }
    // 改变学生状态
    const changeState = (state: string) => {
      store.commit('mainModule/changePagesPage', '1')
      store.commit('mainModule/changePagesStatus', state)
      getInterList()
    }
    // 获取面试者列表
    const getInterList = debounce(
      () => {
        store.dispatch('mainModule/getList')
      },
      150,
      true
    )
    // 获取签到者列表
    const getSortList = () => {
      timeInter && clearInterval(Number(timeInter))
      store.dispatch('mainModule/getSortList')
      timeInter = setInterval(() => {
        store.dispatch('mainModule/getSortList')
      }, 1000 * 6)
    }
    // 获取调剂者列表
    const getAdjustList = () => {
      store.commit('mainModule/changePagesPage', '1')
      getInterList()
    }
    // 姓名、学号搜索
    const search = (type: string, value: string) => {
      searchValue.type = type
      searchValue.value = value
      store.commit('mainModule/changePagesPage', '1')
      store.commit('mainModule/changeIsSearch', true)
      store.commit('mainModule/changePagesDepart', '0')
      store.dispatch('mainModule/getList', searchValue)
    }
    // 刷新页面
    const mainRefresh = () => {
      store.commit('mainModule/changePagesPage', '1')
      getInterList()
      getSortList()
    }
    // 切换账号
    const switchAccount = () => {
      router.push('/login')
    }
    // 退出登录
    const logOut = async () => {
      const logoutResult = await getLogOut()
      if (logoutResult.code == 200) {
        router.push('/login')
      }
    }
    // 详情页跳转
    const navigateTo = (stuId: string) => {
      const routers = router.resolve({
        path: '/details',
        query: { isAdjust: isAdjust.value ? 1 : 0, stuId: stuId }
      })
      window.open(routers.href, '_blank')
    }
    watch(activeIndex, () => {
      getInterList()
      getSortList()
    })
    onMounted(() => {
      getInterList()
      getSortList()
    })
    onUnmounted(() => {
      clearInterval(Number(timeInter))
    })
    return {
      listTotal,
      resumeList,
      signLists,
      isAdjust,
      searchValue,
      activeIndex,
      isShowSortList,
      isShowList,
      isShowSearchBox,
      navigateTo,
      changePage,
      changeState,
      mainRefresh,
      switchAccount,
      logOut,
      getAdjustList,
      search
    }
  }
})
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  min-width: 970px;

  .el-header {
    display: flex;
    flex-direction: column;
    .header {
      flex: 1;
    }
    .colors {
      align-self: flex-end;
    }
  }
  .el-main-body {
    display: flex;
    flex-direction: row;
    .resume-list {
      flex: 1;
    }
    ::v-deep(.el-aside) {
      transition: width 0.5s;
    }
  }
  ::v-deep(.el-main) {
    padding: 10px 20px 20px;
    --el-main-padding: 0px;
  }
  .el-container {
    height: 100%;
  }
  .pagination {
    justify-content: flex-end;
  }
}
</style>
