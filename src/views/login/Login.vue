<template>
  <common-layout>
    <div class="login">
      <a-form class="login-form" @submit="onSubmit" :form="form">
        <div class="top">
          <div class="header">
            <img alt="logo" class="logo" src="@/assets/images/logo.png" />
            <span class="title">{{$t('systemName')}}</span>
          </div>
          <div class="desc">{{$t('domanName')}}</div>
        </div>
        <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
        <a-dropdown>
            <div>
              <a-button style="width:400px;text-align:left;height:40px"><a-icon type="global"/> {{langAlias()}}</a-button>
            </div>
            <a-menu @click="val => setLang(val.key)" :selected-keys="[langKey]" slot="overlay">
              <a-menu-item v-for=" lang in langList" :key="lang.key">{{lang.key.toLowerCase() + ' ' + lang.name}}</a-menu-item>
            </a-menu>
        </a-dropdown>
        <a-form-item style="padding-top: 29px;">
          <a-input
            autocomplete="autocomplete"
            size="large"
            :placeholder="$t('usernamePlaceholder')"
            v-decorator="['username', {rules: [{ required: true, message: $t('usernameFormVali'), whitespace: true}]}]"
          >
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            autocomplete="autocomplete"
            type="password"
            :placeholder="$t('passwordPlaceholder')"
            v-decorator="['password', {rules: [{ required: true, message: $t('passwordFormVali'), whitespace: true}]}]"
          >
          <a-icon slot="prefix" type="lock" />
          </a-input>
        </a-form-item>
        <a-checkbox  v-model="rememberMe">{{$t('rememberMeMsg')}}</a-checkbox>
        <a-form-item>
          <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">
            <span v-if="!logging">{{$t('loginBtn')}}</span>
            <span v-else>{{$t('loginExcuteBtn')}}</span>
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from '@/layouts/CommonLayout'
import {login, getRoutesConfig} from '@/api/user'
import {setAuthorization} from '@/utils/request'
import {loadRoutes} from '@/utils/routerUtil'
import {mapMutations, mapState} from 'vuex'
import Cookies from 'js-cookie'
import {decrypt, encrypt} from '@/utils/rsaEncrypt'

export default {
  i18n: require('./i18n'),
  name: 'Login',
  components: {CommonLayout},
  data () {
    return {
      logging: false,
      error: '',
      rememberMe: false,
      langKey: 'CN',
      form: this.$form.createForm(this),
      langList: [
        {key: 'CN', name: '简体中文', alias: '简体'},
        {key: 'US', name: 'English', alias: 'English'}
      ],
    }
  },
  mounted(){
    this.getCookie()
  },
  computed: {
    ...mapState('setting', ['lang', 'passCookieExpires', 'tokenCookieExpires'])
  },
  methods: {
    ...mapMutations('account', ['setUser', 'setRoles']),
    ...mapMutations('setting', ['setLang']),
    getCookie() {
      const username = Cookies.get('username')
      const password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      const language = Cookies.get('language')

      this.langKey = language === undefined ? this.lang : language
      this.rememberMe = rememberMe === undefined ? false : Boolean(rememberMe)

      if(username && password){
        this.form.setFieldsValue({username: username, password: decrypt(password)})
      }
    },
    langAlias() {
      let lang = this.langList.find(item => item.key == this.lang)
      return lang.name
    },
    onSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          this.logging = true
          const username = this.form.getFieldValue('username')
          const password = encrypt(this.form.getFieldValue('password'))

          localStorage.setItem(process.env.VUE_APP_LANG_KEY, this.lang)
          if (this.rememberMe) {
            Cookies.set('username', username, { expires: this.passCookieExpires })
            Cookies.set('password', password, { expires: this.passCookieExpires })
            Cookies.set('rememberMe', this.rememberMe, { expires: this.passCookieExpires })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }
          
          login(username, password).then(this.afterLogin).catch(() => {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
            this.logging = false
          })
        }
      })
    },
    afterLogin(res) {
      this.logging = false
      const loginResData = res.data
      this.setUser(loginResData.user)
      this.setRoles(loginResData.perms)
      setAuthorization({token: loginResData.token, expireAt: this.tokenCookieExpires})
      //获取路由配置
      getRoutesConfig({user_id: loginResData.user.id}).then(result => {
        const routesConfig = result.data
        loadRoutes({router: this.$router, store: this.$store, i18n: this.$i18n}, routesConfig)
          this.$router.push('/home')
        })
    }
  }
}
</script>

<style lang="less" scoped>
  .common-layout{
    .top {
      text-align: center;
      .header {
        height: 44px;
        line-height: 44px;
        a {
          text-decoration: none;
        }
        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
        }
        .title {
          font-size: 33px;
          color: @title-color;
          font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: @text-color-second;
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }
    .login{
      width: 450px;
      margin: 0 auto;
      @media screen and (max-width: 576px) {
        width: 95%;
      }
      @media screen and (max-width: 320px) {
        .captcha-button{
          font-size: 14px;
        }
      }
      .login-form {
        background:#fff;
        padding: 25px 25px 5px 25px
      }
      .icon {
        font-size: 24px;
        color: @text-color-second;
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: @primary-color;
        }
      }
    }
  }
</style>
