export const academyDataList = [
  '',
  '机电工程学院',
  '自动化学院',
  '轻工化工学院',
  '信息工程学院',
  '土木与交通工程学院',
  '管理学院',
  '计算机学院',
  '材料与能源学院',
  '环境科学与工程学院',
  '外国语学院',
  '数学与统计学院',
  '物理与光电工程学院',
  '艺术与设计学院',
  '政法学院',
  '建筑与城市规划学院',
  '经济与贸易学院',
  '生物医药学院',
  '先进制造学院',
  '生态环境与资源学院',
  '集成电路学院',
  '商学院',
  '国际教育学院'
]

export const depList = ['', '维修部', '秘书部', '项目部', '实践部', '外联部', '网宣部', '网络组']

export const sourceOfApproachELC = ['师兄师姐推荐', '同学推荐', '部门摆摊', '朋友圈', '微信公众号']

export const sexList = ['', '男', '女']

export const getSex = (index: number) => {
  return sexList[index]
}

export const getCollege = (index: number) => {
  return academyDataList[index]
}

export const getDepart = (index: number) => {
  return depList[index]
}

export const getSource = (index: number) => {
  return sourceOfApproachELC[index]
}
