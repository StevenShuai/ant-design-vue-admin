<template>
  <div>
    <a-row style="margin-top: 0" :gutter="[24, 24]">
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card :loading="loading" :title="$t('totalSales')" total="345">
          <a-tooltip placement="right" :title="$t('introduce')" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend style="margin-right: 16px" :term="$t('wow')" :percent="12" :is-increase="true" :scale="0" />
            <trend :term="$t('dod')" :target="100" :value="89" :scale="0" />
          </div>
          <div slot="footer">{{$ta('daily|sales', 'p')}}<span> ￥234.56</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card :loading="loading" :title="$t('sevenEvents')" total="4584">
          <a-tooltip placement="right" :title="$t('introduce')" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-area />
          </div>
          <div slot="footer" style="white-space: nowrap;overflow: hidden">
            <trend style="margin-right: 16px" :term="$t('wow')" :count="'12'" :is-increase="true" :scale="0" />
          </div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card :loading="loading" :title="$t('sevenMainAlarm')" total="9345">
          <a-tooltip placement="right" :title="$t('introduce')" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-bar />
          </div>
          <div slot="footer" style="white-space: nowrap;overflow: hidden">
            <trend style="margin-right: 16px" :term="$t('wow')" :count="'12'" :is-increase="false" :scale="0" />
          </div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card :loading="loading" :title="$t('sevenMTTA')" total="54h15min">
          <a-tooltip placement="right" :title="$t('introduce')" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-area />
          </div>
          <div slot="footer" style="white-space: nowrap;overflow: hidden">
            <trend style="margin-right: 16px" :term="$t('wow')" :count="'53h44min'" :is-increase="false" :scale="0" />
          </div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card :loading="loading" color="red" :title="$t('sevenMTTR')" total="54h15min">
          <a-tooltip placement="right" :title="$t('introduce')" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-bar />
          </div>
          <div slot="footer" style="white-space: nowrap;overflow: hidden">
            <trend style="margin-right: 16px" :term="$t('wow')" :count="'53h44min'" :is-increase="true" :scale="0" />
          </div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="4">
        <chart-card :loading="loading" :title="$t('sevenZipRate')" total="73%">
          <a-tooltip placement="right" :title="$t('introduce')" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-progress target="90" percent="78" color="#13C2C2" height="8px"/>
          </div>
          <div slot="footer" style="white-space: nowrap;overflow: hidden">
            <trend style="margin-right: 16px" :term="$t('wow')" :percent="5" :is-increase="true" :scale="0" />
          </div>
        </chart-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import ChartCard from '@/components/card/ChartCard'
import MiniArea from '@/components/chart/MiniArea'
import MiniBar from '@/components/chart/MiniBar'
import MiniProgress from '@/components/chart/MiniProgress'
import Trend from '@/components/chart/Trend'

export default {
  name: 'home',
  i18n: require('./i18n'),
  components: {Trend, MiniProgress, MiniBar, MiniArea, ChartCard},
  data () {
    return {
      loading: true
    }
  },
  created() {
    setTimeout(() => this.loading = !this.loading, 1000)
  },
}
</script>