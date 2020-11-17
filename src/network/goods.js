import { httpBase } from './axios'

export function getGoodsCate(params) {
  // return instance.get('categories', { params: params })
  return httpBase({
    url: '/categories',
    params: params
  })
}

export function addGoodsCate(data) {
  // return instance.post('categories', params)
  return httpBase({
    url: '/categories',
    method: 'post',
    data: data
  })
}

export function getGoodsAttributes(id, sel) {
  // return instance.get(`/categories/${id}/attributes`, { params: { sel: sel } })
  return httpBase({
    url: `/categories/${id}/attributes`,
    params: { sel: sel }
  })
}

export function addGoodsAttr(id, data) {
  // return instance.post(`/categories/${id}/attributes`, params)
  return httpBase({
    url: `/categories/${id}/attributes`,
    method: 'post',
    data: data
  })
}

export function editGoodAttr(params) {
  // return instance.put(`/categories/${params.id}/attributes/${params.attr_id}`, params)
  return httpBase({
    url: `/categories/${params.id}/attributes/${params.attr_id}`,
    method: 'put',
    data: params
  })
}

export function deleteGoodAttr(id, attrId) {
  // return instance.delete(`/categories/${id}/attributes/${attrId}`)
  return httpBase({
    url: `/categories/${id}/attributes/${attrId}`,
    method: 'delete'
  })
}

export function getGoodsList(params) {
  // return instance.get('/goods', { params: params })
  return httpBase({
    url: '/goods',
    params: params
  })
}

export function addGood(data) {
  // return instance.post('/goods', params)
  return httpBase({
    url: '/goods',
    method: 'post',
    data: data
  })
}
