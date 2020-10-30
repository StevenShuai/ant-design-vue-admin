<!--分页-->
<template>
  <a-pagination
    v-show="$parent.data.length>0&&!$parent.loading"
    :pageSize.sync="$parent.page_size"
    :total="$parent.total"
    :current="$parent.page"
    style="margin-top: 8px; float:right;"
    :pageSizeOptions="$parent.pageSizeOptions"
    :showTotal="showTotal"
    show-size-changer
    size="middle"
    @showSizeChange="sizeChange"
    @change="pageChange"
  />
</template>
<script>
  
  export default {
    i18n: require('./i18n'),
    methods: {
      showTotal(total, range){
        return this.$t('showTotalPre') + '  ' + total + '  ' + this.$t('showTotalSuf')
      },
      sizeChange(page, pageSize){
        this.$parent.sizeChange(pageSize)
      },
      pageChange(current, size){
        this.$parent.pageChange(current)
      }
    }
  }
</script>
