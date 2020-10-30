/**
 * 判断是否有路由需要的角色
 * @param authority 路由权限配置
 * @param roles 用户角色集合
 */
function hasRole(authority, roles) {
  if(roles.findIndex(role => role === 'admin') !== -1){
    return true
  }else if(Array.isArray(authority)) {
    return roles.findIndex(role => {
      return authority.findIndex(item => item === role) !== -1
    }) !== -1
  } else {
    return roles.findIndex(role => role === authority) !== -1
  }
}

/**
 * 路由权限校验
 * @param route 路由
 * @param roles 用户角色集合
 * @returns {boolean}
 */
function hasAuthority(route, roles) {
  const authority = route.meta.authority
  if(authority==="*" || hasRole(authority, roles)){
    return true
  }else{
    return false
  }
}

/**
 * 根据权限配置过滤菜单数据
 * @param menuData
 * @param roles
 */
function filterMenu(menuData, roles) {
  menuData.forEach(menu => {
    if (menu.meta && menu.meta.invisible === undefined) {
      menu.meta.invisible = !hasAuthority(menu, roles)
      if (menu.children && menu.children.length > 0) {
        filterMenu(menu.children, roles)
      }
    }
  })
}

export {filterMenu, hasAuthority}
