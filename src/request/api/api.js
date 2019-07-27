import { request } from '../http'

// eslint-disable-next-line no-undef
// eslint-disable-next-line no-unused-vars
var Api = {}
export default Api = {
  // 测试
  getTestData(params) {
    return request({
      method: 'Get',
      url: '/dev-api/table/list',
      params: params
    })
  },
  getMovieList(params) {
    return request({
      method: 'Get',
      url: '/admin/movie/list',
      params: params
    })
  }
}
