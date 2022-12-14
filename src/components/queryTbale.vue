<template>
    <div class="table-container">
        <el-table :header-cell-style="{
        background: '#f3f6fa',
        color: '#102547',
        textAlign: 'center',
      }" ref="multipleTable" :height="height" v-loading="listLoading" :data="list" border
            element-loading-text="Loading" highlight-current-row tooltip-effect="dark" style="width: 100%;"
            cell-class-name="tablecenter" show-overflow-tooltip>
            <el-table-column v-if="tableColumn" show-overflow-tooltip v-for="(item, index) in tableHead" :label="item.name" align="center" :key="index" :prop="item.property" />
            <slot  name="tableColumn" />
        </el-table>
        <slot name="tableBottom" />
        <!-- <el-pagination class="pagins" hide-on-single-page background layout="prev, pager, next"
            @current-change="handleCurrentChange" :current-page="listQuery.PageIndex" :total="total">
        </el-pagination> -->
        <el-pagination v-if="total>0&&totalshow" class="pagins" hide-on-single-page @current-change="handleCurrentChange" :current-page.sync="listQuery.PageIndex"
            :page-size="listQuery.PageSize" layout="prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
</template>
  
<script>
export default {
    name: 'QueryTable',
    props: {
        listQuery: {
            type: Object,
            default: () => {
                return {
                    PageIndex: 1,
                    PageSize: 10
                }
            }
        },
        height: {
            type: String,
            default: '100%'
        },
        tableColumn:{
            type:Boolean,
            default:true
        },
        totalshow:{
            type:Boolean,
            default:true
        },
        api: {
            type: Object,
            default: () => {
                return {
                    fetch: '/ashx/Common.ashx'
                }
            }
        }
    },
    data() {
        return {
            list: [],
            total: 0,
            tableHead: [],
            listLoading: false
        }
    },
    methods: {
        getList() {
            if (!this.api.fetch) {
                return false
            }
            if (!this.listQuery.PageSize) {
                this.listQuery.PageSize = 10
            }
            if (!this.listQuery.PageIndex) {
                this.listQuery.PageIndex = 1
            }
            this.listLoading = true
            var data = {}
            for (var i in this.listQuery) {
                if (this.listQuery[i] !== '') {
                    data[i] = this.listQuery[i]
                }
            }

            this.$getReq(this.api.fetch,"post",data).then(response => {
                if (response) {
                    if (response.Result) {
                        if (response.Result.data) {
                            if (response.Result.data.length <= 0 && this.listQuery.PageIndex > 1) {
                                this.listQuery.PageIndex--
                                this.getList()
                            } else {
                                this.tableHead = []
                                var title = response.Result.showtitle.split(',')
                                var t = response.Result.data[0]
                                Object.keys(t).forEach((key, index) => {
                                    if (title[index]) {
                                        var n = { name: title[index], property: key }
                                        this.tableHead.push(n)
                                    }
                                })
                                this.list = response.Result.data || []
                                this.total = response.Result.recordsTotal || 0
                                this.$emit('queryData', { list: response.Result || {}, total: this.total || 0 })
                            }
                        } else {
                            this.list = response.Result.data || []
                            this.total = response.Result.recordsTotal || 0
                            this.$emit('queryData', { list: response.Result, total: 0 })
                        }
                    }
                }
                this.listLoading = false
            }).catch((errs) => {
                this.listLoading = false
            })
        },
        handleCurrentChange(val) {
            this.listQuery.PageIndex = val
            this.getList()
        },
    }
}
</script>
  
<style>
.pagins {
    padding: 10px;
    text-align: right;
}
.table-container {

}
</style>
  