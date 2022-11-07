function getDomDistance(dom: any, add?: number, minus?: number): number {
  // console.log(window.innerHeight, dom.offsetTop, dom.offsetHeight, window.pageYOffset)
  if (dom && dom.offsetTop) {
    let distance: number = window.innerHeight - (dom.offsetTop - window.pageYOffset)
    // dom.offsetHeight
    if (add) {
      distance += add
    }
    if (minus) {
      distance -= minus
    }
    if (dom.offsetTop == 0) {
      distance -= 100
    }
    // console.log('distance----', distance)
    return distance
  } else {
    return 0
  }
}
export { getDomDistance }
