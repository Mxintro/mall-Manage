import { instance } from './axios'

export function getRights(param) {
  return instance.get(`/rights/${param}`)
}
