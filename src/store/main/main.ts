import { Module } from 'vuex'

import {
  getInterviewListRequest,
  getAdjustListRequest,
  getNameSearch,
  getStuIdSearch,
  getAdjustNameSearch,
  getAdjusStuIdSearch,
  getSortListRequest
} from '@/service/main/main'
import { ElMessage } from 'element-plus'
import router from '@/router'

import { IRootState } from '../types'
import { IMainStore } from './types'
import {
  InterviewDataListType,
  InterviewListType,
  AdjustListType,
  SearchType,
  SignListType
} from '@/service/main/types'

const mainModule: Module<IMainStore, IRootState> = {
  namespaced: true,
  state() {
    return {
      pages: {
        page: '1',
        limit: '10',
        department: '20',
        stu_status_code: '20'
      },
      total: 0,
      resumeList: [],
      signList: [],
      isAdjust: false,
      isSearch: false,
      isShowList: false,
      isShowSortList: 0,
      isShowSearchBox: true
    }
  },
  getters: {
    getResumeList(state) {
      return state.resumeList
    },
    getTotal(state) {
      return state.total
    },
    getIsAdjust(state) {
      return state.isAdjust
    },
    getIsSearch(state) {
      return state.isSearch
    },
    getSignList(state) {
      return state.signList
    },
    getDepart(state) {
      return state.pages.department
    },
    getIsShowList(state) {
      return state.isShowList
    },
    getIsShowSortList(state) {
      return state.isShowSortList
    },
    getIsShowSearchBox(state) {
      return state.isShowSearchBox
    }
  },
  mutations: {
    changePagesPage(state, pages: string) {
      state.pages.page = pages
    },
    changePagesDepart(state, depart: string) {
      state.pages.department = depart
    },
    changePagesStatus(state, status: string) {
      state.pages.stu_status_code = status
    },
    changeTotal(state, total: number) {
      state.total = total
    },
    changeResumeList(state, resumeList: InterviewDataListType[]) {
      state.resumeList = resumeList
    },
    changeSignListList(state, signList: SignListType[]) {
      state.signList = signList
    },
    changeIsAdjust(state, isAdjust: boolean) {
      state.isAdjust = isAdjust
    },
    changeIsSearch(state, isSearch: boolean) {
      state.isSearch = isSearch
    },
    changeIsShowList(state, isShowList: boolean) {
      state.isShowList = isShowList
    },
    changeIsShowSortList(state, isShowSortList: number) {
      state.isShowSortList = isShowSortList
    },
    changeIsShowSearchBox(state, isShowSearchBox: boolean) {
      state.isShowSearchBox = isShowSearchBox
    }
  },
  actions: {
    getList({ dispatch, state }, search?: { type: string; value: string }) {
      if (!state.isSearch) {
        if (state.isAdjust) {
          dispatch('getAdjustList', state.pages)
        } else {
          dispatch('getInterviewList', state.pages)
        }
      } else {
        if (search?.type == 'name') {
          dispatch('getNameSearchList', [
            { name: search?.value, page: state.pages.page, limit: state.pages.limit },
            state.isAdjust
          ])
        } else if (search?.type == 'stuId') {
          dispatch('getStuIdSearchList', [
            { stuId: search?.value, page: state.pages.page, limit: state.pages.limit },
            state.isAdjust
          ])
        } else {
          if (state.isAdjust) {
            dispatch('getAdjustList', state.pages)
          } else {
            dispatch('getInterviewList', state.pages)
          }
        }
      }
    },
    // 获取面试者列表
    async getInterviewList({ commit }, pages: InterviewListType) {
      const ListResult = await getInterviewListRequest(pages)
      if (ListResult.code === 200) {
        commit('changeResumeList', ListResult.data.list)
        commit('changeTotal', ListResult.data.total)
        commit('changePagesPage', pages.page)
        commit('changePagesStatus', pages.stu_status_code)
        commit('changePagesDepart', pages.department)
      } else if (ListResult.code === 403) {
        router.push('/login')
      }
    },
    async getSortList({ commit, state }) {
      if (state.pages.department != '0') {
        const signListResult = await getSortListRequest(state.pages.department)
        if (signListResult.code === 200) {
          commit('changeSignListList', signListResult.data)
        } else if (signListResult.code === 403) {
          router.push('/login')
        }
      }
    },
    // 获取调剂者列表
    async getAdjustList({ commit }, pages: AdjustListType) {
      const result = await getAdjustListRequest(pages)
      if (result.code === 200) {
        commit('changeResumeList', result.data.list)
        commit('changeTotal', result.data.total)
        commit('changePagesPage', pages.page)
      } else if (result.code === 403) {
        router.push('/login')
      } else {
        ElMessage.error(result.msg)
      }
    },
    // 姓名搜索
    async getNameSearchList({ commit }, [pages, isAdjust]: [SearchType, boolean]) {
      let result = null
      if (!isAdjust) {
        result = await getNameSearch(pages)
      } else {
        result = await getAdjustNameSearch(pages)
      }
      if (result.code === 200) {
        commit('changeResumeList', result.data.list)
        commit('changeTotal', result.data.total)
        commit('changePagesPage', pages.page)
      }
    },
    // 学号搜索
    async getStuIdSearchList({ commit }, [pages, isAdjust]: [SearchType, boolean]) {
      let result = null
      if (!isAdjust) {
        result = await getStuIdSearch(pages)
      } else {
        result = await getAdjusStuIdSearch(pages)
      }
      if (result.code === 200) {
        commit('changeResumeList', result.data.list)
        commit('changeTotal', result.data.total)
        commit('changePagesPage', pages.page)
      }
    },
    changePages({ commit }, { resumeList, total, page, department, stu_status_code }) {
      commit('changeResumeList', resumeList)
      commit('changeTotal', total)
      commit('changePagesPage', page)
      if (department) {
        commit('changePagesDepart', department)
      }
      if (stu_status_code) {
        commit('changePagesStatus', stu_status_code)
      }
    }
  },
  modules: {}
}

export default mainModule
