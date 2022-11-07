import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { CommonRequestConfig, CommonRequestInterceptors } from './type'

import { ElMessage } from 'element-plus'
import { ElLoading } from 'element-plus'

// 请求显示加载
const DEAFULT_LOADING = false
// 请求取消默认拦截
const DEFAULT_CANCEL = false

class CommonRequest {
  instance: AxiosInstance
  interceptors?: CommonRequestInterceptors //拦截器是可选属性
  showLoading: boolean
  loading?: any
  cancelInter?: boolean

  constructor(config: CommonRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEAFULT_LOADING
    this.cancelInter = config.showLoading ?? DEFAULT_CANCEL

    // 注册拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )

    // 默认请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('默认request拦截器拦截成功', config)
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '玩命加载中....',
            background: 'rgba(0, 0, 0, 0)'
          })
        }
        return config
      },
      (err) => {
        console.log('默认request拦截器拦截失败', err)
        ElMessage({
          type: 'error',
          showClose: true,
          message: err.message
        })
        return err
      }
    )

    // 默认接收拦截器
    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.loading?.close()
        if (res.data) {
          if (res.data.code == 429) {
            ElMessage({
              type: 'error',
              showClose: true,
              grouping: true,
              message: '请求过于频繁，请稍后再试！'
            })
          } else if (res.data.code == 403) {
            if (!this.cancelInter) {
              ElMessage({
                type: 'error',
                showClose: true,
                grouping: true,
                message: res.data.msg
              })
            }
          } else if (res.data.code && res.data.code !== 200) {
            ElMessage({
              type: 'error',
              showClose: true,
              grouping: true,
              message: res.data.msg
            })
          }
        } else {
          ElMessage({
            type: 'error',
            showClose: true,
            grouping: true,
            message: '网络连接超时'
          })
        }
        // 如果有data属性都返回data属性，否则返回所有 res.data ?? res
        return res.data ?? res
      },
      (err) => {
        // 将loading移除
        this.loading?.close()
        console.log('默认response拦截器拦截失败', err)
        ElMessage({
          type: 'error',
          showClose: true,
          message: err.message
        })
        return err
      }
    )
  }

  request<T>(config: CommonRequestConfig<T>): Promise<T> {
    // 泛型用于约束返回类型
    return new Promise((resolve, reject) => {
      // 如果当前组件有自定义的请求拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      // 1.判断是否需要显示loading
      if (config.showLoading === true) {
        this.showLoading = true
      }
      if (config.cancelInter === true) {
        this.cancelInter = true
      }
      this.instance
        .request<any, T>(config)
        .then((res: T) => {
          // 如果当前组件有自定义的响应拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          this.cancelInter = DEFAULT_CANCEL
          // 返回响应结果
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T>(config: CommonRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: CommonRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  patch<T>(config: CommonRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }

  put<T>(config: CommonRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  delete<T>(config: CommonRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export default CommonRequest
