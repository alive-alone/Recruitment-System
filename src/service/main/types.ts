export interface InterviewListType {
  page: string
  limit: string
  department: string
  stu_status_code: string
}

export interface changPagesType {
  page: string
  total: number
  resumeList: InterviewDataListType[]
  department?: string
  stu_status_code?: string
}

export interface AdjustListType {
  page: string
  limit: string
}

export interface SearchType {
  name?: string
  stuId?: string
  page: string
  limit: string
}

export interface SignListType {
  stuId: string
  stuName: string
}

export interface InterviewDataType {
  total: number
  list: InterviewDataListType[]
}

export interface InterviewDataListType {
  stuId: string
  name: string
  gender: number
  firstDept?: number
  college: number
  status: number
  adjustDept?: number
}

export interface InterListType {
  list: InterviewDataListType[]
}
