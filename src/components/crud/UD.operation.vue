<template>
  <div>
    <a-button 
      v-if="showEdit" 
      v-permission="permission.edit" 
      :loading="loading" 
      :disabled="disabledEdit" 
      type="primary" 
      icon="edit" 
      style="margin-right:10px"
      @click="showEditFormDialog" 
    >
    编辑
    </a-button>
    <a-popconfirm v-permission="permission.del" placement="top" width="180" ok-text="确定" cancel-text="取消" @confirm="doDelete">
      <template slot="title">
        <p>{{ msg }}</p>
      </template>
      <a-button 
        v-if="showDelete" 
        :loading="loading" 
        :disabled="disabledDle" 
        type="danger" 
        icon="delete" 
        @click="toDelete" >
        删除
      </a-button>
    </a-popconfirm>
  </div>
</template>
<script>
  export default {
    props: {
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
      loading: {
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
        default: '确定删除本条数据吗？'
      }
    },
    data() {
      return {
        pop: false
      }
    },
    methods: {
      doDelete(){
        this.$emit('doDelete', this.data.id)
      },
      showEditFormDialog(){
        this.$emit('showEditFormDialog', this.data)
      },
      doCancel() {
        this.pop = false
      },
      toDelete() {
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
