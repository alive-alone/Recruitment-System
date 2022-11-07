<template>
  <div class="resume-list" v-if="info">
    <el-descriptions :title="info.name">
      <el-descriptions-item label="性别">
        <el-tag effect="plain">
          {{ getSex(info.gender) }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="学院">
        <el-tag effect="plain">
          {{ getCollege(info.college) }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="专业">
        <el-tag effect="plain">
          {{ info.major }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="班级">
        <el-tag effect="plain">
          {{ info.clazz }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="第一意向部门">
        <el-tag effect="dark">{{ getDepart(info.firstDept) }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="已加组织/社团">
        <el-tag type="danger" effect="dark">{{ info.hasJoin == '' ? ' -- ' : info.hasJoin }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="掌握技能">
        <el-tag effect="success" class="tag-skill">
          <div class="info-skill">
            <el-scrollbar class="el-scrollbar" max-height="80px">
              <div class="skill">
                {{ info.skill }}
              </div>
            </el-scrollbar>
          </div>
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="了解电协的方式">
        {{ getSource(1) }}
      </el-descriptions-item>
    </el-descriptions>
    <div>
      <p class="info-profile">自我介绍</p>
      <el-scrollbar class="el-scrollbar" max-height="150px">
        <div class="markdown-body" v-html="markdownRender(info.profile)"></div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'
import { getSex, getDepart, getCollege, getSource } from '@/assets/ts/data-config'

import 'github-markdown-css/github-markdown.css'

export default defineComponent({
  name: 'ResumeList',
  components: {},
  props: {
    userInfo: {
      type: Object
    }
  },
  setup(props) {
    let info = toRef(props, 'userInfo')
    const markdownRender = (data: string) => {
      const MardownIt = require('markdown-it')
      const md = new MardownIt()
      let result = md.render(data)
      console.log(result)
      return result
    }
    return {
      info,
      getSex,
      getDepart,
      getCollege,
      getSource,
      markdownRender
    }
  }
})
</script>
<style lang="less" scoped>
.resume-list {
  height: 100%;
  overflow: hidden;
  .info-profile {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .el-scrollbar {
    padding: 0 10px;
  }
  .tag-skill {
    padding: 6px;
  }
  .info-skill {
    max-width: 450px;
    overflow: hidden;
    .el-scrollbar {
      padding: 0;
    }
    .skill {
      font-size: 14px;
      margin: 12px 0;
      white-space: nowrap;
      padding: 5px 0;
    }
  }
}
</style>
