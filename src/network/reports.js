import { httpBase } from './axios'

export function getReports() {
  // return instance.get('reports/type/1')
  return httpBase({
    url: 'reports/type/1'
  })
}
