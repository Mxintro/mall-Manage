import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/',
  timeout: 1000
})

instance.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  console.log(config)
  return config
})
// instance.interceptors.response.use

export function Login (data) {
  return instance.post('/login', data)
}

export function getMenus() {
  return instance.get('/menus')
}
