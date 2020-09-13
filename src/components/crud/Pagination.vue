<!--分页-->
<template>
  <a-pagination
    :pageSize.sync="$parent.size"
    :total="$parent.total"
    :current="$parent.page + 1"
    style="margin-top: 8px; float:right;"
    :pageSizeOptions="$parent.pageSizeOptions"
    :showTotal="total => `Total ${$parent.total} items`"
    show-size-changer
    size="middle"
    @showSizeChange="sizeChange"
    @change="pageChange"
  />
</template>
<script>
  
  export default {
    methods: {
      sizeChange(page, pageSize){
        this.$parent.sizeChange(pageSize)
      },
      pageChange(current, size){
        this.$parent.pageChange(current)
      }
    }
  }
</script>
