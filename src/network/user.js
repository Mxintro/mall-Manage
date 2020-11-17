import { httpBase } from './axios'

export function getUsers(params) {
  // return instance.get('/users', { params: params })
  return httpBase({
    url: '/users',
    params: params
  })
}

export function addUser(data) {
  // return instance.post('/users', params)
  return httpBase({
    url: '/users',
    method: 'post',
    data: data
  })
}

export function userStateChange({uId, type}) {
  // return instance.put(`users/${uId}/state/${type}`)
  return httpBase({
    url: `users/${uId}/state/${type}`,
    method: 'put'
  })
}

export function editUser({id, email, mobile}) {
  // return instance.put(`/users/${id}`, { email, mobile })
  return httpBase({
    url: `/users/${id}`,
    method: 'put',
    data: { email, mobile }
  })
}

export function deleteUser(id) {
  // return instance.delete(`/users/${id}`)
  return httpBase({
    url: `/users/${id}`,
    method: 'delete'
  })
}

export function setUserRloe(id, rid) {
  // return instance.put(`users/${id}/role`, {rid: rid})
  return httpBase({
    url: `users/${id}/role`,
    method: 'put',
    data: {rid: rid}
  })
}
