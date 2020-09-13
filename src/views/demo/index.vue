<template>
  <div class="app-container " :style="`min-height: ${pageMinHeight}px`">
    <div class="head-container">
      <query :queryTypeOptions="queryTypeOptions" />
      <rrOperation />
    </div>
    <aform ref="form"/>
    <a-table bordered :data-source="data" :pagination="false">
        <a-table-column key="username" title="用户名" data-index="username"/>
        <a-table-column key="nickName" title="昵称" data-index="nickName" />
        <a-table-column key="gender" title="性别" data-index="gender" />
        <a-table-column key="phone" title="电话" data-index="phone" />
        <a-table-column key="email" title="邮箱" data-index="email" />
        <a-table-column key="action" title="Action" width="300px">
          <template slot-scope="record">
            <udOperation
                  :data="record"
                  :loading="loading"
                  @doDelete="doDelete"
                  @showEditFormDialog="showEditFormDialog"
                  :showDelete="optShow.delete"
                  :showEdit="optShow.edit"
                  :permission="permission"
                  msg="确认删除用户吗？"
                />
          </template>
        </a-table-column>
    </a-table> 
    <pagination
    />
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import cruUser from '@/api/user'
  import crud from '@/mixins/crud'
  import rrOperation from '@/components/crud/RR.operation'
  import udOperation from '@/components/crud/UD.operation'
  import pagination from '@/components/crud/Pagination'
  import query from '@/components/crud/Query'
  import aform from './form'

  export default {
    name: 'Demo',
    mixins: [crud],
    components: { rrOperation, udOperation, pagination, query, aform},
    i18n: require('./i18n'),
    created() {
      this.$nextTick(() => {
        this.init()
      })
    },
    data() {
      return {
        title: "用户",
        crudMethod: { ...cruUser },
        queryTypeOptions: [
          { key: 'city', display_name: '店铺所在城市' },
          { key: 'site', display_name: '店铺具体地点' },
          { key: 'storeGroupId', display_name: '门店组编号' },
          { key: 'name', display_name: '店铺名称' },
          { key: 'storeCode', display_name: '商户号' }
        ],
        permission: {
          add: ['admin', 'menu:add'],
          edit: ['admin', 'menu:edit'],
          del: ['admin', 'menu:del']
        },
        form : { 
          id: null, 
          username: null, 
          nickName: null, 
          gender: '男', 
          email: null, 
          enabled: 'false', 
          roles: [], 
          jobs: [], 
          dept: { id: null }, 
          phone: null 
        }
      }
    },
    methods: {
      beforeInit() {
        this.url = '/api/user'
        const sort = 'id,desc'
        this.params = { page: this.page, size: this.size, sort: sort }
        const query = this.query
        const type = query.type
        const value = query.value
        if (value && type) { this.params[type] = value }
        return true
      },
    },
    computed: {
      ...mapState('setting', ['pageMinHeight']),
    }
  }
</script>

<style scoped lang="less">

</style>