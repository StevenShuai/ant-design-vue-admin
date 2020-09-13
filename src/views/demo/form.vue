<template>
  <a-modal
      width="680px"
      :title="$parent.getFormTitle"
      centered
      :visible="$parent.dialog"
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
        <a-form-model-item ref="username" label="username" prop="username">
          <a-input placeholder="username" v-model="$parent.form.username" />
        </a-form-model-item>
        <a-form-model-item ref="nickName" label="nickName" prop="nickName">
          <a-input placeholder="nickName" v-model="$parent.form.nickName" />
        </a-form-model-item>
        <a-form-model-item ref="gender" label="gender" prop="gender">
          <a-input placeholder="gender" v-model="$parent.form.gender" />
        </a-form-model-item>
        <a-form-model-item ref="email" label="email" prop="email">
          <a-input placeholder="email" v-model="$parent.form.email" />
        </a-form-model-item>
      </a-form-model>
  </a-modal>
</template>
<script>
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      rules: {
        username: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
        nickName: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
        gender: [{ required: true, message: 'Please pick a date', trigger: 'change' }],
        email: [{type: 'email', required: true, message: 'Please select at least one activity type', trigger: 'change'}]
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