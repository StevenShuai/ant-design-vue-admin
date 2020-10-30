<template>
  <a-layout-header :class="[headerTheme, 'admin-header']">
    <div :class="['admin-header-wide', layout, pageWidth]">
      <router-link v-if="isMobile || layout === 'head'" to="/" :class="['logo', isMobile ? null : 'pc', headerTheme]">
        <img width="32" src="@/assets/images/logo.png" />
        <h1 v-if="!isMobile">{{systemHeaderName}}</h1>
      </router-link>
      <a-divider v-if="isMobile" type="vertical" />
      <a-icon v-if="layout !== 'head'" style="float:left" class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggleCollapse"/>
      <div v-if="layout !== 'side' && !isMobile" class="admin-header-menu" :style="`width: ${menuWidth};`">
        <i-menu class="head-menu" :theme="headerTheme" mode="horizontal" :options="menuData" @select="onSelect"/>
      </div>
      <div v-if="layout=='side'" style="float:left; padding-top:19px">
        <header-breadcrumb :breadcrumb="breadcrumb"/>
      </div>
      <div :class="['admin-header-right', headerTheme]">
          <header-notice class="header-item"/>
          <header-avatar class="header-item"/>
          <a-dropdown class="lang header-item">
            <div>
              <a-icon type="global"/> {{langAlias}}
            </div>
            <a-menu @click="val => setLang(val.key)" :selected-keys="[lang]" slot="overlay">
              <a-menu-item v-for=" lang in langList" :key="lang.key">{{lang.key.toLowerCase() + ' ' + lang.name}}</a-menu-item>
            </a-menu>
          </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import HeaderNotice from './HeaderNotice'
import HeaderAvatar from './HeaderAvatar'
import IMenu from '@/components/menu/menu'
import {mapState, mapMutations} from 'vuex'
import {getI18nKey} from '@/utils/routerUtil'
import HeaderBreadcrumb from './HeaderBreadcrumb'

export default {
  name: 'AdminHeader',
  components: {IMenu, HeaderAvatar, HeaderNotice, HeaderBreadcrumb},
  props: ['collapsed', 'menuData'],
  data() {
    return {
      langList: [
        {key: 'CN', name: '简体中文', alias: '简体'},
        {key: 'US', name: 'English', alias: 'English'}
      ],
      searchActive: false
    }
  },
  computed: {
    ...mapState('setting', ['theme', 'isMobile', 'layout', 'systemHeaderName', 'lang', 'pageWidth']),
    headerTheme () {
      if (this.layout == 'side' && this.theme.mode == 'dark' && !this.isMobile) {
        return 'light'
      }
      return this.theme.mode
    },
    langAlias() {
      let lang = this.langList.find(item => item.key == this.lang)
      return lang.name
    },
    menuWidth() {
      const {layout, searchActive} = this
      const headWidth = layout === 'head' ? '1236px' : '100%'
      const extraWidth = searchActive ? '564px' : '364px'
      return `calc(${headWidth} - ${extraWidth})`
    },
    breadcrumb() {
      let page = this.page
      let breadcrumb = page && page.breadcrumb
      if (breadcrumb) {
        let i18nBreadcrumb = []
        breadcrumb.forEach(item => {
          i18nBreadcrumb.push(this.$t(item))
        })
        return i18nBreadcrumb
      } else {
        return this.getRouteBreadcrumb()
      }
    },
  },
  methods: {
    toggleCollapse () {
      this.$emit('toggleCollapse')
    },
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    },
    getRouteBreadcrumb() {
      let routes = this.$route.matched
      let breadcrumb = []
      routes.forEach(route => {
        const path = route.path.length === 0 ? '/home' : route.path
        breadcrumb.push(this.$t(getI18nKey(path)))
      })
      return breadcrumb
    },
    ...mapMutations('setting', ['setLang'])
  }
}
</script>

<style lang="less" scoped>
@import "index";
</style>
