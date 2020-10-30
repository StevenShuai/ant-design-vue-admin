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
        <a-form-model-item ref="position_name" :label="$t('name')" prop="position_name">
          <a-input :placeholder="$t('positionNamePlaceholder')" v-model="$parent.form.position_name" />
        </a-form-model-item>
        <a-form-model-item ref="is_activate" :label="$t('enable')" prop="is_activate">
          <a-radio-group  v-model="$parent.form.is_activate" name="radioGroup">
            <a-radio :value="true">{{$t('enableTrue')}}</a-radio>
            <a-radio :value="false">{{$t('enableFalse')}}</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item ref="description" :label="$t('description')" prop="description">
          <a-textarea :placeholder="$t('descriptionPlaceholder')" :rows="4" v-model="$parent.form.description"/>
        </a-form-model-item>
      </a-form-model>
  </a-modal>
</template>
<script>
export default {
  i18n: require('./i18n'),
  props: {
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      rules: {
        position_name: [
          { required: true, message: this.$t('noPositionNameMsg'), trigger: 'blur' }
        ],
        is_activate: [{required: true, message: this.$t('noPositionStatusMsg'), trigger: 'blur'}]
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