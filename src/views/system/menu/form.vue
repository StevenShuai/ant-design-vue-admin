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
        <a-form-model-item ref="type" :label="$t('type')" prop="name">
          <a-radio-group v-model="$parent.form.menu_type">
            <a-radio-button :value="1">{{$t('typeDirector')}}</a-radio-button>
            <a-radio-button :value="2">{{$t('typeMenu')}}</a-radio-button>
            <a-radio-button :value="3">{{$t('typeButton')}}</a-radio-button>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item ref="name" :label="$parent.form.menu_type===1?$t('directorName'):$parent.form.type===2?$t('menuName'):$t('buttonName')" prop="menu_name">
          <a-input :placeholder="$t('namePlaceholder')" v-model="$parent.form.menu_name" />
        </a-form-model-item>
        <a-form-model-item ref="sort" :label="$t('sort')" prop="menu_sort">
          <a-input-number :min="1" :max="100" :default-value="1" v-model="$parent.form.menu_sort"/>
        </a-form-model-item>
        <a-form-model-item v-if="$parent.form.menu_type!==1" ref="permission" :label="$t('permissionKey')" prop="permission">
          <a-input :placeholder="$t('permissionKeyPlaceholder')" v-model="$parent.form.permission" />
        </a-form-model-item>
        <a-form-model-item v-if="$parent.form.menu_type!==3" ref="router" :label="$t('key')" prop="router">
          <a-input :placeholder="$t('routerPlaceholder')" v-model="$parent.form.router" />
        </a-form-model-item>
        <a-form-model-item v-if="$parent.form.menu_type!==3" ref="sidebar" :label="$t('sidebar')" prop="sidebar">
          <a-radio-group  v-model="$parent.form.sidebar" name="sidebar">
            <a-radio :value="true">{{$t('true')}}</a-radio>
            <a-radio :value="false">{{$t('false')}}</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item ref="enabled" :label="$t('enable')" prop="enabled">
          <a-radio-group  v-model="$parent.form.is_activate" name="radioGroup">
            <a-radio :value="true">{{$t('enableTrue')}}</a-radio>
            <a-radio :value="false">{{$t('enableFalse')}}</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item ref="parent" :label="$t('pid')" prop="parent">
          <a-tree-select
            v-model="$parent.form.pid"
            style="width: 100%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto'}"
            :tree-data="menuTreeData"
            :placeholder="$t('parentMenuPlaceholder')"
            :replaceFields="replaceFields"
          >
          </a-tree-select>
        </a-form-model-item>
      </a-form-model>
  </a-modal>
</template>
<script>
export default {
  props: {
    menuTreeData: {
      type: Array,
      required: true
    },
  },
  i18n: require('./i18n'),
  data() {
    return {
      replaceFields: {
        children: 'children',
        title: 'menu_name',
        key: 'menu_id',
        value: 'menu_id'
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      rules: {
        menu_name: [
          { required: true, message: this.$t('noMenuNameMsg'), trigger: 'blur' }
        ],
        menu_sort: [{ required: true, message: this.$t('noSortMsg'), trigger: 'blur' }],
        router: [{ required: true, message: this.$t('noRouterMsg'), trigger: 'blur' }],
        permission: [{ required: true, message: this.$t('noPermissionMsg'), trigger: 'blur' }],
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