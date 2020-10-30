<template>
  <div class="app-container" :style="`min-height: ${pageMinHeight}px`">
    <div class="head-container">
      <a-input allowClear v-model="name" :placeholder="$t('searchMenuNamePlaceholder')" style="width: 280px;float: left" class="filter-item" @pressEnter="toQuery"/>
      <rrOperation />
    </div>
    <aform :menuTreeData="menuTreeData" ref="form"/>
    <div class="body-container">
      <a-table expandRowByClick :rowKey="(record, index)=>{return Math.random()*100+''}" :loading="loading || delLoading" bordered :data-source="data" :pagination="false">
        <a-table-column :title="$t('name')" data-index="menu_name" width="20%"/>
        <a-table-column :title="$t('sort')" data-index="menu_sort" width="10%"/>
        <a-table-column :title="$t('type')" width="8%">
          <template slot-scope="record">
            <a-tag v-if="record.menu_type===1" color="blue">{{$t('typeDirector')}}</a-tag>
            <a-tag v-if="record.menu_type===2" color="cyan">{{$t('typeMenu')}}</a-tag>
            <a-tag v-if="record.menu_type===3" color="green">{{$t('typeButton')}}</a-tag>
          </template>
        </a-table-column>
        <a-table-column :title="$t('enable')" width="8%">
            <template slot-scope="record">
              <a-tag v-if="record.is_activate" color="green">{{$t('enableTrue')}}</a-tag>
              <a-tag v-if="!record.is_activate" color="red">{{$t('enableFalse')}}</a-tag>
            </template>
          </a-table-column>
        <a-table-column :title="$t('permissionKey')" data-index="permission" width="10%"/>
        <a-table-column :title="$t('key')" data-index="router" width="10%"/>
        <a-table-column :title="$t('createDate')" data-index="create_at" width="10%"/>
        <a-table-column :title="$t('updateDate')" data-index="update_at" width="10%"/>
        <a-table-column :title="$t('action')" width="10%">  
          <template v-if="record.menu_type!==0" slot-scope="record">
            <udOperation
                  :data="record"
                  :dataId="record.menu_id"
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
  import {mapState, mapGetters} from 'vuex'
  import cruMenu from '@/api/menu'
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
        name: '',
        menuTreeData: [],
        crudMethod: { ...cruMenu },
        permission: {
          add: ['admin', 'menu_add'],
          edit: ['admin', 'menu_edit'],
          del: ['admin', 'menu_del']
        },
        form : { 
          is_activate: true,
          is_deleted: false,
          menu_id: null,
          menu_name: null,
          menu_sort: 99,
          menu_type: 1,
          permission: null,
          pid: null,
          router: null,
          sidebar: true,
          create_at: null,
          create_by: null,
          update_at: null,
          update_by: null
        }
      }
    },
    methods: {
      init(){
        var vm = this
        vm.params = {}
        if (vm.name) { vm.params['menu_name'] = vm.name }
        vm.loading = true
        cruMenu.getMenuTree(this.params).then(res => {
            // Form表单需记住全部按钮的树结构数据, 避免被有条件查询时覆盖
            if(!this.params.menu_name){
              vm.menuTreeData = res.data
            }
            vm.data = []
            res.data.forEach(menu => {
              if(menu.menu_name === 'root'){
                vm.data = vm.data.concat(menu.children)
              }else{
                vm.data.push(menu)
              }
            });
            vm.loading = false
        }).catch(() => { 
          vm.loading = false
          console.log("get menu tree error")
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