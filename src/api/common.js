import request from '../libs/request'

export function getInstanceById(data) {
  return request('post', '/process/instance/getInstanceById', data)
}
