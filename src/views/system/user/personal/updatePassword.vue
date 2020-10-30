<template>
  <a-form-model ref="form" :model="data" :rules="rules" v-bind="layout">
    <a-form-model-item :label="$t('oldPassword')" prop="old_password">
      <a-input :placeholder="$t('oldPasswordPlaceholder')" v-model="data.old_password" type="password"/>
    </a-form-model-item>
    <a-form-model-item :label="$t('newPassword')" prop="new_password1">
      <a-input :placeholder="$t('newPasswordPlaceholder')" v-model="data.new_password1" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item :label="$t('confirmPassword')" prop="new_password2">
      <a-input :placeholder="$t('confirmPasswordPlaceholder')" v-model="data.new_password2" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{offset: 8}">
      <a-button type="primary" @click="submitPassword" :loading="loading">
        {{$t('submit')}}
      </a-button>
      <a-button style="margin-left: 10px" @click="resetForm('form')" :loading="loading">
        {{$t('reset')}}
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import {updatePassword} from '@/api/user'
import {decrypt, encrypt} from '@/utils/rsaEncrypt'
import {logout} from '@/api/user' 

export default {
  i18n: require('./i18n'),
  data() {
    return {
      loading: false,
      data: {
        old_password: '',
        new_password1: '',
        new_password2: '',        
      },
      rules: {
        old_password: [
          {required: true, message: this.$t('enterOldPassword'), trigger: 'blur' }
        ],
        new_password1: [
          {required: true, message: this.$t('enterNewPassword'), trigger: 'blur' },
          { min: 6, max: 20, message: this.$t('passLength'), trigger: 'blur' }
        ],
        new_password2: [{required: true, validator: this.confirmPassword, trigger: 'change' }],       
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    confirmPassword(rule, value, callback){
      if (value === '') {
        callback(new Error(this.$t('confirmPasswordAgain')));
      } else if (value !== this.data.new_password1) {
        callback(new Error(this.$t('inconsistent')));
      } else {
        callback();
      }
    },
    submitPassword() {
      var vm = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          var data = {old_password: encrypt(this.data.old_password), new_password1: encrypt(this.data.new_password1), new_password2: encrypt(this.data.new_password2)}
          updatePassword(data).then(res => {
            this.loading = false
            logout()
            this.$message.success(this.$t('passwordUpdateSuccess'));
          }).catch(() => { 
            this.loading = false
            console.log('update user password error')
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
