<template>
  <div class="menu">
    <el-scrollbar :max-height="height">
      <img class="logo" alt="ELC-logo" src="@/assets/img/gdutelc.jpg" />
      <el-menu :default-active="activeMenuIndex" class="el-menu-vertical-demo" @select="menuClick">
        <template v-for="item in list" :key="item.id">
          <template v-if="item.children">
            <el-sub-menu :index="item.id">
              <template #title>
                <el-icon></el-icon>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <template v-for="subitem in item.children" :key="subitem.id">
                  <el-menu-item :index="subitem.id">
                    <el-icon></el-icon>
                    {{ subitem.title }}
                  </el-menu-item>
                </template>
              </el-menu-item-group>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item :index="item.id">
              <el-icon></el-icon>
              <template #title>{{ item.title }}</template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, nextTick, onMounted, watch, onUnmounted } from 'vue'

import { debounce } from '@/assets/ts/FunOperate/index'

export default defineComponent({
  name: 'Menu',
  components: {},
  emits: ['changeActiveIndex'],
  setup(props, ctx) {
    let height = ref(684)
    let activeMenuIndex = ref('20')
    const departmentList = ['总列表', '维修部', '秘书部', '项目部', '实践部', '外联部', '网宣部', '网络组', '调剂表']
    const list = reactive([
      {
        id: '20',
        title: 'welcome'
      },
      {
        id: '10',
        title: '数据总览'
      },
      {
        id: '0',
        title: '总体列表'
      },
      {
        id: '30',
        title: '部门列表',
        children: [
          {
            id: '1',
            title: '维修部'
          },
          {
            id: '2',
            title: '秘书部'
          },
          {
            id: '3',
            title: '项目部'
          },
          {
            id: '4',
            title: '实践部'
          },
          {
            id: '5',
            title: '外联部'
          },
          {
            id: '6',
            title: '网宣部'
          },
          {
            id: '7',
            title: '网络组'
          }
        ]
      },
      {
        id: '8',
        title: '调剂列表'
      }
    ])
    const menuClick = (value: any) => {
      ctx.emit('changeActiveIndex', value)
    }
    const getHeight = () => {
      height.value = document.documentElement.clientHeight
    }
    onMounted(() => {
      nextTick(() => {
        height.value = document.documentElement.clientHeight
      })
      window.addEventListener('resize', debounce(getHeight, 500, true), false)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', debounce(getHeight, 500, true), false)
      window.onresize = null
    })
    return {
      activeMenuIndex,
      departmentList,
      list,
      height,
      menuClick
    }
  }
})
</script>

<style lang="less" scoped>
.menu {
  height: 100%;
  .logo {
    width: 200px;
    height: 90px;
  }
  .el-menu-vertical-demo {
    ::v-deep(.el-menu-item) {
      font-size: 15px;
      font-weight: 700;
    }
    ::v-deep(.el-sub-menu__title) {
      height: 48px;
      line-height: 48px;
      font-size: 15px;
      font-weight: 700;
    }
  }
  ::v-deep(.el-menu-item) {
    height: 48px;
    line-height: 48px;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 100px);
}
</style>
