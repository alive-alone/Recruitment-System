import CommonRequest from '../index'

import { IAccount, CurProgressDataType } from './types'

import { IResponseType } from '../type'

// 请求相应的API
enum LoginAPI {
  InterviewertLogin = '/elc_public/interviewer_login',
  AdminLogin = '/elc_public/admin_login',
  GetCurProgress = '/interview/elc_access/process_status_code/get_now_process'
}

// 面试官登录
function interLoginRequest(account: IAccount) {
  return CommonRequest.get<IResponseType>({
    url: `${LoginAPI.InterviewertLogin}/${account.username}/${account.password}`,
    showLoading: true
  })
}

// 管理员登录
function adminLoginRequest(account: IAccount) {
  return CommonRequest.get<IResponseType>({
    url: `${LoginAPI.AdminLogin}/${account.username}/${account.password}`,
    showLoading: true
  })
}

// 获取当前面试总进度
function getCurProgress() {
  return CommonRequest.get<CurProgressDataType>({
    url: LoginAPI.GetCurProgress,
    cancelInter: true
  })
}

export { interLoginRequest, adminLoginRequest, getCurProgress }
