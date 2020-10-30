import {loadRoutes, loadGuards} from '@/utils/routerUtil'
import {loadInterceptors} from '@/utils/request'
import guards from '@/router/guards'

/**
 * 启动引导方法
 * 应用启动时需要执行的操作放在这里
 * @param router 应用的路由实例
 * @param store 应用的 vuex.store 实例
 * @param i18n 应用的 vue-i18n 实例
 */
function bootstrap({router, store, i18n, notification}) {
  // 加载 axios 拦截器
  loadInterceptors({router, store, i18n, notification})
  // 加载路由
  loadRoutes({router, store, i18n})
  // 加载路由守卫
  loadGuards(guards, {router, store, i18n, notification})
}

export default bootstrap