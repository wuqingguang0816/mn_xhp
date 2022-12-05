<template>
  <div id="app">
    <router-view ref="appView" />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    console.log(process.env, "env:");
    console.log(process.env.baseUrl, "baseUrl:");
  },
  // watch: {
  //   $route() {
  //     //切换标签时
  //     this.handleRefreshTable();
  //   },
  // },
  // created() {
  //   let _this = this;
  //   //窗口改变时
  //   window.onresize = function () {
  //     _this.handleRefreshTable();
  //   };
  // },
  updated() {
    //数据改变时
    // this.handleRefreshTable();
  },
  methods: {
    // handleRefreshTable() {
    //   this.$nextTick(() => {
    //     // 获取页面中已注册过ref的所有的子组件。
    //     let refList = this.$refs.appView.$refs;
    //     console.log(refList)
    //     if (refList) {
    //       for (let i of Object.keys(refList)) {
    //         // 根据doLayout方法判断子组件是不是el-table
    //         if (refList[i] && refList[i].doLayout) {
    //           // 执行doLayout方法
    //           refList[i].doLayout();
    //         }
    //       }
    //     }
    //   });
    // },
  },
};
</script>
<style>
  @import './assets/style.css';
body {
  background-color: #f5f5f5;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.el-dialog__footer {
  text-align: center !important;
}

/* .el-table__body tr.hover-row>td.el-table__cell,.el-table__body tr.hover-row>td.el-table__cell{
  border-color: #3d3d3d !important;
  background-color: #eff4f8 !important;
} */
/* 智能杀菌 */
.demo-intellect .el-form-item__content {
  display: flex !important;
}
.demo-intellect .btnForm {
  margin-left: 10px !important;
}

.elSelect .el-tag.el-tag--info {
  width: 58px !important;
}

/* 修改滚动条 */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 30px;
  background: hsl(0, 0%, 74%);
}

::-webkit-scrollbar-track {
  border-radius: 30px;
  background: rgba(0, 0, 0, 0);
}

.el-button.el-button--success {
  background: #76bc29 !important;
}
.el-button.el-button--success:focus,
.el-button.el-button--success:hover {
  background: #69af1f !important;
}
/* .el-button--primary.el-button{
   background:#0087ce  !important;
   color: #fff !important;
}
.el-button.el-button--primary:focus, .el-button.el-button--primary:hover{
   background:#007ec2  !important;
} */
.Inputwidth .el-form-item__label {
  flex: none !important;
}
.el-form--inline .label-linebreaks-from {
  display: flex !important;
}
.el-form--inline .Inputwidth1 {
  display: flex !important;
}
.el-form-item__label {
  flex: none !important;
}
.el-button--danger:focus,
.el-button--danger:hover {
  background: #f74418 !important;
  border-color: #f74418 !important;
  color: #fff;
}
.el-button--danger {
  background: #ff5022 !important;
  border-color: #ff5022 !important;
}

.el-checkbox__inner {
  border: 1px solid #333 !important;
}
.product_top .el-form-item__label {
  color: #333 !important;
  font-weight: 600 !important;
}
.el-select-dropdown {
  max-width: 30% !important;
}
.el-select-dropdown__item {
  word-wrap: break-word !important;
  word-break: normal !important;
  height: auto !important;
  line-height: 25px !important;
  white-space: normal !important;
}

.el-collapse-item__header {
  background-color: #0084d6 !important;
  color: #fff;
  padding: 0 10px;
  user-select: none;
}

/* .el-form-item__label {
  line-height: 18px;
} */

.MB6 .el-form-item__label {
  margin-bottom: 6px;
}

.ylBtn {
  background-color: #0084d6;
  color: #fff;
}
.ylBtn:active {
  background-color: #036bac;
}
.el-form-item__content{
  line-height: 38px !important;
}
.el-form-item--mini .el-form-item__label{
  line-height: 40px !important;
}

.el-table .el-table__cell{
  padding: 7px 0;
}
</style>
