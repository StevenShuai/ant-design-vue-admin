<template>
  <a-modal
      width="680px"
      :title="$parent.getFormTitle"
      centered
      :visible="$parent.dialog"
      :confirmLoading="$parent.confirmLoading || menuLoading"
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
        <a-form-model-item ref="role_name" :label="$t('name')" prop="role_name">
          <a-input :placeholder="$t('roleNamePlaceholder')" v-model="$parent.form.role_name" />
        </a-form-model-item>
        <a-form-model-item ref="is_activate" :label="$t('enable')" prop="is_activate">
          <a-radio-group  v-model="$parent.form.is_activate" name="radioGroup">
            <a-radio :value="true">{{$t('enableTrue')}}</a-radio>
            <a-radio :value="false">{{$t('enableFalse')}}</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item ref="authMenu" :label="$t('authMenu')" prop="authMenu">
            <a-tree
                v-model="checkedKeys"
                checkable
                checkStrictly
                :auto-expand-parent="autoExpandParent"
                :tree-data="menuData"
                :replaceFields="replaceFields"
              />
            <span v-if="menuData.length===0">加载中...</span>
        </a-form-model-item>
        <a-form-model-item ref="description" :label="$t('description')" prop="description">
          <a-textarea :placeholder="$t('descriptionPlaceholder')" :rows="4" v-model="$parent.form.description"/>
        </a-form-model-item>
      </a-form-model>
  </a-modal>
</template>
<script>
import {getMenuTree} from '@/api/menu'

export default {
  i18n: require('./i18n'),
  props: {
  },
  created() {
    this.getMenu()
  },
  data() {
    return {
      menuData: [],
      checkedKeys: [],
      menuLoading: false,
      autoExpandParent: true,
      replaceFields: {
        children: 'children',
        title: 'menu_name',
        key: 'menu_id'
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      rules: {
        role_name: [
          { required: true, message: this.$t('noRoleNameMsg'), trigger: 'blur' }
        ],
        is_activate: [{ required: true, message: this.$t('noRoleStatusMsg'), trigger: 'blur' }]
      }
    };
  },
  methods: {
    getMenu(){
        var vm = this
        vm.menuLoading = true
        getMenuTree().then(res => {
            vm.menuLoading = false
            vm.menuData = []
            res.data.forEach(menu => {
              if(menu.menu_name === 'root'){
                vm.menuData = vm.menuData.concat(menu.children)
              }else{
                vm.menuData.push(menu)
              }
            });
        }).catch(() => { 
          vm.menuLoading = false
          console.log("get menu tree error")
        })
      },
    cancel(){
      this.$refs['form'].clearValidate()
      this.$parent.cancel()
    },
    submit(){
      var vm = this
      this.$refs['form'].validate((valid) => {
          if (valid) {
            if(vm.checkedKeys.checked){
              vm.$parent.form.menus = vm.checkedKeys.checked
            }else{
              vm.$parent.form.menus = vm.checkedKeys
            }
            vm.$parent.form.menus.push(1)
            this.$parent.submit()
          }
      })
    }
  }
};
</script>