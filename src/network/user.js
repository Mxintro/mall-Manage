import { instance } from './axios'

export function getUsers(params) {
  return instance.get('/users', { params: params })
}

export function addUser(params) {
  return instance.post('/users', params)
}

export function userStateChange({uId, type}) {
  return instance.put(`users/${uId}/state/${type}`)
}

export function editUser({id, email, mobile}) {
  return instance.put(`/users/${id}`, { email, mobile })
}