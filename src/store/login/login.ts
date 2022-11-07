import { Module } from 'vuex'

import { interLoginRequest, adminLoginRequest } from '@/service/login/login'
import localCache from '@/utils/cache'
import router from '@/router'

import { IAccount } from '@/service/login/types'
import { ILoginState } from './types'
import { IRootState } from '../types'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      username: '',
      jid: ''
    }
  },
  getters: {},
  mutations: {
    changeUsername(state, username: string) {
      state.username = username
    },
    changeJid(state, jid: string) {
      state.jid = jid
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await interLoginRequest(payload)
      if (loginResult.code === 200) {
        localCache.setCache('jid', loginResult.data)
        commit('changeJid', loginResult.data)
        // 4.跳到首页
        router.push('/home')
      }
    },
    async adminLoginActions({ commit }, payload: IAccount) {
      const result = await adminLoginRequest(payload)
      if (result.code === 200) {
        router.push('/admin')
      }
    }
  }
}

export default loginModule
