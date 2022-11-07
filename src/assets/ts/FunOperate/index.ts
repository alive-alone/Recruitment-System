const debounce = (func: (...arg: any[]) => any, delay: number, immediate = false): any => {
  let timer: number | undefined
  return (...args: any) => {
    if (immediate) {
      func.apply(this, args) // 确保引用函数的指向正确，并且函数的参数也不变
      immediate = false
      return
    }
    clearTimeout(timer)
    timer = window.setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export { debounce }
