import request from '../utils/request'

export function page(query, data) {
  return request({
    url: '/system/website/page',
    method: 'post',
    params: query,
    data
  })
}

export function getOne(query) {
  return request({
    url: '/system/website/getOne',
    method: 'get',
    params: query
  })
}

export function count(query) {
  return request({
    url: '/system/website/count',
    method: 'get',
    params: query
  })
}

export function save(data) {
  return request({
    url: '/system/website/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/system/website/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/system/website/remove',
    method: 'post',
    data
  })
}
