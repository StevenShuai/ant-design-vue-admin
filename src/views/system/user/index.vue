<template>
  <div class="app-container " :style="`min-height: ${pageMinHeight}px`">
    <div class="head-container">
      <a-input allowClear v-model="query.username" :placeholder="$t('searchUsernamePlaceholder')" style="width: 280px;float: left" class="filter-item" @pressEnter="toQuery"/>
      <a-tree-select
          v-model="query.dept"
          allowClear
          style="width: 280px;float: left"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto'}"
          :tree-data="depts"
          :placeholder="$t('searchDeptPlaceholder')"
          :replaceFields="deptReplaceFields"
         >
      </a-tree-select>
      <rrOperation style="padding-left:5px"/>
    </div>
    <aform :depts="depts" :positions="positions" :roles="roles" ref="form"/>
    <div class="body-container">
      <a-table :loading="loading || delLoading" bordered rowKey="id" :data-source="data" :pagination="false">
          <a-table-column :title="$t('username')" data-index="user_name" width="6%"/>
          <a-table-column :title="$t('nickname')" data-index="nick_name" width="6%"/>
          <a-table-column :title="$t('gender')" width="5%">
            <template slot-scope="record">
              <a-tag v-if="record.gender==='1'" color="blue"><a-icon type="man" />{{$t('genderMan')}}</a-tag>
              <a-tag v-if="record.gender==='2'" color="green"><a-icon type="woman" />{{$t('genderWoman')}}</a-tag>
            </template>
          </a-table-column>
          <a-table-column :title="$t('admin')" width="7%">
            <template slot-scope="record">
              <a-tag v-if="record.is_admin" color="blue">{{$t('adminTrue')}}</a-tag>
              <a-tag v-if="!record.is_admin" color="red">{{$t('adminFalse')}}</a-tag>
            </template>
          </a-table-column>
          <a-table-column :title="$t('phone')" data-index="phone" width="7%"/>
          <a-table-column :title="$t('email')" data-index="email" width="8%"/>
          <a-table-column :title="$t('dept')" data-index="dept_name" width="7%"/>
          <a-table-column :title="$t('position')" data-index="position_name" width="5%"/>
          <a-table-column :title="$t('enable')" width="5%">
            <template slot-scope="record">
              <a-tag v-if="record.is_activate" color="green">{{$t('enableTrue')}}</a-tag>
              <a-tag v-if="!record.is_activate" color="red">{{$t('enableFalse')}}</a-tag>
            </template>
          </a-table-column>
          <a-table-column :title="$t('createDate')" data-index="create_at" width="8%"/>
          <a-table-column :title="$t('updateDate')" data-index="update_at" width="8%"/>
          <a-table-column :title="$t('action')" width="12%">
            <template slot-scope="record">
              <udOperation
                    :data="record"
                    :dataId="record.id"
                    :delLoading="delLoading"
                    @doDelete="doDelete"
                    @showEditFormDialog="showEditFormDialog"
                    :showDelete="optShow.delete"
                    :showEdit="optShow.edit"
                    :permission="permission"
                    :msg="$t('delMsg')"
                  />
              <a-popconfirm v-permission="permission.reset" placement="top" width="180" :ok-text="$t('sure')" :cancel-text="$t('cancel')" @confirm="resetUserPassword(record)">
                <template slot="title">
                  <p>{{ $t('resetPassowrd') }}</p>
                </template>
                <a 
                  @click="openResetPassword"
                >
                  <a-icon type="redo" />{{$t('resetPasword')}}
                </a>
              </a-popconfirm>
            </template>
          </a-table-column>
      </a-table> 
      <pagination />
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import cruUser from '@/api/user'
  import crud from '@/mixins/crud'
  import rrOperation from '@/components/crud/RR.operation'
  import udOperation from '@/components/crud/UD.operation'
  import pagination from '@/components/crud/Pagination'
  import aform from './form'
  import {getRole} from '@/api/role'
  import {getDeptTree} from '@/api/dept'
  import {getPosition} from '@/api/position'

  export default {
    name: 'User',
    mixins: [crud],
    components: { rrOperation, udOperation, pagination, aform},
    i18n: require('./i18n'),
    created() {
      this.$nextTick(() => {  
        this.init()
      })
      this.getInfo()
    },
    data() {
      return {
        pop: false,
        deptReplaceFields: {
          children: 'children',
          title: 'dept_name',
          key: 'dept_id',
          value: 'dept_id'
        },
        roles: [],
        depts: [],
        positions: [],
        crudMethod: { ...cruUser },
        permission: {
          add: ['admin', 'user_add'],
          edit: ['admin', 'user_edit'],
          del: ['admin', 'user_del'],
          reset: ['admin', 'reset_password']
        },
        form : { 
          id: null,
          avatar_name: null,
          avatar_path: null,
          create_at: null,
          create_by: null,
          dept: null,
          email: null,
          gender: '1',
          is_activate: true,
          is_admin: false,
          is_deleted: false,
          nick_name: null,
          phone: null,
          position: undefined,
          pwd_reset_time: null,
          roles: [],
          roles_name: null,
          update_at: null,
          update_by: null,
          user_name: null,
        }
      }
    },
    methods: {
      openResetPassword() {
        this.pop = true
      },
      beforeInit() {
        this.url = 'system/user/'
        this.params = { page: this.page, page_size: this.page_size}
        const username = this.query.username
        const dept = this.query.dept
        if (dept) { this.params['dept'] = dept }
        if (username) { this.params['user_name'] = username }
        return true
      },
      resetUserPassword(record){
        this.loading = true
        this.crudMethod.resetPassword(record).then(res => {
            this.loading = false
            this.$message.success(this.$t('resetPaswordSuccess'))
        }).catch(() => { 
            this.loading = false
            console.log('reset user password error')
        })
      },
      getInfo(){
        getRole().then(res => {
            this.roles = res.data
        }).catch(() => { 
            console.log('load role error')
        })
        getDeptTree().then(res => {
            this.depts = res.data
        }).catch(() => { 
            console.log('load dept error')
        })
        getPosition().then(res => {
            this.positions = res.data
        }).catch(() => { 
            console.log('load position error')
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