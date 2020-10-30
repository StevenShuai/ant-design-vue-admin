<template>
  <div>
    <a-row>
      <a-col style="padding: 0 12px" :span="8">
        <a-card :bordered="false" style="margin-top: 24px" :title="$t('personalInfo')">
          <span>
            <update-avatar :user_gender="user.gender"/>
          </span>
          <ul class="user-info">
              <li><a-icon type="login" /> {{$t('username')}}<div class="user-right">{{ user.user_name }}</div></li>
              <li><a-icon type="user" /> {{$t('nickName')}} <div class="user-right">{{ user.nick_name }}</div></li>
              <li><a-icon type="phone" /> {{$t('phoneNum')}} <div class="user-right">{{ user.phone }}</div></li>
              <li><a-icon type="mail" /> {{$t('mail')}} <div class="user-right">{{ user.email }}</div></li>
              <li><a-icon type="deployment-unit" /> {{$t('department')}} <div class="user-right"> {{ user.dept_name }}</div></li>
              <li><a-icon type="desktop" /> {{$t('position')}} <div class="user-right"> {{ user.position_name }}</div></li>
            </ul>
        </a-card>
      </a-col>
      <a-col style="padding: 0 12px" :span="16">
          <a-card style="margin-top: 24px;height:490px" :bordered="false" :body-style="{padding: '24px'}">
            <div>
              <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginTop:'-20px',marginBottom: '24px', paddingLeft: '16px'}">
                <a-tab-pane loading="true" :tab="$t('data')" key="1">
                  <update-info />
                </a-tab-pane>
                <a-tab-pane :tab="$t('password')" key="2"><a-row>
                  <update-password />
                </a-row></a-tab-pane>
              </a-tabs>
            </div>
          </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import updatePassword from './updatePassword'
import updateAvatar from './updateAvatar'
import updateInfo from './updateInfo'
import {mapGetters} from 'vuex'


export default {
  name: 'personal',
  components: {updatePassword,updateAvatar,updateInfo},
  i18n: require('./i18n'),
  computed: {
    ...mapGetters('account', ['user']),
  },
  
  data() {
    return {

    };
  },
  methods: {
    
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
.user-info {
    padding-left: 0;
    list-style: none;
    li{
      border-bottom: 1px solid #F0F3F4;
      padding: 11px 0;
      font-size: 13px;
    }
    .user-right {
      float: right;

      a{
        color: #317EF3;
      }
    }
  }
</style>
