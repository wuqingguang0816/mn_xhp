<template>
  <div class="index">
    <div class="body1">
      <div class="body_top">
        <div class="title">筛选条件</div>
        <div class="fold_right" @click="open_fold">
          <span>{{ open_folds ? '折叠' : '展开' }}</span>
          <i :class="open_folds ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
        </div>
      </div>
      <div class="body_bottom" v-show="open_folds">
        <search ref="refsearch" @getList="TabbleCommon" name="/" :UserId="UserId" :tableId="tableId"></search>
      </div>
    </div>
    <div class="body2">
      <div class="body_top">
        <div class="title">
          <span>定量结果</span>
          <span>（*检查结果为数值）</span>
        </div>
      </div>
      <div class="body_bottom">
        <!-- <el-table v-if="tableData.length > 0" :data="tableData"
          :header-cell-style="{ 'text-align': 'center', 'background': '#f8f8f8', 'height': '54px' }"
          :cell-style="{ 'text-align': 'center', 'height': '54px' }" height="270" style="width: 100%">
          <el-table-column v-for="(item, index) in tableHead" :label="item.name" :key="index" :prop="item.property">

          </el-table-column>
        </el-table> -->
        <query ref="queryTable2" height="270" :listQuery="listQuery2"></query>
      </div>
    </div>
    <div class="body2">
      <div class="body_top">
        <div class="title">
          <span>定性结果</span>
          <span>（*检查结果为阴性、阳性）</span>
        </div>
      </div>
      <div class="body_bottom">
        <!-- <el-table :data="tableData2"
          :header-cell-style="{ 'text-align': 'center', 'background': '#f8f8f8', 'height': '54px' }"
          :cell-style="{ 'text-align': 'center', 'height': '54px' }" height="270" style="width: 100%">
          <el-table-column v-for="(item, index) in tableHead2" :label="item.name" :key="index" :prop="item.property">

          </el-table-column>
        </el-table> -->
        <query ref="queryTable" height="270" :listQuery="listQuery"></query>
      </div>
    </div>
  </div>
</template>

<script>
import query from './queryTbale.vue'
import search from './search.vue'
export default {
  components: {
    query, search
  },
  name: 'index',
  data() {
    return {
      tableId: '1000194',
      listQuery: {
        "SType": "GetTableData",
        "UserId": "88800000",
        "ExcelID": "",
        "TreeID": "1000195",
        "PageIndex": 1,
        "PageSize": 10,
        "Filter": "{}"
      },
      listQuery2: {
        "SType": "GetTableData",
        "UserId": "88800000",
        "ExcelID": "",
        "TreeID": "1000194",
        "PageIndex": 1,
        "PageSize": 10,
        "Filter": "{}"
      },
      open_folds: true,
      formData: {
        data_sources: '',
        date_type: '1',
        times: []
      },

      tableHead: [],
      sourcesData: [{
        value: '选项1',
        label: '生乳样品信息表1'
      }, {
        value: '选项2',
        label: '生乳样品信息表2'
      }, {
        value: '选项3',
        label: '生乳样品信息表3'
      }],
      tableData: [],
      tableData2: [],
      tableHead2: [],
    }
  },
  created() {
    this.UserId = this.$route.query.userId;
  },
  mounted() {
    // this.TabbleCommon()
    this.$refs.refsearch.getData()
  },
  methods: {
    open_fold() {
      this.open_folds = !this.open_folds
    },
    timeChange(e) {
      this.formData.times = e
    },
    jsonToFormData(config) {
      const formData = new FormData();
      //循环传入的值转换formData
      Object.keys(config).forEach((key) => {
        formData.append(key, config[key]);
      })
      return formData;
    },

    TabbleCommon(f) {
      // const data = {
      //   "SType": "GetTableData",
      //   "UserId": "88800000",
      //   "ExcelID": "",
      //   "TreeID": "1000194",
      //   "PageIndex": "1",
      //   "PageSize": "10",
      //   "Filter": "{}",
      // }
      // this.$axios.post('/api/LIMS/ashx/Common.ashx', data).then(r => {
      //   console.log(r)
      //   var title = r.Result.showtitle.split(',')
      //   var t = r.Result.data[0]
      //   Object.keys(t).forEach((key, index) => {
      //     if (title[index]) {
      //       var n = { name: title[index], property: key }
      //       this.tableHead.push(n)
      //     }
      //   })
      //   this.tableData = r.Result.data
      //   console.log(this.tableHead)
      // })
      // const data2 = {
      //   "SType": "GetTableData",
      //   "UserId": "88800000",
      //   "ExcelID": "",
      //   "TreeID": "1000195",
      //   "PageIndex": "1",
      //   "PageSize": "10",
      //   "Filter": "{}",
      // }
      // this.$axios.post('/api/LIMS/ashx/Common.ashx', data2).then(r => {
      //   console.log(r)
      //   var title = r.Result.showtitle.split(',')
      //   var t = r.Result.data[0]

      //   Object.keys(t).forEach((key, index) => {
      //     if (title[index]) {
      //       var n = { name: title[index], property: key }
      //       this.tableHead2.push(n)
      //     }
      //   })
      //   this.tableData2 = r.Result.data
      // })
      this.listQuery2.UserId = this.listQuery.UserId = this.UserId
      this.listQuery2.Filter = this.listQuery.Filter = JSON.stringify(f)
      this.$refs.queryTable2.getList()
      this.$refs.queryTable.getList()
      // const data3 = {
      //   "SType": "GetGridDefine",
      //   "UserId": "88800000",
      //   "TreeID": "1000194"
      // }
      // console.log(data3)
      // this.$axios.post('/api/LIMS/ashx/Common.ashx', data3).then(r => {
      //   console.log(r)
      // })
    }
  }
}
</script>

<style scoped lang="scss">
.index {
  background-color: #edf0f2;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
}

.index .body1 {
  margin: 20px 20px 14px 20px;
  background: #fff;
  border-radius: 4px;

  .body_top {
    height: 58px;
    display: flex;
    justify-content: space-between;

    .fold_right {
      font-size: 14px;
      height: 14px;
      margin-top: 23px;
      line-height: 14px;
      color: #abbccb;
      margin-right: 20px;
    }
  }

  .body_bottom {
    border-top: 1px solid #eff4f5;
    
  }
}

.body2 {
  margin: 0 20px 14px 20px;
  background: #fff;
  border-radius: 4px;

  .body_top {
    height: 58px;
    display: flex;
    justify-content: space-between;
  }

  .body_bottom {
    text-align: center;
  }
}

.index {
  .title {
    font-size: 14px;
    font-weight: bold;
    margin-left: 20px;
    padding-left: 10px;
    border-left: 4px solid #0083d6;
    height: 14px;
    margin-top: 23px;
    line-height: 14px;
  }

  .title span:last-child {
    font-weight: 500;
  }
}

.btn {
  float: right;
  margin: 0;

  .btns {
    width: 88px;
  }
}
</style>
