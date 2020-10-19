import { instance } from './axios'

export function getReports() {
  return instance.get('reports/type/1')
}
