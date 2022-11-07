<template>
  <div class="body">
    <div class="img-box">
      <img alt="Cyclops" class="img" src="@/assets/icon/01.svg" />
      <img alt="Cyclops" class="img" src="@/assets/icon/favicon.svg" />
      <img alt="Cyclops" class="img" src="@/assets/icon/02.svg" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import router from '@/router'

import { getDeptPeopleCount } from '@/service/main/main'

export default defineComponent({
  name: 'Welcome',
  setup() {
    const getCount = async () => {
      const result = await getDeptPeopleCount()
      if (result.code == 403) {
        router.push('/login')
      }
    }
    onMounted(() => {
      getCount()
    })
    return {}
  }
})
</script>

<style lang="less" scoped>
.body {
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img-box {
    width: 70%;
    display: flex;
    justify-content: space-around;
    .img {
      width: 250px;
      height: 250px;
      border-radius: 50%;
      box-shadow: 0px 0px 5px #c4c4c4;
      margin: 10px;
    }
  }
  // .flex {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  // }
  // .content {
  //   animation: content-slide-in 2s steps(13) forwards;
  //   overflow: hidden;
  //   white-space: nowrap;
  //   position: relative;
  //   font-size: 32px;
  //   text-align: center;
  // }

  // .content::after {
  //   content: '';
  //   position: absolute;
  //   right: 0;
  //   height: 16px;
  //   animation: sprinkle-bling 0.5s steps(2) infinite;
  // }

  // @keyframes content-slide-in {
  //   from {
  //     width: 0;
  //   }
  //   to {
  //     width: 13ch;
  //   }
  // }
}
</style>
