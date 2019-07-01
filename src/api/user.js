import request from '../utils/request'

export function page(query, data) {
  return request({
    url: '/system/user/page',
    method: 'post',
    params: query,
    data
  })
}

export function getOne(query) {
  return request({
    url: '/system/user/getOne',
    method: 'get',
    params: query
  })
}

export function count(query) {
  return request({
    url: '/system/user/count',
    method: 'get',
    params: query
  })
}

export function save(data) {
  return request({
    url: '/system/user/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/system/user/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/system/user/remove',
    method: 'post',
    data
  })
}
