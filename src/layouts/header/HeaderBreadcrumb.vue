<template>
    <div class="breadcrumb">
    <a-breadcrumb>
        <a-breadcrumb-item :key="index" v-for="(item, index) in breadcrumb">
            <span>{{item}}</span>
        </a-breadcrumb-item>
    </a-breadcrumb>
    </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    breadcrumb: {
      type: Array,
      required: false
    }
  }
}
</script>
