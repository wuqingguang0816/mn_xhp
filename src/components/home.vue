<template>
    <div class="home">
          <query ref="queryTable" height="270" :listQuery="listQuery"></query>
    </div>
  </template>
  
  <script>
  import query from './queryTbale.vue'
  export default {
    components: {
      query
    },
    name: 'Home',
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
      TabbleCommon(f) {
        this.listQuery2.UserId = this.listQuery.UserId = this.UserId
        this.listQuery2.Filter = this.listQuery.Filter = JSON.stringify(f)
        this.$refs.queryTable2.getList()
        this.$refs.queryTable.getList()
      }
    }
  }
  </script>
  
  <style scoped lang="scss">

  </style>
  