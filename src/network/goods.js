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

export function editGoodAttr(params) {
  return instance.put(`/categories/${params.id}/attributes/${params.attr_id}`, params)
}

export function deleteGoodAttr(id, attrId) {
  return instance.delete(`/categories/${id}/attributes/${attrId}`)
}

export function getGoodsList(params) {
  return instance.get('/goods', { params: params })
}
