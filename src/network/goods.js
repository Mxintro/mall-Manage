import { instance } from './axios'

export function getGoodsCate(params) {
  return instance.get('categories', { params: params })
}
