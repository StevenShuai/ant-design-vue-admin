<template>
  <a-config-provider :locale="locale">
    <router-view/>
  </a-config-provider>
</template>

<script>
import {enquireScreen} from './utils/util'
import {mapState, mapMutations} from 'vuex'
import themeUtil from '@/utils/themeUtil';
import {getI18nKey} from '@/utils/routerUtil'

export default {
  name: 'App',
  data() {
    return {
      locale: {}
    }
  },
  created () {
    this.setHtmlTitle()
    var storageLang = localStorage.getItem(process.env.VUE_APP_LANG_KEY)
    if(storageLang){
      this.setLanguage(storageLang)
      this.setLang(storageLang)
    }else{
      this.setLanguage(this.lang)
    }
    enquireScreen(isMobile => this.setDevice(isMobile))
  },
  mounted() {
   this.setWeekModeTheme(this.weekMode)
  },
  watch: {
    weekMode(val) {
      this.setWeekModeTheme(val)
    },
    lang(val) {
      this.setLanguage(val)
    },
    $route() {
      this.setHtmlTitle()
    },
    'theme.mode': function(val) {
      let closeMessage = this.$message.loading(`您选择了主题模式 ${val}, 正在切换...`)
      themeUtil.changeThemeColor(this.theme.color, val).then(() => {
        setTimeout(closeMessage, 1000)
      })
    },
    'theme.color': function(val) {
      let closeMessage = this.$message.loading(`您选择了主题色 ${val}, 正在切换...`)
      themeUtil.changeThemeColor(val, this.theme.mode).then(() => {
        setTimeout(closeMessage, 1000)
      })
    }
  },
  computed: {
    ...mapState('setting', ['theme', 'weekMode', 'lang']),
  },
  methods: {
    ...mapMutations('setting', ['setDevice', 'setLang']),
    setWeekModeTheme(weekMode) {
      if (weekMode) {
        document.body.classList.add('week-mode')
      } else {
        document.body.classList.remove('week-mode')
      }
    },
    setLanguage(lang) {
      this.$i18n.locale = lang
      switch (lang) {
        case 'CN':
          this.locale = require('ant-design-vue/es/locale-provider/zh_CN').default
          break
        case 'HK':
          this.locale = require('ant-design-vue/es/locale-provider/zh_TW').default
          break
        case 'US':
        default:
          this.locale = require('ant-design-vue/es/locale-provider/en_US').default
          break
      }
    },
    setHtmlTitle() {
      const route = this.$route
      const key = route.path === '/' ? 'home.name' : getI18nKey(route.matched[route.matched.length - 1].path)
      document.title = process.env.VUE_APP_NAME + ' | ' + this.$t(key)
    },
  }
}
</script>

<style lang="less" scoped>
  #id{
  }
</style>
