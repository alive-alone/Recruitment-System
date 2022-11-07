import CommonRequest from '../index'
import { IResponseType } from '../type'

// 请求相应的API
enum AdminAPI {
  Advance = '/super_admin/elc_access/process_advance',
  FirstNotify = '/super_admin/elc_access/first_interview_notify',
  SecondNotify = '/super_admin/elc_access/second_interview_notify',
  WriteNotify = '/super_admin/elc_access/written_test_notify',
  firstResult = '/super_admin/elc_access/first_interview_result_notify',
  secondResult = '/super_admin/elc_access/second_interview_result_notify',
  GetFirList = '/super_admin/elc_access/get_first_interview_pass_list',
  GetFinList = '/super_admin/elc_access/get_final_admission_list',
  LoginOut = '/super_admin/elc_access/admin_logout',
  GetCurProgress = '/interview/elc_access/process_status_code/get_now_process'
}

// 推进总进度
function proAdvanceRequest() {
  return CommonRequest.put<IResponseType>({
    url: AdminAPI.Advance,
    showLoading: true
  })
}

// 发送一面提醒
function firstNotifyRequest() {
  return CommonRequest.get<IResponseType>({
    url: AdminAPI.FirstNotify
  })
}

// 发送二面提醒
function secondNotifyRequest() {
  return CommonRequest.get<IResponseType>({
    url: AdminAPI.SecondNotify
  })
}

// 发送笔试通知
function writeNotifyRequest() {
  return CommonRequest.get<IResponseType>({
    url: AdminAPI.WriteNotify
  })
}

// 发送一面结果
function firstResultRequest() {
  return CommonRequest.get<IResponseType>({
    url: AdminAPI.firstResult
  })
}

// 发送二面结果
function secondResultRequest() {
  return CommonRequest.get<IResponseType>({
    url: AdminAPI.secondResult
  })
}

// 获取一面通过名单
function getFirListRequest(depart: number) {
  return CommonRequest.get<IResponseType>({
    url: `${AdminAPI.GetFirList}/${depart}`
  })
}

// 获取最终通过名单
function getFinListRequest(depart: number) {
  return CommonRequest.get<IResponseType>({
    url: `${AdminAPI.GetFinList}/${depart}`
  })
}

// 获取当前面试总进度
function getCurProgress() {
  return CommonRequest.get<IResponseType>({
    url: AdminAPI.GetCurProgress
  })
}

// 退出登录
function loginOutRequest() {
  return CommonRequest.get<IResponseType>({
    url: AdminAPI.LoginOut
  })
}

// 导出报名名单
function getNameListApply(depart: number) {
  return CommonRequest.get<Blob>({
    url: `/super_admin/elc_access/getApply/${depart}`,
    responseType: 'blob'
  })
}

// 导出一面通过名单
function getNameListFitst(depart: number) {
  return CommonRequest.get<Blob>({
    url: `/super_admin/elc_access/getFirst/${depart}`,
    responseType: 'blob'
  })
}

// 导出二面通过名单
function getNameListSecond(depart: number) {
  return CommonRequest.get<Blob>({
    url: `/super_admin/elc_access/getSecond/${depart}`,
    responseType: 'blob'
  })
}

// 导出调剂名单
function getNameListSecondAdjust(depart: number) {
  return CommonRequest.get<Blob>({
    url: `/super_admin/elc_access/getSecondAdjust/${depart}`
  })
}

export {
  proAdvanceRequest,
  firstNotifyRequest,
  secondNotifyRequest,
  writeNotifyRequest,
  firstResultRequest,
  secondResultRequest,
  getFirListRequest,
  getFinListRequest,
  loginOutRequest,
  getCurProgress,
  getNameListApply,
  getNameListFitst,
  getNameListSecond,
  getNameListSecondAdjust
}
