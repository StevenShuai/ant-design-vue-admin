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
        <a-form-model-item ref="dept_name" :label="$t('name')" prop="dept_name">
          <a-input :placeholder="$t('namePlaceholder')" v-model="$parent.form.dept_name" />
        </a-form-model-item>
        <a-form-model-item ref="dept_sort" :label="$t('sort')" prop="dept_sort">
          <a-input-number :min="1" :max="100" :default-value="1" v-model="$parent.form.dept_sort"/>
        </a-form-model-item>
        <a-form-model-item ref="is_activate" :label="$t('enable')" prop="is_activate">
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
            :tree-data="deptTreeData"
            :placeholder="$t('parentDepartmentPlaceholder')"
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
    deptTreeData: {
      type: Array,
      required: true
    },
  },
  i18n: require('./i18n'),
  data() {
    return {
      replaceFields: {
        children: 'children',
        title: 'dept_name',
        key: 'dept_id',
        value: 'dept_id'
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      rules: {
        dept_name: [
          { required: true, message: this.$t('noNameMsg'), trigger: 'blur' }
        ],
        dept_sort: [{ required: true, message: this.$t('noSortMsg'), trigger: 'blur' }],
        is_activate: [{ required: true, message: this.$t('noStatusMsg'), trigger: 'blur' }]
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