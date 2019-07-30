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
  // 获取电影接口
  getMovieList(params) {
    return request({
      method: 'Get',
      url: '/admin/movie/list',
      params: params
    })
  },
  // 删除图片
  delPlotPics(params) {
    return request({
      method: 'Post',
      url: '/admin/movie/delPlotPics',
      params: params
    })
  },
  // 创建电影
  createMovie(params) {
    return request({
      method: 'Post',
      url: '/admin/movie/createMovie',
      params: params
    })
  },
  // 获取官方用户
  getOfficialUsers(params) {
    return request({
      method: 'GET',
      url: '/admin/user/list',
      params: params
    })
  }
}
