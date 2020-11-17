import { httpBase } from './axios'

export function getOrders(params) {
  // return instance.get('orders', { params: params })
  return httpBase({
    url: '/orders',
    params: params
  })
}

export function getProgress(id) {
  // return instance.get(`/kuaidi/${id}`)
  return httpBase({
    url: `/kuaidi/${id}`
  })
}
