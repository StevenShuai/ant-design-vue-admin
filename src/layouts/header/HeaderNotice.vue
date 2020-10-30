<template>
  <a-dropdown :trigger="['click']" :visible="visible">
    <div slot="overlay">
      <headerNoticeDetail ref="noticeDetail" :msg="msg"/>
      <a-spin class="dropdown-text" :spinning="loading">
        <div style="padding: 10px;" v-if="data.length>0">
          <span>{{$t('unreadMessagePrefix')}} {{unreadCount}} {{$t('unreadMessageSuffix')}}</span>
        </div>
        <div
          class="infinite-container"
          @scroll="loadMore"
        >
          <a-list class="tab-pane" :data-source="data">
            <a-divider style="width:367px;font-size: 13px;" slot="footer" v-if="noMore">{{$t('noMoreNews')}}</a-divider>
            <a-list-item slot="renderItem" slot-scope="item">
              <a style="width:300px" @click="showDetail(item)">
                <a-list-item-meta>
                  <div slot="title" :style="item.unread?'color:black':''" >{{ item.verb }}</div>
                  <div slot="description" :style="item.unread?'color:black':''" class="list-item-description">{{item.description}}</div>
                  <a-avatar shape="square" size="large" slot="avatar" :src="item.unread?msgUnread:msgRead"/>
                </a-list-item-meta>
              </a>
            <div :style="item.unread?'color:black':''">{{ item.timestamp }}</div>
            </a-list-item>
          </a-list>
        </div>
        <a-button 
            style="width:400px"
            type="link"
            @click="showAll()"
          >
            {{$t('seeAllMag')}}
        </a-button>
      </a-spin>
    </div>
    <span @click="fetchNotice" class="header-notice">
      <a-badge class="notice-badge" :count="unreadCount" :showZero="true">
        <a-icon :class="['header-notice-icon']" type="bell" />
      </a-badge>
    </span>
  </a-dropdown>
</template>

<script> 
  import headerNoticeDetail from './HeaderNoticeDetail'
  import {queryCount, markRead, queryNotice} from '@/api/notice'
  import msgUnread from '@/assets/images/msg-unread.png'
  import msgRead from '@/assets/images/msg-read.png'

  export default {
    name: 'HeaderNotice',
    i18n: require('./i18n'),
    components: {headerNoticeDetail},
    data () {
      return {
        data: [],
        msgUnread: msgUnread,
        msgRead: msgRead,
        loading: false,
        visible: false,
        busy: false,
        unreadCount: 0,
        noMore: false,
        msg: {},
        page: 1,
        page_size: 10,
      }
    },
    watch:{
      visible() {
        this.visibleChange()
      }
    },
    created() {
      this.quertUnreadCount()
      this.queryMsgList()
    },
    mounted() {
      this.timer = setInterval(this.quertUnreadCount, 3000);
      localStorage.setItem(process.env.VUE_APP_NOTICE_TIMER_KEY, this.timer)
    },
    beforeDestroy(){
      clearInterval(this.timer)
      localStorage.removeItem(process.env.VUE_APP_NOTICE_TIMER_KEY)
    },
    methods: {
      quertUnreadCount(){
        queryCount().then(res => {
            this.unreadCount = res.data.un_read_count
        }).catch(() => { 
            console.log('query unread count error')
        })
      },
      queryMsgList(){
        this.params = { page: this.page, page_size: this.page_size}
        this.loading = true
        queryNotice(this.params).then(res => {

           if(res.data.results.length>0){
             this.data = this.data.concat(res.data.results)
           }
           if(this.data.length>0 && !res.data.next){
              this.noMore = true
            }
           this.loading = false
        }).catch(() => { 
            this.loading = false
            console.log('query message list error')
        })
      },
      showAll(){
        this.$router.push('/notice')
        this.visible = false
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
      loadMore(e) {
        if(e.srcElement.scrollTop+e.srcElement.offsetHeight>e.srcElement.scrollHeight-50){ 
          if(this.noMore || this.loading){
            return
          }
           this.page = this.page +1
           this.queryMsgList()
        }
      },
      visibleChange(){
        if(this.visible){
          // 打开下拉框时移除定时任务
          clearInterval(this.timer);
          this.queryMsgList()
        }else{
          this.data = []
          this.page = 1
          this.noMore = false
          // 关闭下拉框时开启定时任务
          this.timer = setInterval(this.quertUnreadCount, 3000);
          localStorage.setItem(process.env.VUE_APP_NOTICE_TIMER_KEY, this.timer)
        }
      },
      fetchNotice () {
        this.visible = !this.visible
      }
    }
  }
</script>

<style lang="less">
  .dropdown-text ul li:hover
  {
    background:#9e9e9e2e;
  }
  .list-item-description{
    overflow: hidden;/*自动隐藏文字*/
    text-overflow: ellipsis;/*文字隐藏后添加省略号*/
    display: -webkit-box;
    -webkit-line-clamp:1; /*想要显示的行数*/
    -webkit-box-orient: vertical;
  }
  .infinite-container {
    overflow: auto;
    padding: 8px;
    height: 300px;
  }
  .header-notice{
    display: inline-block;
    transition: all 0.3s;
    span {
      vertical-align: initial;
    }
    .notice-badge{
      color: inherit;
      .header-notice-icon{
        font-size: 16px;
        padding: 4px;
      }
    }
  }
  .dropdown-text{
    background-color: @base-bg-color;
    box-shadow: 0 2px 8px @shadow-color;
    border-radius: 4px;
  }
</style>
