<template>
    <a-form-model :rules="rules" :model="formData" v-bind="layout" ref="form">
      <a-form-model-item :label="$t('nickName')" prop="nick_name">
        <a-input :placeholder="$t('nickNamePlaceholder')" v-model="formData.nick_name">
        </a-input>
      </a-form-model-item>
      <a-form-model-item :label="$t('phoneNum')" prop="phone">
        <a-input :placeholder="$t('phonePlaceholder')" v-model="formData.phone">
        </a-input>
      </a-form-model-item>
      <a-form-model-item :label="$t('mail')" prop="email">
        <a-input :placeholder="$t('emailPlaceholder')" v-model="formData.email">
        </a-input>
      </a-form-model-item>
      <a-form-model-item :label="$t('gender')">
        <a-radio-group v-model="formData.gender">
          <a-radio value="1">
            {{$t('man')}}
          </a-radio>
          <a-radio value="2">
            {{$t('woman')}}
          </a-radio>
        </a-radio-group>
    </a-form-model-item>
      <a-form-model-item :wrapper-col="{offset: 8}">
        <a-button type="primary" @click="saveConfiguration" :loading="loading">
          {{$t('save')}}
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('form')" :loading="loading">
          {{$t('reset')}}
        </a-button>
      </a-form-model-item>
    </a-form-model>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import {edit} from '@/api/user'
import store from '@/store'

export default {
  i18n: require('./i18n'),  
  data() {
    return {
      formData: {},
      rules: {
        nick_name: [{required: true, message: this.$t('enterNickname'), trigger: 'blur' }],
        phone: [{ required: true, pattern:"^[0-9]*$", message: this.$t('noPhoneMsg'), trigger: 'blur' }],
        email: [{type: 'email', required: true, message: this.$t('enterEmail'), trigger: 'change'}],       
      },
      loading: false,
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  computed: {
    ...mapGetters('account', ['user']),
  },
  created(){
    this.formData = JSON.parse(JSON.stringify(this.user))
  },
  methods: {
    saveConfiguration() {
      var vm = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          vm.loading = true
          edit(vm.formData).then(res => {
            this.$store.commit('account/setUser',res.data)
            vm.$message.success(vm.$t('userUpdateSuccess'))
            vm.loading = false
          }).catch(() => { 
            vm.loading = false
            console.log('update user info error')
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