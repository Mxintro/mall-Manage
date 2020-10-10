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

export function addRoles(params) {
  return instance.post('roles/', params)
}

export function deleteRoleRight(roleId, rightId) {
  return instance.delete(`roles/${roleId}/rights/${rightId}`)
}

export function setRoleRights(roleId, rightKeys) {
  return instance.post(`roles/${roleId}/rights`, {rids: rightKeys})
}
