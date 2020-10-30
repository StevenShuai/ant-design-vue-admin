<template>
  <div style="float: left; margin-right: 10px">
    <a 
      v-if="showEdit" 
      v-permission="permission.edit" 
       @click="showEditFormDialog" 
      style="margin-right: 10px">
      <a-icon type="edit"/>{{$t('edit')}}
    </a>
    <a-popconfirm v-permission="permission.del" placement="top" width="180" :ok-text="$t('sure')" :cancel-text="$t('cancel')" @confirm="doDelete">
      <template slot="title">
        <p>{{ msg }}</p>
      </template>
      <a 
        v-if="showDelete" 
        @click="openDelConfirm"
      >
        <a-icon type="delete" />{{$t('delete')}}
      </a>
    </a-popconfirm>
  </div>
</template>
<script>
  export default {
    i18n: require('./i18n'),
    props: {
      dataId: {
        type: Number,
        required: true
      },
      data: {
        type: Object,
        required: true
      },
      permission: {
        type: Object,
        required: true
      },
      disabledEdit: {
        type: Boolean,
        default: false
      },
      delLoading: {
        type: Boolean,
        default: false
      },
      showDelete: {
        type: Boolean,
        default: true
      },
      showEdit: {
        type: Boolean,
        default: true
      },
      disabledDle: {
        type: Boolean,
        default: false
      },
      msg: {
        type: String,
        default: 'Are you sure to delete the data？'
      }
    },
    data() {
      return {
        pop: false
      }
    },
    methods: {
      doDelete(){
        this.$emit('doDelete', this.dataId)
      },
      showEditFormDialog(){
        this.$emit('showEditFormDialog', this.data)
      },
      doCancel() {
        this.pop = false
      },
      openDelConfirm() {
        this.pop = true
      },
      onPopoverShow() {
        setTimeout(() => {
          document.addEventListener('click', this.handleDocumentClick)
        }, 0)
      },
      onPopoverHide() {
        document.removeEventListener('click', this.handleDocumentClick)
      },
      handleDocumentClick() {
        this.pop = false
      }
    }
  }
</script>
