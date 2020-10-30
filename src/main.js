import Vue from 'vue'
import App from './App.vue'
import {initRouter} from './router'
import './theme/index.less'
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import '@/mock'
import store from './store'
import 'animate.css/source/animate.css'
import Plugins from '@/plugins'
import {initI18n} from '@/utils/i18n'
import bootstrap from '@/bootstrap'
import permission from './components/permission'
// global css
import './assets/styles/index.scss'

const router = initRouter(store.state.setting.asyncRoutes)
const i18n = initI18n('CN', 'US')

Vue.use(Antd)
Vue.use(permission)
Vue.config.productionTip = false
Vue.use(Viser)
Vue.use(Plugins)

bootstrap({router, store, i18n, notification: Vue.prototype.$notification})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
