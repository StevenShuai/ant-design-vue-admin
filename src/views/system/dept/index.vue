<template>
  <div class="app-container" :style="`min-height: ${pageMinHeight}px`">
    <div class="head-container">
      <a-input allowClear v-model="deptName" :placeholder="$t('searchDeptNamePlaceholder')" style="width: 280px;float: left" class="filter-item" @pressEnter="toQuery"/>
      <rrOperation />
    </div>
    <aform :deptTreeData="deptTreeData" ref="form"/>
    <div class="body-container">
      <a-table expandRowByClick :loading="loading || delLoading" :rowKey="(record, index)=>{return Math.random()*100+''}" bordered :data-source="data" :pagination="false">
        <a-table-column :title="$t('name')" data-index="dept_name" width="15%"/>
        <a-table-column :title="$t('sort')" data-index="dept_sort" width="10%"/>
        <a-table-column :title="$t('enable')" width="10%">
            <template slot-scope="record">
              <a-tag v-if="record.is_activate" color="green">{{$t('enableTrue')}}</a-tag>
              <a-tag v-if="!record.is_activate" color="red">{{$t('enableFalse')}}</a-tag>
            </template>
        </a-table-column>
        <a-table-column :title="$t('createDate')" data-index="create_at" width="15%"/>
        <a-table-column :title="$t('updateDate')" data-index="update_at" width="15%"/>
        <a-table-column :title="$t('action')" width="10%">  
          <template slot-scope="record">
            <udOperation
                  :data="record"
                  :dataId="record.dept_id"
                  :delLoading="delLoading"
                  @doDelete="doDelete"
                  @showEditFormDialog="showEditFormDialog"
                  :showDelete="optShow.delete"
                  :showEdit="optShow.edit"
                  :permission="permission"
                  :msg="$t('delMsg')"
                />
          </template>
        </a-table-column>
      </a-table> 
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import cruMenu from '@/api/dept'
  import crud from '@/mixins/crud'
  import rrOperation from '@/components/crud/RR.operation'
  import udOperation from '@/components/crud/UD.operation'
  import aform from './form'

  export default {
    name: 'Menu',
    mixins: [crud],
    components: { rrOperation, udOperation, aform},
    i18n: require('./i18n'),
    created() {
      this.$nextTick(() => {
        this.init()
      })
    },
    data() {
      return {
        deptTreeData: [],
        deptName: "",
        crudMethod: { ...cruMenu },
        permission: {
          add: ['admin', 'dept_add'],
          edit: ['admin', 'dept_edit'],
          del: ['admin', 'dept_del']
        },
        form : { 
          dept_id: null,
          dept_name: null,
          dept_sort: 1,
          is_activate: true,
          is_deleted: false,
          pid: null,
          sub_count: 0,
          create_at: null,
          create_by: null,
          update_at: null,
          update_by: null,
        }
      }
    },
    methods: {
      init(){
        var vm = this
        vm.params = {}
        if (vm.deptName) { vm.params['dept_name'] = vm.deptName }
        vm.loading = true
        cruMenu.getDeptTree(this.params).then(res => {
            vm.data = res.data
            // Form表单需记住全部按钮的树结构数据, 避免被有条件查询时覆盖
            if(!this.params.dept_name){
               vm.deptTreeData = res.data
             }
            vm.loading = false
        }).catch(() => { 
          vm.loading = false
          console.log("get dept tree error")
        })
      },
    },
    computed: {
      ...mapState('setting', ['pageMinHeight']),
      getFormTitle(){
        return this.isAdd ? this.$t('add') + this.$t('title') : this.$t('edit') + this.$t('title')
      }
    }
  }
</script>

<style scoped lang="less">

</style>