import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/views/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/views/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/views/exception/403'),
    },
    {
      path: '/500',
      name: '500',
      component: () => import('@/views/exception/500'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'Home',
          name: '主页',
          meta: {
            icon: 'dashboard'
          },
          component: () => import('@/views/dashboard/home'),
        },
        {
          path: 'Dashboard',
          name: '统计面板',
          meta: {
            icon: 'dashboard'
          },
          component: BlankView,
          children: [
            {
              path: 'Analysis',
              name: '分析页',
              component: () => import('@/views/dashboard/analysis'),
            }
          ]
        },
        {
          path: 'System',
          name: '系统管理',
          meta: {
            icon: 'setting'
          },
          component: BlankView,
          children: [
            {
              path: 'User',
              name: '用户管理',
              component: () => import('@/views/system/user/index'),
            },{
              path: 'Role',
              name: '角色管理',
              component: () => import('@/views/system/role/index'),
            },{
              path: 'Menu',
              name: '菜单管理',
              component: () => import('@/views/system/menu/index'),
            },{
              path: 'Dept',
              name: '部门管理',
              component: () => import('@/views/system/dept/index'),
            },{
              path: 'position',
              name: '岗位管理',
              component: () => import('@/views/system/position/index'),
            }
          ]
        }
      ]
    }
  ]
}

export default options
