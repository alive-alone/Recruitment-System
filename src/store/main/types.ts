import { InterviewListType, InterviewDataListType, SignListType } from '@/service/main/types'

export interface IMainStore {
  pages: InterviewListType
  total: number
  resumeList: InterviewDataListType[]
  isAdjust: boolean
  isSearch: boolean
  signList: SignListType[]
  isShowList: boolean
  isShowSortList: number
  isShowSearchBox: boolean
}
