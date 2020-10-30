import store from '@/store'

export default {
  inserted(node, binding) {
    const { value } = binding
    const roles = store.getters['account/roles']
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        node.parentNode && node.parentNode.removeChild(node)
      }
    } else {
      throw new Error(`use example： v-permission="['admin','editor']"`)
    }
  }
}
