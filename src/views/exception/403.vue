<template>
  <div class="errPage-container">
    <a-row>
      <a-col :span="12">
        <h1 class="text-jumbo text-ginormous">
          Oops!
        </h1>
        <h2>{{$t('error403')}}</h2>
        <a-button type="primary" @click="backHome">{{$t('returnHomeBtn')}}</a-button>
      </a-col>
      <a-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </a-col>
    </a-row>
  </div>
</template>

<script>
import errGif from '@/assets/images/403.gif'

export default {
  name: 'Exp403',
  i18n: require('./i18n'),
  data() {
    return {
      errGif: errGif + '?' + +new Date()
    }
  },
  methods: {
    backHome() {
      this.$router.push("/home")
    }
  }
}
</script>

<style lang="scss" scoped>
  .errPage-container {
    width: 800px;
    max-width: 100%;
    margin: 100px auto;
    .pan-back-btn {
      background: #008489;
      color: #fff;
      border: none!important;
    }
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
