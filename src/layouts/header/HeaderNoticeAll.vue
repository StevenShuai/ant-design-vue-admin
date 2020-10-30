<template>
  <div class="app-container" :style="`min-height: ${pageMinHeight}px`">
    <headerNoticeDetail ref="noticeDetail" :msg="msg"/>
    <div class="body-container">
      <a-spin :spinning="loading">
        <a-tabs :activeKey="activeKey" @change="queryData">
          <a-tab-pane :key="3" :tab="$t('all')">
            <a-list item-layout="vertical " :data-source="data">
              <a-list-item slot="renderItem" slot-scope="item">
                <a slot="actions" @click="showDetail(item)">{{$t('detailBtn')}}</a>
                <a-list-item-meta>
                  <div slot="description" class="list-item-description">{{item.description}}</div>
                  <div :style="item.unread?'color:black':''" slot="title" @click="showDetail(item)">{{ item.verb }}</div>
                  <a-avatar shape="square" size="large" slot="avatar" :src="item.unread?msgUnread:msgRead"/>
                </a-list-item-meta>
                <div>{{ item.timestamp }}</div>
              </a-list-item>
            </a-list>
          </a-tab-pane>
          <a-tab-pane :key="1" :tab="$t('unread')">
            <a-list item-layout="vertical " :data-source="data">
              <a-list-item slot="renderItem" slot-scope="item">
                <a slot="actions" @click="showDetail(item)">{{$t('detailBtn')}}</a>
                <a-list-item-meta>
                  <div slot="description" class="list-item-description">{{item.description}}</div>
                  <div :style="item.unread?'color:black':''" slot="title" @click="showDetail(item)">{{ item.verb }}</div>
                  <a-avatar shape="square" size="large" slot="avatar" :src="item.unread?msgUnread:msgRead"/>
                </a-list-item-meta>
                <div>{{ item.timestamp }}</div>
              </a-list-item>
            </a-list>
          </a-tab-pane>
          <a-tab-pane :key="0" :tab="$t('read')">
            <a-list item-layout="vertical " :data-source="data">
              <a-list-item slot="renderItem" slot-scope="item">
                <a slot="actions" @click="showDetail(item)">{{$t('detailBtn')}}</a>
                <a-list-item-meta>
                  <div slot="description" class="list-item-description">{{item.description}}</div>
                  <div :style="item.unread?'color:black':''" slot="title" @click="showDetail(item)">{{ item.verb }}</div>
                  <a-avatar shape="square" size="large" slot="avatar" :src="item.unread?msgUnread:msgRead"/>
                </a-list-item-meta>
                <div>{{ item.timestamp }}</div>
              </a-list-item>
            </a-list>
          </a-tab-pane>
        </a-tabs>
      </a-spin>
      <pagination />
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import crud from '@/mixins/crud'
  import pagination from '@/components/crud/Pagination'
  import headerNoticeDetail from './HeaderNoticeDetail'
  import {markRead} from '@/api/notice'
  import msgUnread from '@/assets/images/msg-unread.png'
  import msgRead from '@/assets/images/msg-read.png'

  export default {
    name: "HeaderNoticeAll",
    i18n: require('./i18n'),
    mixins: [crud],
    components: {pagination, headerNoticeDetail},
    data() {
      return {
        msgUnread: msgUnread,
        msgRead: msgRead,
        msg: {},
        activeKey: 3
      };
    },
    created() {
      this.$nextTick(() => {  
        this.init()
      })
    },
    methods: {
      beforeInit() {
          this.url = 'notice/list/'
          this.params = {page: this.page, page_size: this.page_size}
          if(this.activeKey !== 3){
            this.params = {page: this.page, page_size: this.page_size, un_read: this.activeKey}
          }
          return true
      },
      queryData(activeKey){
        this.activeKey = activeKey
        this.data = []
        this.toQuery()
      },
      showDetail(data){
        this.msg = data
        if(this.msg.unread){
          data.unread = false
          this.unreadCount = this.unreadCount -1 
          markRead(this.msg.id).then(res => {
              console.log('mark read successful')
          }).catch(() => { 
              console.log('mark read error')
          })
        }
        this.$refs['noticeDetail'].visible = true
      },
    },
    computed: {
        ...mapState('setting', ['pageMinHeight']),
        getFormTitle(){
          return this.isAdd ? this.$t('add') + this.$t('title') : this.$t('edit') + this.$t('title')
        }
      }
  };
</script>
<style>
.list-item-description{
  overflow: hidden;/*自动隐藏文字*/
  text-overflow: ellipsis;/*文字隐藏后添加省略号*/
  display: -webkit-box;
  -webkit-line-clamp:1; /*想要显示的行数*/
  -webkit-box-orient: vertical;
}
.ant-tabs-bar {
    margin: 0 0 16px 0;
    border-bottom: 1px solid #f0f0f0;
    outline: none;
    text-align: center;
    -webkit-transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>