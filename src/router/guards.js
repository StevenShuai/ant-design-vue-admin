import {hasAuthority} from '@/utils/authority-utils'
import {loginIgnore} from '@/router/index'
import {checkAuthorization} from '@/utils/request'
import store from '@/store'

/**
 * 登录守卫
 * @param to
 * @param form
 * @param next
 * @param options
 */
const loginGuard = (to, from, next, options) => {
  // token未失效或者路由\name忽略验证则定向到该页面
  if(checkAuthorization() || loginIgnore.includes(to)){
    next()
  }else if(!checkAuthorization()){
    // 若token失效则重定向到login页面
    next({path: '/login'})
  }
}

/**
 * 权限守卫
 * @param to
 * @param form
 * @param next
 * @param options
 */
const authorityGuard = (to, from, next, options) => {
  const {store, notification} = options
  const errorTitle = {CN: '系统提示', US: 'System prompt'}
  const roles = store.getters['account/roles']
  if (!hasAuthority(to, roles)) {
    const expiredErrorMsg = {CN: `对不起，您无权访问页面: ${to.fullPath}，请联系管理员`, US: `Sorry, you do not have access to this page: ${to.fullPath}, please contact your administrator`}

    var lang = store.getters['setting/lang']
    notification['warning']({
      message: errorTitle[lang],
      description: expiredErrorMsg[lang],
      duration: 2
    });
    next({path: '/403'})
  } else {
    next()
  }
}

// /**
//  * 混合导航模式下一级菜单跳转重定向
//  * @param to
//  * @param from
//  * @param next
//  * @param options
//  * @returns {*}
//  */
// const redirectGuard = (to, from, next, options) => {
//   const {store} = options
//   if (store.state.setting.layout === 'mix') {
//     const firstMenu = store.getters['setting/firstMenu']
//     if (firstMenu.find(item => item.fullPath === to.fullPath)) {
//       store.commit('setting/setActivatedFirst', to.fullPath)
//       const subMenu = store.getters['setting/subMenu']
//       if (subMenu.length > 0) {
//         return next({path: subMenu[0].fullPath})
//       }
//     }
//   }
//   next()
// }

export default {
  i18n: require('./i18n'),
  beforeEach: [loginGuard, authorityGuard],
  afterEach: []
}
