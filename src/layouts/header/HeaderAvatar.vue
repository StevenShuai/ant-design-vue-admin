<template>
  <a-dropdown>
    <div class="header-avatar" style="cursor: pointer">
      <a-avatar class="avatar" size="small" slot="avatar" :src="user.gender==='1'?avatarMan:avatarWoman"/>
      <span class="name">{{user.nick_name}}</span>
    </div>
    <a-menu :class="['avatar-menu']" slot="overlay">
      <a-menu-item>
        <a-icon type="user" />
        <span @click="personalCenter">{{$t('center')}}</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item @click="logout">
        <a-icon style="margin-right: 8px;" type="poweroff" />
        <span>{{$t('signOutBtn')}}</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {logout} from '@/api/user' 
  import avatarMan from '@/assets/images/man.jpg'
  import avatarWoman from '@/assets/images/woman.jpg'

  export default {
    name: 'HeaderAvatar',
    i18n: require('./i18n'), 
    computed: {
      ...mapGetters('account', ['user']),
    },
    data () {
      return {
        avatarMan: avatarMan,
        avatarWoman: avatarWoman
      }
    },
    methods: {
      personalCenter() {
        this.$router.push('/profile')
      },
      logout() {
        var vm = this
        this.$confirm({
          title: this.$t('confirmHeader'),
          content: this.$t('logoutConfirmMsg'),
          onOk() {
            logout(vm.user.user_name).then(res => {
                location.reload()  // 为了重新实例化vue-router对象 避免bug
            }).catch(() => {
                console.log('logout failed')
            })
          },
          onCancel() {},
        });
      }
    }
  }
  </script>

  <style lang="less">
    .header-avatar{
      display: inline-flex;
      .avatar, .name{
        align-self: center;
      }
      .avatar{
        margin-right: 8px;
      }
      .name{
        font-weight: 500;
      }
    }
    .avatar-menu{
      width: 150px;
    }

</style>
