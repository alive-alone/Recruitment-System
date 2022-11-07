export interface DebounceType {
  func: (...arg: any[]) => any
  delay: number
  immediate: boolean
}
