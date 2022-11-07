import { createStore, Store, useStore as useVuexStore } from 'vuex'

import loginModule from './login/login'
import mainModule from './main/main'

import { IRootState, IStoreType } from './types'

const store = createStore<IRootState>({
  state() {
    return {
      username: '',
      department: ''
    }
  },
  mutations: {
    changeUserInfo(state, info: IRootState) {
      state.username = info.username
      state.department = info.department
    }
  },
  getters: {},
  actions: {
    change({ commit }, index: string) {
      console.log(index)
    }
  },
  modules: {
    loginModule,
    mainModule
  }
})

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
