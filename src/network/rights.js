import { httpBase } from './axios'

export function getRights(param) {
  // return instance.get(`/rights/${param}`)
  return httpBase({
    url: `/rights/${param}`
  })
}

export function getRoles() {
  // return instance.get('/roles')
  return httpBase({
    url: '/roles'
  })
}

export function editRoles(data) {
  // return instance.put(`/roles/${params.id}`, params)
  return httpBase({
    url: `/roles/${data.id}`,
    method: 'put',
    data: data
  })
}

export function addRoles(data) {
  // return instance.post('roles/', data)
  return httpBase({
    url: '/roles',
    method: 'post',
    data: data
  })
}

export function deleteRoleRight(roleId, rightId) {
  // return instance.delete(`roles/${roleId}/rights/${rightId}`)
  return httpBase({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}

export function setRoleRights(roleId, rightKeys) {
  // return instance.post(`roles/${roleId}/rights`, {rids: rightKeys})
  return httpBase({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: {rids: rightKeys}
  })
}
