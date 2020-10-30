<template>
  <div class="app-container " :style="`min-height: ${pageMinHeight}px`">
    <div class="head-container">
      <a-input allowClear v-model="query.positionName" :placeholder="$t('searchPositionNamePlaceholder')" style="width: 280px;float: left" class="filter-item" @pressEnter="toQuery"/>
      <rrOperation />
    </div>
    <aform ref="form"/>
    <div class="body-container">
      <a-table :loading="loading || delLoading" rowKey="position_id" bordered :data-source="data" :pagination="false">
          <a-table-column :title="$t('name')" data-index="position_name" width="10%"/>
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
                    :dataId="record.position_id"
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
      <pagination
      />
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import cruPosition from '@/api/position'
  import crud from '@/mixins/crud'
  import rrOperation from '@/components/crud/RR.operation'
  import udOperation from '@/components/crud/UD.operation'
  import pagination from '@/components/crud/Pagination'
  import aform from './form'

  export default {
    name: 'Position',
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
        crudMethod: { ...cruPosition },
        permission: {
          add: ['admin', 'position_add'],
          edit: ['admin', 'position_edit'],
          del: ['admin', 'position_del']
        },
        form : { 
          description: null,
          is_activate: true,
          is_deleted: false,
          position_id: null,
          position_name: null,
          create_at: null,
          create_by: null,
          update_at: null,
          update_by: null,
        }
      }
    },
    methods: {
      beforeInit() {
        this.url = 'system/position/'
        const sort = 'id,desc'
        this.params = { page: this.page, page_size: this.page_size}
        const query = this.query
        const positionName = query.positionName
        if (positionName) { this.params['position_name'] = positionName }
        return true
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