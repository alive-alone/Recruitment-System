import CommonRequest from '../index'

import { IResponseType } from '../type'
import { DetailsDataType, CommentListType, CommentsType, AdjustInfoType } from './types'
// 请求相应的API
enum DetailsAPI {
  DetailsInfo = '/interview/elc_access/detailed_apply_query',
  Comments = '/interview/elc_access/query_comments',
  PubComment = '/interview/elc_access/publish_comment',
  InterAdjust = '/interview/elc_access/stu_status_code/second_interview_adjust',
  InviteInter = '/interview/elc_access/stu_status_code/interview_start',
  InviteAdjustInter = '/interview/elc_access/stu_status_code/second_adjust_interview_start',
  passFirInter = '/interview/elc_access/stu_status_code/interview_pass',
  passSecInter = '/interview/elc_access/stu_status_code/second_adjust_interview_pass'
}

// 面试邀请
function putInviteInter(stu_id: string) {
  return CommonRequest.put<IResponseType>({
    url: `${DetailsAPI.InviteInter}/${stu_id}`
  })
}

// 调剂面试邀请
function putAdjustInviteInter(stu_id: string) {
  return CommonRequest.put<IResponseType>({
    url: `${DetailsAPI.InviteAdjustInter}/${stu_id}`
  })
}

// 获取面试者详细信息
function getDetailInfo(stu_id: string) {
  return CommonRequest.get<IResponseType<DetailsDataType>>({
    url: `${DetailsAPI.DetailsInfo}/${stu_id}`,
    showLoading: true
  })
}

// 获取面试者的所有评论
function getComments(stu_id: string) {
  return CommonRequest.get<IResponseType<CommentsType[]>>({
    url: `${DetailsAPI.Comments}/${stu_id}`,
    showLoading: true
  })
}

// 发布评论
function postComment(comment: CommentsType) {
  return CommonRequest.post<IResponseType>({
    url: DetailsAPI.PubComment,
    data: comment
  })
}

// 调剂
function putInterAdjust(adjustInfo: AdjustInfoType) {
  return CommonRequest.put<IResponseType>({
    url: `${DetailsAPI.InterAdjust}/${adjustInfo.stuId}/${adjustInfo.dept}`
  })
}

// 通过本次面试
function putFirPassInter(stu_id: string) {
  return CommonRequest.put<IResponseType>({
    url: `${DetailsAPI.passFirInter}/${stu_id}`
  })
}

// 调剂通过
function putSecPassInter(stu_id: string) {
  return CommonRequest.put<IResponseType>({
    url: `${DetailsAPI.passSecInter}/${stu_id}`
  })
}

export {
  getDetailInfo,
  getComments,
  postComment,
  putInterAdjust,
  putInviteInter,
  putAdjustInviteInter,
  putFirPassInter,
  putSecPassInter
}
