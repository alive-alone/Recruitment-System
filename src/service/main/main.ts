import CommonRequest from '../index'

import { IResponseType } from '../type'
import { InterviewListType, InterviewDataType, AdjustListType, SearchType } from './types'

// 请求相应的API
enum MainAPI {
  InterviewList = '/interview/elc_access/brief_apply_query',
  LogOut = '/interview/elc_access/interviewer_logout',
  AdjustList = '/interview/elc_access/brief_adjust_apply_query',
  NameSearch = '/interview/elc_access/search_stu_by_name',
  StuIdSearch = '/interview/elc_access/search_stu_by_stu_id',
  AdjustNameSearch = '/interview/elc_access/search_adjust_stu_by_name',
  AdjustStuIdSearch = '/interview/elc_access/search_adjust_stu_by_stu_id',
  SortList = '/interview/elc_access/get_signIn_list',
  DeptPeopleCount = '/interview/elc_access/getDeptPeopleCount',
  StatePeopleCount = '/interview/elc_access/get_status_people_count'
}
/**
 * @param pagesInfo
 * @returns
 */
// 获取面试者列表
function getInterviewListRequest(pagesInfo: InterviewListType) {
  return CommonRequest.get<IResponseType<InterviewDataType>>({
    url: `${MainAPI.InterviewList}/${pagesInfo.page}/${pagesInfo.limit}/${pagesInfo.department}/${pagesInfo.stu_status_code}`,
    showLoading: true,
    cancelInter: true
  })
}

// 获取签到列表
function getSortListRequest(department: string) {
  return CommonRequest.get<IResponseType<InterviewDataType>>({
    url: `${MainAPI.SortList}/${department}`,
    cancelInter: true
  })
}

// 获取调剂者列表
function getAdjustListRequest(pagesInfo: AdjustListType) {
  return CommonRequest.get<IResponseType<InterviewDataType>>({
    url: `${MainAPI.AdjustList}/${pagesInfo.page}/${pagesInfo.limit}`,
    showLoading: true,
    cancelInter: true
  })
}

// 退出登录
function getLogOut() {
  return CommonRequest.get<IResponseType>({
    url: MainAPI.LogOut
  })
}

// 按照姓名搜索
function getNameSearch(pagesInfo: SearchType) {
  return CommonRequest.get<IResponseType<InterviewDataType>>({
    url: `${MainAPI.NameSearch}/${pagesInfo.name}/${pagesInfo.page}/${pagesInfo.limit}`,
    showLoading: true
  })
}

// 按照学号搜索
function getStuIdSearch(pagesInfo: SearchType) {
  return CommonRequest.get<IResponseType<InterviewDataType>>({
    url: `${MainAPI.StuIdSearch}/${pagesInfo.stuId}/${pagesInfo.page}/${pagesInfo.limit}`,
    showLoading: true
  })
}

// 调剂者 - 按照姓名搜索
function getAdjustNameSearch(pagesInfo: SearchType) {
  return CommonRequest.get<IResponseType<InterviewDataType>>({
    url: `${MainAPI.AdjustNameSearch}/${pagesInfo.name}/${pagesInfo.page}/${pagesInfo.limit}`,
    showLoading: true
  })
}

// 调剂者 - 按照学号搜索
function getAdjusStuIdSearch(pagesInfo: SearchType) {
  return CommonRequest.get<IResponseType<InterviewDataType>>({
    url: `${MainAPI.AdjustStuIdSearch}/${pagesInfo.stuId}/${pagesInfo.page}/${pagesInfo.limit}`,
    showLoading: true
  })
}

// 获取每个部门人数情况
function getDeptPeopleCount() {
  return CommonRequest.get<IResponseType<number[]>>({
    url: `${MainAPI.DeptPeopleCount}`,
    cancelInter: true
  })
}

// 获取每个部门人数情况
function getStatePeopleCount() {
  return CommonRequest.get<IResponseType<number[]>>({
    url: `${MainAPI.StatePeopleCount}`,
    cancelInter: true
  })
}

export {
  getInterviewListRequest,
  getLogOut,
  getAdjustListRequest,
  getNameSearch,
  getStuIdSearch,
  getAdjustNameSearch,
  getAdjusStuIdSearch,
  getSortListRequest,
  getDeptPeopleCount,
  getStatePeopleCount
}
