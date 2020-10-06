import { instance } from './axios'

export function getRights(param) {
  return instance.get(`/rights/${param}`)
}

export function getRoles() {
  return instance.get('/roles')
}

export function editRoles(params) {
  return instance.put(`/roles/${params.id}`, params)
}
