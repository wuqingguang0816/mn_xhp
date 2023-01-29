<template>
  <div class="home">
    <p class="titles">
      <img src="../assets/img/yldslogo.png" />
      食品安全风险分析统计平台
    </p>
    <div class="home_title">
      <div class="home_div classColor">
        <div class="home_div2 DivBox">
          <p class="p1" @click="amountTap">
            用户总数量 <span>{{ totalQuantity }}</span>
          </p>
          <p class="p2" @click="quantityTap">
            今日游览总数 <span>{{ amountNum }}</span>
          </p>
        </div>
        <div class="imgs imgb">
          <img src="../assets/img/index_user.svg" />
        </div>
      </div>
      <div
        class="home_div"
        :style="[
          { 'background-color': item.color },
          // { cursor: index == 3 || index == 4 ? 'pointer' : '' },
        ]"
        v-for="(item, index) in homeList"
        :key="index"
        @click="openData2(index)"
      >
        <div class="home_div2">
          <p>{{ item.name }}</p>
          <p>{{ item.val }}</p>
        </div>
        <div class="imgs" :style="{ 'background-color': item.imgcolor }">
          <img :src="item.bgimg" />
        </div>
      </div>
    </div>
    <!-- 原料风险指标 -->
    <el-row :gutter="20" class="yl_view">
      <el-col class="yl_view-left" :span="8">
        <div class="title">原料风险指标</div>
        <div class="yl_view-view">
          <div class="yl_view-img">
            <div class="sjHj">
              <p class="suz">{{ hjNum }}</p>
              <p class="wenz">{{ hjText }}</p>
            </div>
            <div class="sj_bx">
              <div class="f mb10">
                <div class="fa">
                  <p>{{ hejData[0].val }}</p>
                  <span>{{ hejData[0].text }}</span>
                </div>
                <div class="fb">
                  <p>{{ hejData[1].val }}</p>
                  <span>{{ hejData[1].text }}</span>
                </div>
              </div>
              <div class="f">
                <div class="fa">
                  <p>{{ hejData[2].val }}</p>
                  <span>{{ hejData[2].text }}</span>
                </div>
                <div class="fb">
                  <p>{{ hejData[3].val }}</p>
                  <span>{{ hejData[3].text }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col class="yl_view-right" :span="16">
        <div class="panel panel-default">
          <div class="title">风险信息数据统计</div>
          <div class="panel-body">
            <div ref="echartBar" style="width: 100%; height: 300px"></div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="yl_view">
      <el-col class="yl_view-left" :span="8">
        <div class="title">原辅料统计</div>
        <div class="panel-body">
          <div ref="echartPie" style="width: 100%; height: 300px"></div>
        </div>
      </el-col>
      <el-col class="yl_view-right" :span="16">
        <div class="panel panel-default">
          <div class="title">风险项目统计</div>
          <div class="panel-body">
            <el-table :data="tableData" style="width: 100%" height="300" :header-cell-style="{
        background: '#f3f6fa',
        color: '#102547',
        textAlign: 'center',
      }">
              <el-table-column fixed prop="WL" align="center" label="物料">
              </el-table-column>
              <el-table-column
                prop="ZB"
                align="center"
                label="指标"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="FXDJ"
                align="center"
                label="风险等级"
                width="100"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.FXDJ == '高'" class="gg">{{
                    scope.row.FXDJ
                  }}</span>
                  <span v-if="scope.row.FXDJ == '中'" class="gz">{{
                    scope.row.FXDJ
                  }}</span>
                  <span v-if="scope.row.FXDJ == '低'" class="gd">{{
                    scope.row.FXDJ
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="GKCS" align="center" label="管控措施">
              </el-table-column>
              <el-table-column
                prop="XQ"
                align="center"
                width="120"
                label="详情"
              >
                <template slot-scope="scope">
                  <div v-html="scope.row.XQ"></div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
    <!--  -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <el-table :data="tableDataList" border style="width: 100%" height="400" :header-cell-style="{
        background: '#f3f6fa',
        color: '#102547',
        textAlign: 'center',
      }">
        <el-table-column prop="SYB" label="事业部" align="center">
        </el-table-column>
        <el-table-column prop="CS" label="次数" align="center">
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--  -->
  </div>
</template>
  
<script>
import * as echarts from "echarts";
export default {
  components: {},
  name: "foodSafety",
  data() {
    return {
      dialogVisible: false,
      totalQuantity: 0, //用户总数量
      amountNum: 0, //今日游览总数
      GlistQuery: "",
      title: "",
      tableId: "1000194",
      homeList: [
        // {
        //   name: "用户数量",
        //   val: 0,
        //   color: "#516AE8",
        //   bgimg: require("@/assets/img/index_user.svg"),
        // },
        {
          name: "污染物数量",
          val: 0,
          color: "#FF870F",
          bgimg: require("@/assets/img/index_wrw.svg"),
        },
        {
          name: "食品数量",
          val: 0,
          color: "#0088FE",
          bgimg: require("@/assets/img/index_sp.svg"),
        },
        {
          name: "食品添加剂",
          val: 0,
          color: "#30C283",
          bgimg: require("@/assets/img/index_tjj.svg"),
        },
        {
          name: "编码配置",
          val: 0,
          color: "#607DFF",
          bgimg: require("@/assets/img/index_bmpz.svg"),
        },
      ],
      num: "",
      hjNum: "", //合计数据
      hjText: "",
      tableData: [],
      hejData: [
        {
          text: "原料标准",
          val: 0,
        },
        {
          text: "产品内控标准",
          val: 0,
        },
        {
          text: "国家食品安全标准",
          val: 0,
        },
        {
          text: "欧盟食品安全标准",
          val: 0,
        },
      ],
      tableDataList: [], //
    };
  },
  created() {
    this.UserId = this.$route.query.userId;
    this.getliulan();
    this.NumberOfTours();
    this.NumberOfToursA();
    this.NumberOfToursB(); //
    this.NumberOfToursS(); //
    this.NumberOfToursHj(); //合计
    this.NumberOfToursHj1(); //
    this.NumberOfToursHj2(); //
    this.NumberOfToursHj3(); //
    this.NumberOfToursHj4(); //
    this.dataStatistics(); //
    this.dataStatistics1(); //
    this.dataTable1(); //表格
    this.quantity1(); //
    this.amount1(); //
  },
  mounted() {},
  methods: {
    handleClose(){
      this.dialogVisible = false;
    },
    //今日浏览详情
    quantityTap() {
      this.tableDataList = [];
      const data = {
        SType: "GetTableData",
        UserId: this.UserId,
        ExcelID: "",
        TreeID: "1000324",
        PageIndex: 1,
        PageSize: 10,
        Filter: "{}",
      };
      this.$getReq("/ashx/Common.ashx", "post", data).then((res) => {
        this.dialogVisible = true;
        this.tableDataList = res.Result.data;
      });
    },
    //今日浏览详情
    amountTap() {
      this.tableDataList = [];
      const data = {
        SType: "GetTableData",
        UserId: this.UserId,
        ExcelID: "",
        TreeID: "1000325",
        PageIndex: 1,
        PageSize: 10,
        Filter: "{}",
      };
      this.$getReq("/ashx/Common.ashx", "post", data).then((res) => {
        this.dialogVisible = true;
        this.tableDataList = res.Result.data;
      });
    },
    //总数量
    quantity1() {
      const data = {
        SType: "GetTableData",
        UserId: this.UserId,
        ExcelID: "",
        TreeID: "1000322",
        PageIndex: 1,
        PageSize: 10,
        Filter: "{}",
      };
      this.$getReq("/ashx/Common.ashx", "post", data).then((res) => {
        this.amountNum = res.Result.data[0].CS;
      });
    },
    amount1() {
      const data = {
        SType: "GetTableData",
        UserId: this.UserId,
        ExcelID: "",
        TreeID: "1000323",
        PageIndex: 1,
        PageSize: 10,
        Filter: "{}",
      };
      this.$getReq("/ashx/Common.ashx", "post", data).then((res) => {
        this.totalQuantity = res.Result.data[0].CS;
      });
    },
    //
    NumberOfTours() {
      const data = {
        SType: "GetTableData",
        UserId: this.UserId,
        ExcelID: "",
        TreeID: "1000301",
        PageIndex: 1,
        PageSize: 10,
        Filter: "{}",
      };
      this.$getReq("/ashx/Common.ashx", "post", data).then((res) => {
        let data = res.Result.data;
        this.homeList[0].name = data[0].MC;
        this.homeList[0].val = data[0].SL;
      });
    },
    NumberOfToursB() {
      const data = {
        SType: "GetTableData",
        UserId: this.UserId,
        ExcelID: "",
        TreeID: "1000302",
        PageIndex: 1,
        PageSize: 10,
        Filter: "{}",
      };
      this.$getReq("/ashx/Common.ashx", "post", data).then((res) => {
        let data = res.Result.data;
        this.homeList[1].name = data[0].MC;
        this.homeList[1].val = data[0].SL;
      });
    },
    NumberOfToursA() {
      const data = {
        SType: "GetTableData",
        UserId: this.UserId,
        ExcelID: "",
        TreeID: "1000303",
        PageIndex: 1,
        PageSize: 10,
        Filter: "{}",
      };
      this.$getReq("/ashx/Common.ashx", "post", data).then((res) => {
        let data = res.Result.data;
        this.homeList[2].name = data[0].MC;
        this.homeList[2].val = data[0].SL;
      });
    },
    NumberOfToursS() {
      const data = {
        SType: "GetTableData",
        UserId: this.UserId,
        ExcelID: "",
        TreeID: "1000304",
        PageIndex: 1,
        PageSize: 10,
        Filter: "{}",
      };
      this.$getReq("/ashx/Common.ashx", "post", data).then((res) => {
        let data = res.Result.data;
        this.homeList[3].name = data[0].MC;
        this.homeList[3].val = data[0].SL;
        // var data = this.getshuju(res.Result.data);
        // this.barData.quotaData = data;
      });
    },
    NumberOfToursHj() {
      const data = {
        SType: "GetTableData",
        UserId: this.UserId,
        ExcelID: "",
        TreeID: "1000305",
        PageIndex: 1,
        PageSize: 10,
        Filter: "{}",
      };
      this.$getReq("/ashx/Common.ashx", "post", data).then((res) => {
        let data = res.Result.data;
        this.hjNum = data[0].SL;
        this.hjText = data[0].MC;
      });
    },
    NumberOfToursHj1() {
      const data = {
        SType: "GetTableData",
        UserId: this.UserId,
        ExcelID: "",
        TreeID: "1000306",
        PageIndex: 1,
        PageSize: 10,
        Filter: "{}",
      };
      this.$getReq("/ashx/Common.ashx", "post", data).then((res) => {
        let data = res.Result.data;
        this.hejData[0].val = data[0].SL;
        this.hejData[0].text = data[0].MC;
      });
    },
    NumberOfToursHj2() {
      const data = {
        SType: "GetTableData",
        UserId: this.UserId,
        ExcelID: "",
        TreeID: "1000307",
        PageIndex: 1,
        PageSize: 10,
        Filter: "{}",
      };
      this.$getReq("/ashx/Common.ashx", "post", data).then((res) => {
        let data = res.Result.data;
        this.hejData[1].val = data[0].SL;
        this.hejData[1].text = data[0].MC;
      });
    },
    NumberOfToursHj3() {
      const data = {
        SType: "GetTableData",
        UserId: this.UserId,
        ExcelID: "",
        TreeID: "1000308",
        PageIndex: 1,
        PageSize: 10,
        Filter: "{}",
      };
      this.$getReq("/ashx/Common.ashx", "post", data).then((res) => {
        let data = res.Result.data;
        this.hejData[2].val = data[0].SL;
        this.hejData[2].text = data[0].MC;
      });
    },
    NumberOfToursHj4() {
      const data = {
        SType: "GetTableData",
        UserId: this.UserId,
        ExcelID: "",
        TreeID: "1000309",
        PageIndex: 1,
        PageSize: 10,
        Filter: "{}",
      };
      this.$getReq("/ashx/Common.ashx", "post", data).then((res) => {
        let data = res.Result.data;
        this.hejData[3].val = data[0].SL;
        this.hejData[3].text = data[0].MC;
      });
    },
    dataStatistics() {
      const data = {
        SType: "GetTableData",
        UserId: this.UserId,
        ExcelID: "",
        TreeID: "1000310",
        PageIndex: 1,
        PageSize: 10,
        Filter: "{}",
      };

      this.$getReq("/ashx/Common.ashx", "post", data).then((res) => {
        console.log(res);
        let data = res.Result.data;
        let textArr = [],
          valArr = [];
        data.map((item) => {
          textArr.push(item.SYB);
          valArr.push(item.SL);
        });
        this.commandstats = echarts.init(this.$refs.echartBar);
        this.commandstats.setOption({
          xAxis: {
            type: "category",
            data: textArr,
          },
          yAxis: {
            type: "value",
          },
          color: "#4c9efd",
          grid: {
            top: "20px",
            left: "50px",
            right: "50px",
          },
          series: [
            {
              data: valArr,
              type: "bar",
              barMaxWidth: "16",
              itemStyle: {
                normal: {
                  //这里设置柱形图圆角 [左上角，右上角，右下角，左下角]
                  barBorderRadius: [2, 2, 0, 0],
                },
              },
            },
          ],
        });
      });
    },
    dataStatistics1() {
      const data = {
        SType: "GetTableData",
        UserId: this.UserId,
        ExcelID: "",
        TreeID: "1000312",
        PageIndex: 1,
        PageSize: 10,
        Filter: "{}",
      };

      this.$getReq("/ashx/Common.ashx", "post", data).then((res) => {
        let data = res.Result.data;
        let datas = [];
        data.map((item) => {
          datas.push({
            name: item.NAME,
            value: item.VALUE,
          });
        });
        this.echartPie = echarts.init(this.$refs.echartPie);
        this.echartPie.setOption({
          color: [
            "#5b68e3",
            "#f7c641",
            "#f1aa21",
            "#fa8623",
            "#3cc183",
            "#3686fd",
          ],
          legend: {
            itemHeight: 14,
            itemWidth: 14,
            icon: "rect",
            orient: "vertical",
            top: "center",
            right: "10%",
            textStyle: {
              align: "left",
              color: "",
              verticalAlign: "middle",
              rich: {
                name: {
                  width: 80,
                  fontSize: 14,
                },
                value: {
                  width: 20,
                  align: "right",
                  fontFamily: "Medium",
                  fontSize: 14,
                },
                rate: { width: 10, align: "right", fontSize: 14 },
              },
            },
            data: datas,
            // formatter: function (name) {
            //   var data = data[0].value;
            //   var total = 0;
            //   var tarValue;
            //   for (var i = 0; i < data.length; i++) {
            //     total += data[i].value;
            //     if (data[i].name == name) {
            //       tarValue = data[i].value;
            //     }
            //   }
            //   var v = tarValue;
            //   var p = Math.round((tarValue / total) * 100);
            //   return `${name}  ${v} (${p}%)`;
            // },
          },
          tooltip: {
            trigger: "item",
            formatter: "{d}%",
          },
          series: [
            {
              name: "",
              type: "pie",
              radius: ["30%", "80%"],
              center: ["35%", "50%"],
              roseType: "radius",
              label: {
                show: false,
                formatter: "{d}%",
              },
              labelLine: {
                show: false,
                length: 1,
                length2: 20,
              },
              data: datas,
              left: "left",
            },
          ],
        });
      });
    },
    dataTable1() {
      const data = {
        SType: "GetTableData",
        UserId: this.UserId,
        ExcelID: "",
        TreeID: "1000311",
        PageIndex: 1,
        PageSize: 999,
        Filter: "{}",
      };
      this.$getReq("/ashx/Common.ashx", "post", data).then((res) => {
        console.log(res);
        let data = res.Result.data;
        this.tableData = data;
      });
    },
    //
    // 浏览次数
    getliulan() {
      var data = {
        UserId: this.UserId,
        sType: "Visit",
        WebSite: "WEBSITE",
      };
      this.$getReq("/ashx/Common.ashx", "post", data).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
  
<style scoped lang="scss">
.classColor {
  cursor: pointer;
  background-color: #516ae8;
  .imgb {
  }
}
.home {
  // position: fixed;
  // width: calc(100% - 30px);
  // height: calc(100% - 30px);
  background-color: #f4f4f4;
  padding: 15px;

  .titles {
    background-color: #fff;
    height: 3rem;
    font-size: 1.2rem;
    font-weight: bold;
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    line-height: 3rem;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);
    z-index: 9999;

    img {
      width: 3rem;
      vertical-align: middle;
      margin: 0 15px;
    }
  }

  .home_title {
    display: flex;
    margin-top: 10px;
    margin-top: 3rem;
    .home_div {
      flex: 1;
      padding: 1.25rem;
      margin: 0 0.625rem;
      border-radius: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      font-size: 1.2rem;
      height: 4rem;

      .imgs {
        width: 3.75rem;
        height: 3.75rem;
        line-height: 3.75rem;
        text-align: right;
        border-radius: 8px;
        opacity: 0.6;

        img {
          width: 100%;
          vertical-align: middle;
        }
      }

      .home_div2 {
        justify-content: space-between;
        display: flex;
        flex-flow: column;
        margin-left: 10px;

        p:nth-child(1) {
          font-size: 1rem;
          font-weight: bold;
        }

        p:nth-child(2) {
          font-size: 1.3rem;
          white-space: nowrap;
          color: #fff;
          margin-top: 10px;
        }
        &.DivBox .p1 {
          font-size: 1rem;
        }
        &.DivBox .p2 {
          font-size: 1rem;
          font-weight: bold;
        }
      }
    }
  }

  .yl_view {
    margin-top: 20px;
    display: flex;
    .title {
      font-size: 1.1rem;
      font-weight: 600;
      padding: 10px 10px;
    }
    .yl_view-left {
      border: 1px solid rgb(199, 199, 199);
      background-color: #fff;
      border-radius: 8px;
      flex: 1;
    }
    .yl_view-view {
      display: flex;
      align-items: center;
      height: 250px;
    }
    .yl_view-img {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;
      padding-left: 20px;

      .sj_bx {
        padding-right: 20px;
        width: 50%;
        .mb10 {
          margin-bottom: 20px;
        }
        .f {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .fa {
            flex: 1;
            margin-right: 40px;
            p {
              color: #14264f;
              font-size: 1.5rem;
            }
            span {
              color: #9ca2b3;
              font-size: 0.9rem;
            }
          }
          .fb {
            flex: 1;
            p {
              color: #14264f;
              font-size: 1.5rem;
            }
            span {
              color: #9ca2b3;
              font-size: 0.9rem;
            }
          }
        }
      }
    }
    .sjHj {
      text-align: center;
      width: 150px;
      height: 150px;
      border-radius: 100%;
      background: linear-gradient(#dbeeff, #dbeeff);
      position: relative;
      &::after {
        content: "";
        background: linear-gradient(#6089ff, #0089ff);
        width: 134px;
        height: 134px;
        border-radius: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -67px;
        margin-left: -67px;
      }
      &::before {
        content: "";
        background: url(../assets/img/index_ylfx.png) no-repeat center bottom;
        width: 134px;
        background-size: 100%;
        height: 90px;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2;
      }
      .suz {
        position: absolute;
        top: 32%;
        left: 50%;
        transform: translate(-50%);
        z-index: 66;
        font-size: 2rem;
        color: #fff;
      }
      .wenz {
        position: absolute;
        top: 56%;
        left: 50%;
        transform: translate(-50%);
        z-index: 66;
        font-size: 0.9rem;
        color: #fff;
      }
    }
  }

  .panel {
    border: 1px solid rgb(199, 199, 199);
    background-color: #fff;
    border-radius: 8px;
    flex: 1;
  }
}
.box {
  margin-top: 3.2rem;
}
.yis {
  color: #ff870f;
}
.yB {
  color: #0089ff;
  font-style: normal;
}

.gg {
  background-color: #ff870f;
  padding: 2px 8px;
  color: #fff;
  border-radius: 2px;
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
}
.gz {
  background-color: #4c9efd;
  padding: 2px 8px;
  color: #fff;
  border-radius: 2px;
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
}
.gd {
  background-color: #30c283;
  padding: 2px 8px;
  color: #fff;
  border-radius: 2px;
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
}
</style>
<style>
.dvs a {
  text-decoration: revert !important;
  color: #409eff;
}
</style>