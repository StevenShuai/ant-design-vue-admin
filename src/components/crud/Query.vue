<!--搜索与重置-->
<template>
  <div style="float: left">
        <a-input allowClear v-model="$parent.query.value" placeholder="输入搜索内容" style="width: 280px;" class="filter-item" @pressEnter="this.$parent.toQuery"/>
        <a-select v-model="$parent.query.type" placeholder="搜索类型" class="filter-item" style="width: 280px">
            <a-select-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">{{item.display_name}}</a-select-option>
        </a-select>
    </div>
</template>
<script>
  export default {
    props: {
      queryTypeOptions: {
        type: Array,
        required: true
      }
    },
    created()  {
        this.$parent.query.type = this.queryTypeOptions[0].key
    }
  }
</script>
