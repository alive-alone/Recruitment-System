<template>
  <div class="body">
    <h1 class="title">Gdut Elc</h1>
    <div class="login-panel">
      <div class="account-head">
        <p class="account-title">账号登录</p>
        <login-account ref="accountRef" />
      </div>
      <div class="account-control">
        <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        <el-link type="primary" @click="forgetPass">忘记密码</el-link>
      </div>
      <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'

import { ElMessage } from 'element-plus'

export default defineComponent({
  components: {
    LoginAccount
  },
  setup() {
    // 1.定义属性
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const currentTab = ref('account')

    // 2.定义方法
    const handleLoginClick = () => {
      accountRef.value?.loginAction(isKeepPassword.value)
    }
    // 3. 忘记密码
    const forgetPass = () => {
      ElMessage({
        duration: 3000,
        message: '完蛋~ 请联系网络组组长获取部门密码',
        type: 'warning',
        offset: 80
      })
    }
    return {
      isKeepPassword,
      accountRef,
      currentTab,
      handleLoginClick,
      forgetPass
    }
  }
})
</script>

<style scoped lang="less">
@font-face {
  font-family: 'Sofia';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/sofia/v14/8QIHdirahM3j_su5uI0.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
    U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
.body {
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 600px;
  .title {
    letter-spacing: 10px;
    text-align: center;
    font-size: 7.2rem;
    text-shadow: 0px 0px 7px rgba(167, 90, 255, 0.1);
    font-family: 'Sofia';
    color: #409eff;
    margin: 0;
    margin-bottom: 30px;
  }

  @keyframes maskedAnimation {
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: -100% 0;
    }
  }
  .rainbow {
    letter-spacing: 0.2rem;

    font-size: 1.2rem;

    text-transform: uppercase;
  }

  .rainbow .title {
    animation: rainbow 50s alternate infinite forwards;
  }

  @keyframes rainbow {
    0% {
      color: #efc68f;
    }

    100% {
      color: #8fefed;
    }
  }
  .login-panel {
    margin-bottom: 250px;
    width: 100%;
    .account-head {
      border: 1px solid #d8d8d8;
      text-align: center;
      border-radius: 5px;
      padding: 15px;
      .account-title {
        letter-spacing: 1px;
        font-size: 20px;
        margin: 0;
        margin-top: 5px;
        margin-bottom: 15px;
        font-weight: bold;
        color: #409eff;
      }
    }
    .account-control {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }

    .login-btn {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>
