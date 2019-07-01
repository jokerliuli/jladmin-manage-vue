import request from '../utils/request'

export function page(query, data) {
  return request({
    url: '/system/menu/page',
    method: 'post',
    params: query,
    data
  })
}

export function getOne(query) {
  return request({
    url: '/system/menu/getOne',
    method: 'get',
    params: query
  })
}

export function getTree() {
  return request({
    url: '/system/menu/tree',
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/system/menu/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/system/menu/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/system/menu/remove',
    method: 'post',
    data
  })
}
