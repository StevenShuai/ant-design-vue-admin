<template>
  <div>
    <a-modal centered :title="msg.verb" v-model="visible">
      <template slot="footer">
        <p>{{msg.timestamp}}</p>
      </template>
      <p>{{msg.description}}</p>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: 'HeaderNoticeDetail',
  props:{
    msg: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      loading: false,
      visible: false,
    };
  },
  methods: {
  },
};
</script>