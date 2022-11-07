// import { ILoginState } from './login/types'
import { IMainStore } from './main/types'

export interface IRootState {
  username: string
  department: string
}

export interface IRootWithModule {
  mainModule: IMainStore
}

export type IStoreType = IRootState & IRootWithModule
