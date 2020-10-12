import { instance } from './axios'

export function getGoodsCate(params) {
  return instance.get('categories', { params: params })
}

export function addGoodsCate(params) {
  return instance.post('categories', params)
}