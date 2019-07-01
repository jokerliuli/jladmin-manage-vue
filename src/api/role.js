import request from '../utils/request'

export function page(query, data) {
  return request({
    url: '/system/role/page',
    method: 'post',
    params: query,
    data
  })
}

export function getOne(query) {
  return request({
    url: '/system/role/getOne',
    method: 'get',
    params: query
  })
}

export function count(query) {
  return request({
    url: '/system/role/count',
    method: 'get',
    params: query
  })
}

export function save(data) {
  return request({
    url: '/system/role/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/system/role/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/system/role/remove',
    method: 'post',
    data
  })
}
