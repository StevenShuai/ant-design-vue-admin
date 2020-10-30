<template>
  <div class="app-container " :style="`min-height: ${pageMinHeight}px`">
    <div class="head-container">
      <a-input allowClear v-model="query.roleName" :placeholder="$t('searchRoleNamePlaceholder')" style="width: 280px;float: left" class="filter-item" @pressEnter="toQuery"/>
      <rrOperation />
    </div>
    <aform ref="form"/>
    <div class="body-container">
      <a-table :loading="loading || delLoading" rowKey="role_id" bordered :data-source="data" :pagination="false">
          <a-table-column :title="$t('name')" data-index="role_name" width="10%"/>
          <a-table-column :title="$t('enable')" width="10%">
            <template slot-scope="record">
              <a-tag v-if="record.is_activate" color="green">{{$t('enableTrue')}}</a-tag>
              <a-tag v-if="!record.is_activate" color="red">{{$t('enableFalse')}}</a-tag>
            </template>
          </a-table-column>
          <a-table-column :title="$t('description')" data-index="description" width="30%"/>
          <a-table-column :title="$t('createDate')" data-index="create_at" width="10%"/>
          <a-table-column :title="$t('updateDate')" data-index="update_at" width="10%"/>
          <a-table-column :title="$t('action')" width="10%">
            <template slot-scope="record">
              <udOperation
                  :data="record"
                  :dataId="record.role_id"
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
      <pagination />
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import cruRole from '@/api/role'
  import crud from '@/mixins/crud'
  import rrOperation from '@/components/crud/RR.operation'
  import udOperation from '@/components/crud/UD.operation'
  import pagination from '@/components/crud/Pagination'
  import aform from './form'

  export default {
    name: 'Role',
    mixins: [crud],
    components: { rrOperation, udOperation, pagination, aform},
    i18n: require('./i18n'),
    created() {
      this.$nextTick(() => {
        this.init()
      })
    },
    data() {
      return {
        authDialog: false,
        menuLoading: false,
        menuIds: [],
        menuData: [],
        authRole: {},
        crudMethod: { ...cruRole },
        permission: {
          add: ['admin', 'role_add'],
          edit: ['admin', 'role_edit'],
          del: ['admin', 'role_del']
        },
        form : { 
          create_at: null,
          create_by: null,
          data_scope: null,
          depts: [],
          description: null,
          is_activate: true,
          is_deleted: false,
          menus: [],
          role_id: null,
          role_level: 1,
          role_name: null,
          update_at: null,
          update_by: null,
        }
      }
    },
    methods: {
      beforeInit() {
        this.url = 'system/role/'
        const sort = 'id,desc'
        this.params = { page: this.page, page_size: this.page_size}
        const query = this.query
        const roleName = query.roleName
        if (roleName) { this.params['role_name'] = roleName }
        return true
      },

      beforeShowAddForm(){
        this.$refs['form'].checkedKeys = []
      },
      beforeShowEditForm(data){
        // 初始化
        this.$refs['form'].checkedKeys = data.menus
        this.authDialog = true
      }
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