import Mock from 'mockjs'

Mock.mock(`${process.env.VUE_APP_API_BASE_URL}/routes`, 'get', () => {
  let result = {}
  result.code = 0
  result.data = [{
    router: 'root',
    children: [
      {
        router: 'home',
        name: '首页'
      },
      {
        router: 'dashboard',
        children: ['analysis'],
      },
      {
        router: 'system',
        children: ['role', 'dept', 'menu', 'job', {
          router: 'user',
          permission: 'admin',
        }]
      }
    ]
  }]
  return result
})
