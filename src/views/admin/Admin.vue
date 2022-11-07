<template>
  <div class="admin-body">
    <el-container>
      <el-header height="100px">
        <div class="header">
          <img class="logo" alt="ELC-logo" src="../../assets/img/gdutelc.jpg" />
          <div class="signout">
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
      </el-header>
      <el-main>
        <Tabs>
          <template v-slot:advance>
            <Advance></Advance>
          </template>
          <template #send>
            <Remind></Remind>
          </template>
          <template #gain>
            <NameList></NameList>
          </template>
        </Tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Tabs } from '@/components/admin/index'

import router from '@/router'
import { loginOutRequest } from '@/service/admin/admin'

import Advance from './cpns/Advance.vue'
import NameList from './cpns/NameList.vue'
import Remind from './cpns/Remind.vue'

export default defineComponent({
  name: 'Admin',
  components: { Tabs, Advance, NameList, Remind },
  setup() {
    let activeMenuIndex = ref<number>(1)
    const departmentList = ref(['进度推进', '发送提醒', '获取名单'])
    const menuClick = (value: number) => {
      activeMenuIndex.value = value
    }
    const dropdownSelect = (item: string) => {
      if (item === 'switch') {
        switchAccount()
      } else {
        logOut()
      }
    }
    // 切换账号
    const switchAccount = () => {
      router.push('/login')
    }
    // 退出登录
    const logOut = async () => {
      const logoutResult = await loginOutRequest()
      if (logoutResult.code == 200) {
        router.push('/login')
      }
    }
    return {
      departmentList,
      menuClick,
      dropdownSelect
    }
  }
})
</script>

<style lang="less" scoped>
.admin-body {
  min-width: 760px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      width: 250px;
      height: 100px;
    }
    .signout {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .portrait {
      border-radius: 50%;
      background-color: rgb(227, 241, 255);
      padding: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 25px;
      .icon-portrait {
        width: 30px;
        // color: #ffbb8b;
      }
    }
  }
}
</style>
