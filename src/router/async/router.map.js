// 视图组件
const view = {
  tabs: () => import('@/layouts/tabs'),
  blank: () => import('@/layouts/BlankView'),
  page: () => import('@/layouts/PageView')
}

// 路由组件注册
const routerMap = {
  login: {
    path: '/login',
    component: () => import('@/views/login')
  },
  exp404:
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/exception/404'),
  },
  exp403:
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/exception/403'),
  },
  exp500:
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/exception/500'),
  },
  root: {
    path: '/',
    name: '首页',
    redirect: '/login',
    component: view.tabs
  },
  dashboard: {
    name: '统计面板',
    icon: 'dashboard',
    component: view.blank
  },
  analysis: {
    name: '分析页',
    icon: 'star',
    component: () => import('@/views/dashboard/analysis')
  },
  home : {
    name: '主页',
    icon: 'home',
    component: () => import('@/views/dashboard/home')
  },
  system : {
    name: '系统管理',
    icon: 'setting',
    component: view.blank
  },
  user: {
    name: '用户管理',
    icon: 'star',
    component: () => import('@/views/system/user/index')
  },
  role: {
    name: '角色管理',
    icon: 'star',
    component: () => import('@/views/system/role/index')
  },
  menu: {
    name: '菜单管理',
    icon: 'star',
    component: () => import('@/views/system/menu/index')
  },
  dept: {
    name: '部门管理',
    icon: 'star',
    component: () => import('@/views/system/dept/index')
  },
  position: {
    name: '岗位管理',
    icon: 'star',
    component: () => import('@/views/system/position/index')
  },
  notice: {
    name: '消息列表',
    invisible: true,
    path: 'Notice',
    component: () => import('@/layouts/header/HeaderNoticeAll')
  },
  profile: {
    name: '个人中心',
    invisible: true,
    component: () => import('@/views/system/user/personal/personal'),
  },
}
export default routerMap
