import {
  initData
} from '@/api/data'
import {
  parseTime
} from '@/utils/util'
import checkPermission from '@/components/permission/permission'

export default {
  data() {
    return {
      // 表格数据
      data: [],
      // 排序规则，默认 id 降序， 支持多字段排序 ['id,desc', 'createTime,asc']
      sort: ['id,desc'],
      // 页码
      page: 0,
      // 每页数据条数
      size: 10,
      // 总数据条数
      total: 0,
      // 可选每页条数
      pageSizeOptions: ['10', '20', '30', '40', '50', '100'],
      // 请求数据的url
      url: '',
      // 查询数据的参数
      params: {},
      // 待查询的对象
      query: {},
      // 等待时间
      time: 50,
      // 是否为新增类型的表单
      isAdd: false,
      // 导出的 Loading
      downloadLoading: false,
      // 表格 Loading 属性
      loading: false,
      // 删除 Loading 属性
      delLoading: false,
      delAllLoading: false,
      // 弹窗属性
      dialog: false,
      // Form Object
      formObject: null,
      // Form 表单
      form: {},
      // 重置表单
      resetForm: {},
      // 标题
      title: '',
      optShow: {
        add: true,
        delete: true,
        edit: true,
        search: true,
        download: false,
        reset: true
      },
      // CRUD 方法
      crudMethod: {
        add: (form) => {},
        del: (id) => {},
        edit: (form) => {}
      },
    }
  },
  methods: {
    parseTime,
    checkPermission,
    async init() {
      if (!await this.beforeInit()) {
        return
      }
      return new Promise((resolve, reject) => {
        this.loading = true
        // 请求数据
        console.log(this.url)
        console.log(this.getQueryParame())
        initData(this.url, this.getQueryParame()).then(res => {
          this.total = res.data.totalElements
          this.data = res.data.content
          // time 毫秒后显示表格
          setTimeout(() => {
            this.loading = false
          }, this.time)
          resolve(res)
        }).error(err => {
          this.loading = false
          reject(err)
        })
      })
    },
    beforeInit() {
      return true
    },
    getQueryParame: function() {
      return {
        page: this.page,
        size: this.size,
        sort: this.sort,
        ...this.query,
        ...this.params
      }
    },
    // 改变页码
    pageChange(e) {
      this.page = e - 1
      this.init()
    },
    // 改变每页显示数
    sizeChange(e) {
      this.page = 0
      this.size = e
      this.init()
    },
    // 预防删除第二页最后一条数据时，或者多选删除第二页的数据时，页码错误导致请求无数据
    dleChangePage(size) {
      if (size === undefined) {
        size = 1
      }
      if (this.data.length === size && this.page !== 0) {
        this.page = this.page - 1
      }
    },
    // 查询方法
    toQuery() {
      this.page = 0
      this.init()
    },
    /**
     * 通用的提示封装
     */
    submitSuccessNotify() {
      this.$notify({
        title: '提交成功',
        type: 'success',
        duration: 2500
      })
    },
    addSuccessNotify() {
      this.$notify({
        title: '新增成功',
        type: 'success',
        duration: 2500
      })
    },
    editSuccessNotify() {
      this.$notify({
        title: '编辑成功',
        type: 'success',
        duration: 2500
      })
    },
    delSuccessNotify() {
      this.$notify({
        title: '删除成功',
        type: 'success',
        duration: 2500
      })
    },
    notify(title, type) {
      this.$notify({
        title: title,
        type: type,
        duration: 2500
      })
    },
    /**
     * 删除前可以调用 beforeDelMethod 做一些操作
     */
    beforeDoDelete() {
      return true
    },
    /**
     * 通用的删除
     */
    doDelete(id) {
      if (!this.beforeDoDelete()) {
        return
      }
      this.delLoading = true
      this.crudMethod.del(id).then(() => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.dleChangePage()
        this.delSuccessNotify()
        this.afterDoDelete()
        this.init()
      }).catch(() => {
        this.delLoading = false
        this.$refs[id].doClose()
      })
    },
    afterDoDelete() {},
    /**
     * 多选删除提示
     */
    beforeDelAllMethod() {
      this.$confirm('你确定删除选中的数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delAllMethod()
      })
    },
    /**
     * 多选删除
     */
    delAllMethod() {
      this.delAllLoading = true
      const data = this.$refs.table.selection
      const ids = []
      for (let i = 0; i < data.length; i++) {
        ids.push(data[i].id)
      }
      this.crudMethod.delAll(ids).then(() => {
        this.delAllLoading = false
        this.dleChangePage(ids.length)
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(() => {
        this.delAllLoading = false
      })
    },
    /**
     * 显示新增弹窗前可以调用该方法
     */
    beforeShowAddForm() {},
    /**
     * 显示新增弹窗
     */
    showAddFormDialog() {
      this.isAdd = true
      this.resetForm = JSON.parse(JSON.stringify(this.form))
      this.beforeShowAddForm()
      this.dialog = true
    },
    /**
     * 显示编辑弹窗前可以调用该方法
     */
    beforeShowEditForm(data) {},
    /**
     * 显示编辑弹窗
     */
    showEditFormDialog(data = '') {
      this.isAdd = false
      if (data) {
        this.resetForm = JSON.parse(JSON.stringify(this.form))
        this.form = JSON.parse(JSON.stringify(data))
      }
      this.beforeShowEditForm(data)
      this.dialog = true
    },
    /**
     * 新增方法
     */
    doAdd() {
      this.crudMethod.add(this.form).then(() => {
        this.addSuccessNotify()
        this.loading = false
        this.afterDoAdd()
        this.cancel()
        this.init()
      }).catch(() => {
        this.loading = false
        this.afterDoAddError()
      })
    },
    /**
     * 新增后可以调用该方法
     */
    afterDoAdd() {},
    /**
     * 新增失败后调用该方法
     */
    afterDoAddError() {},
    /**
     * 通用的编辑方法
     */
    doEdit() {
      this.crudMethod.edit(this.form).then(() => {
        this.editSuccessNotify()
        this.loading = false
        this.afterDoEdit()
        this.cancel()
        this.init()
      }).catch(() => {
        this.loading = false
      })
    },
    /**
     * 编辑后可以调用该方法
     */
    afterDoEdit() {},
    /**
     * 提交前可以调用该方法
     */
    beforeSubmit() {
      return true
    },
    /**
     * 提交
     */
    submit() {
      if (!this.beforeSubmit()) {
        return
      }
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    /**
     * 隐藏弹窗
     */
    cancel() {
      this.dialog = false
      this.form = this.resetForm
    },
    /**
     * 获取弹窗的标题
     */
    getFormTitle() {
      return this.isAdd ? `新增${this.title}` : `编辑${this.title}`
    },
    /**
     * 通用导出
     */
    doDownload() {
      return true
    }
  }
}
