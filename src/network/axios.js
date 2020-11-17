import axios from 'axios'
// import { reject, resolve } from 'core-js/fn/promise'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export const baseURL = 'http://127.0.0.1:8888/api/private/v1/'

export function httpBase(option) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL,
      timeout: 2000
    })

    instance.interceptors.request.use(config => {
      NProgress.start()
      config.headers.Authorization = window.sessionStorage.getItem('token')
      console.log(config)
      return config
    })

    instance.interceptors.response.use(response => {
      NProgress.done()
      const status = response.data.meta.status
      console.log(response)
      if (status % 200 <= 10 && status < 210) {
        return response.data
      } else {
        return Promise.reject(new Error(response.data.meta.msg))
      }
    })

    instance(option).then(res => resolve(res))
      .catch(error => reject(error))
  })
}

export function Login (data) {
  // return instance.post('/login', data)
  return httpBase({
    url: '/login',
    method: 'post',
    data: data
  })
}

export function getMenus() {
  // return instance.get('/menus')
  return httpBase({
    url: '/menus',
    method: 'get'
  })
}
