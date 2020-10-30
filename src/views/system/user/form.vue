<template>
  <a-modal
      width="680px"
      :title="$parent.getFormTitle"
      centered
      :visible="$parent.dialog"
      :confirmLoading="$parent.confirmLoading"
      @ok="submit"
      @cancel="cancel"
    >
      <a-form-model
        ref="form"
        :model="$parent.form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="username" :label="$t('username')" prop="user_name">
          <a-input :placeholder="$t('usernamePlaceholder')" v-model="$parent.form.user_name" />
        </a-form-model-item>
        <a-form-model-item ref="nickname" :label="$t('nickname')" prop="nick_name">
          <a-input :placeholder="$t('nicknamePlaceholder')" v-model="$parent.form.nick_name" />
        </a-form-model-item>
        <a-form-model-item ref="email" :label="$t('email')" prop="email">
          <a-input :placeholder="$t('emailPlaceholder')" v-model="$parent.form.email" />
        </a-form-model-item>
        <a-form-model-item ref="phone" :label="$t('phone')" prop="phone">
          <a-input :placeholder="$t('phonePlaceholder')" v-model="$parent.form.phone" />
        </a-form-model-item>
        <a-form-model-item ref="gender" :label="$t('gender')" prop="gender">
          <a-radio-group  v-model="$parent.form.gender" name="radioGroup">
            <a-radio value="1">{{$t('genderMan')}}</a-radio>
            <a-radio value="2">{{$t('genderWoman')}}</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item ref="is_activate" :label="$t('enable')" prop="is_activate">
          <a-radio-group  v-model="$parent.form.is_activate" name="radioGroup">
            <a-radio :value="true">{{$t('enableTrue')}}</a-radio>
            <a-radio :value="false">{{$t('enableFalse')}}</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item ref="is_admin" :label="$t('admin')" prop="is_admin">
          <a-radio-group  v-model="$parent.form.is_admin" name="radioGroup">
            <a-radio :value="true">{{$t('adminTrue')}}</a-radio>
            <a-radio :value="false">{{$t('adminFalse')}}</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item ref="dept" :label="$t('dept')" prop="dept">
          <a-tree-select
            v-model="$parent.form.dept"
            style="width: 100%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto'}"
            :tree-data="depts"
            :placeholder="$t('departmentPlaceholder')"
            :replaceFields="deptReplaceFields"
          >
          </a-tree-select>
        </a-form-model-item>
        <a-form-model-item ref="position" :label="$t('position')" prop="position">
          <a-select :placeholder="$t('positionPlaceholder')" v-model="$parent.form.position">
            <a-select-option v-for="position in positions" :key="position.position_id" :value="position.position_id">{{position.position_name}}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item ref="roles" :label="$t('role')" prop="roles">
          <a-select
            mode="multiple"
            v-model="$parent.form.roles"
            style="width: 100%"
            :placeholder="$t('rolePlaceholder')"
          >
            <a-select-option v-for="role in roles" :key="role.role_id">
                {{role.role_name}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
  </a-modal>
</template>
<script>
import {getPosition} from '@/api/position'

export default {
  i18n: require('./i18n'),
  props: {
    depts:{
      type: Array,
      required: true,
    },
    positions:{
      type: Array,
      required: true,
    },
    roles:{
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      position: null,
      deptReplaceFields: {
        children: 'children',
        title: 'dept_name',
        key: 'dept_id',
        value: 'dept_id'
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      rules: {
        user_name: [
          { required: true, message: this.$t('noUsernameMsg'), trigger: 'blur' }
        ],
        nick_name: [{ required: true, message: this.$t('noNicknameMsg'), trigger: 'blur' }],
        phone: [{ required: true, pattern:"^[0-9]*$", message: this.$t('noPhoneMsg'), trigger: 'blur' }],
        gender: [{ required: true, message: this.$t('noGenderMsg'), trigger: 'blur' }],
        is_activate: [{required: true, message: this.$t('noStatusMsg'), trigger: 'blur'}],
        is_admin: [{required: true, message: this.$t('noAdminMsg'), trigger: 'blur'}],
        dept: [{required: true, message: this.$t('noDeptMsg'), trigger: 'change'}],
        position: [{required: true, message: this.$t('noPositionMsg'), trigger: 'change'}],
        email: [{required: true, type:"email", message: this.$t('noEmailMsg'), trigger: 'blur'}],
        roles: [{required: true,  message: this.$t('noRoleMsg'), trigger: 'change'}]
      }
    };
  },
  methods: {
    cancel(){
      this.$refs['form'].clearValidate()
      this.$parent.cancel()
    },
    submit(){
      this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$parent.submit()
          }
      })
    }
  }
};
</script>