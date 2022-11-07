export interface DetailsDataType {
  stuId: string
  name: string
  gender: number
  profile: string
  skill: string
  hasJoin: string
  firstDept: number
  secondDept: number
  major: string
  college: number
  clazz: string
  phone: string
  whereFind: string
}

export interface CommentListType {
  list: CommentsType[]
}

export interface CommentsType {
  stuld: string
  mark: number
  comment?: string
  interviewer: string
}

export interface AdjustInfoType {
  stuId: string
  dept: number
}
