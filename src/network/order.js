import { instance } from './axios'

export function getOrders(params) {
  return instance.get('orders', { params: params })
}

export function getProgress(id) {
  return instance.get(`/kuaidi/${id}`)
}
