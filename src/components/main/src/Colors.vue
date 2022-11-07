<template>
  <div class="colors">
    <div class="body">
      <div class="box card-unsigned"></div>
      <span>未签到</span>
    </div>
    <div class="body">
      <div class="box card-signed"></div>
      <span>已签到</span>
    </div>
    <div class="body">
      <div class="box card-interview"></div>
      <span>面试中</span>
    </div>
    <div class="body">
      <div class="box card-adjust"></div>
      <span>被调剂</span>
    </div>
    <div class="body">
      <div class="box card-failed"></div>
      <span>未通过</span>
    </div>
    <div class="body">
      <div class="box card-pass"></div>
      <span>通过</span>
    </div>
    <div class="body">
      <div class="box card-success"></div>
      <span>最终录用</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Colors',
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.colors {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  .body {
    display: flex;
    flex-direction: row;
    align-items: center;
    .box {
      width: 15px;
      height: 15px;
      border-radius: 2px;
    }
    span {
      padding-left: 5px;
      padding-right: 20px;
      font-size: 12px;
      font-weight: bold;
    }
  }
}

// 未签到
.card-unsigned {
  background-color: black;
}
// 已签到
.card-signed {
  background-color: rgb(94, 169, 255);
}
// 面试中
.card-interview {
  background-color: rgb(255, 255, 89);
}
// 被调剂
.card-adjust {
  background-color: rgb(231, 150, 0);
}
// 未通过
.card-failed {
  background-color: rgb(255, 40, 40);
}
// 通过
.card-pass {
  background-color: rgb(203, 112, 248);
}
// 最终录用
.card-success {
  background-color: rgb(121, 248, 112);
}
</style>
