<template>
  <div class="home">
    <el-container>
      <el-aside class="el-aside" width="200px">
        <Options @changeActiveIndex="changeActiveIndex" class="menu"></Options>
      </el-aside>
      <el-container>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" v-if="$route.meta.keepAlive" />
          </keep-alive>
          <component :is="Component" v-if="!$route.meta.keepAlive" />
        </router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import { useStore } from '@/store'
import router from '@/router'
import { Options } from '@/components/main/index'

export default defineComponent({
  name: 'Home',
  components: { Options },
  setup() {
    const store = useStore()
    // 改变部门
    const changeActiveIndex = (index: string) => {
      store.commit('mainModule/changePagesDepart', index)
      store.commit('mainModule/changeIsSearch', false)
      store.commit('mainModule/changePagesPage', '1')
      if (index == '8') {
        store.commit('mainModule/changeIsAdjust', true)
      } else {
        store.commit('mainModule/changeIsAdjust', false)
      }
      if (index == '0' || index == '8') {
        store.commit('mainModule/changeIsShowSortList', 0)
        store.commit('mainModule/changeIsShowSearchBox', true)
      } else {
        store.commit('mainModule/changeIsShowSortList', 250)
        store.commit('mainModule/changeIsShowSearchBox', false)
      }
      if (index == '20') {
        router.push('/welcome')
      } else if (index == '10') {
        router.push('/analysis')
      } else {
        router.push('/userlist')
      }
    }
    onMounted(() => {
      router.push('/welcome')
    })
    onUnmounted(() => {
      window.onresize = null
    })
    return {
      changeActiveIndex
    }
  }
})
</script>

<style lang="less" scoped>
.home {
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
