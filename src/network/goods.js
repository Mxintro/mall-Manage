import { instance } from './axios'

export function getGoodsCate(params) {
  return instance.get('categories', { params: params })
}

export function addGoodsCate(params) {
  return instance.post('categories', params)
}

export function getGoodsAttributes(id, sel) {
  return instance.get(`/categories/${id}/attributes`, { params: { sel: sel } })
}

export function addGoodsAttr(id, params) {
  return instance.post(`/categories/${id}/attributes`, params)
}
