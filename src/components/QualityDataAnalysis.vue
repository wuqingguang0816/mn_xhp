<template>
  <div class="index">
    <div class="body1">
      <div class="body_top">
        <div class="title">筛选条件</div>
        <div class="fold_right" @click="open_fold">
          <span>{{ open_folds ? "折叠" : "展开" }}</span>
          <i
            :class="open_folds ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
          ></i>
        </div>
      </div>
      <div class="body_bottom" v-show="open_folds">
        <search
          ref="refsearch"
          @getList="getbotmEcarts"
          name="/"
          :UserId="UserId"
          @getTitle="getTitle"
          :tableId="tableId"
        ></search>
      </div>
    </div>
    <div class="body1">
      <div class="body_top">
        <div class="title">{{titles}}地图</div>
        <!-- <div class="fold_right" @click="open_fold">
        <span>{{open_folds?'折叠':'展开'}}</span>
        <i :class="open_folds?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
      </div> -->
      </div>
      <div class="body_bottom chinaMap" v-loading="geoShow">
        <div class="chinaMap_statistics">
          <div
            v-for="(item, inx) in Statistics"
            class="tt"
            :class="item.title === '总数量' ? 'zsl' : ''"
          >
            <span class="t">{{ item.title }}：</span>
            <span class="text">{{ item.num }}</span>
          </div>
        </div>
        <mapEcharts
          v-if="barData.quotaData.length > 0"
          height="100%"
          :city="city"
          @cityList="getcity"
          :barData="barData"
          :groupArr="groupArr"
          ref="mapEcharts"
        ></mapEcharts>
        <div
          v-else
          style="text-align: center;line-height: 200px;font-size: 18px;"
        >
          暂无数据
        </div>
        <!-- <div id="dataMapecharts" style="width: 100%;height: 660px;"></div> -->
      </div>
    </div>
    <div class="body1">
      <div class="body_top">
        <div class="title">{{titles}}柱状图</div>
      </div>
      <div class="body_bottom histogram_body_bottom">
        <el-col :span="24">
          <div
            v-if="zhushow"
            class="histogram"
            id="histogram"
            :style="histogram"
          ></div>
        </el-col>
        <!-- <el-col :span="24">
        <div class="histogram_bottom">
          <div class="bottom_div">
            <div class="max_zhi"></div>
            <div>最大值</div>
          </div>
          <div class="bottom_div">
            <div class="min_zhi"></div>
            <div>最小值</div>
          </div>
        </div>
      </el-col> -->
      </div>
    </div>
    <el-dialog
      :title="titles"
      fullscreen
      :visible.sync="dialogVisible"
      @close="dialogVisibleClose"
    >
      <QualityTwoChildren
        ref="QualityTwoChildren"
        :name="titles"
        :UserId="UserId"
        :CITY="CITY"
      ></QualityTwoChildren>
    </el-dialog>
  </div>
</template>
<script>
import * as echarts from "echarts";
import mapEcharts from "./mapEcharts.vue";
import search from "./search.vue";
import china from "@/assets/china2.json"; //地图包
import QualityTwoChildren from "./QualityTwoChildren.vue";

import MSG from "@/linbs/mesAge";

export default {
  name: "QualityDataAnalysis",
  components: { search, mapEcharts, QualityTwoChildren },
  data() {
    return {
      dialogVisible: false,
      CITY: "",
      open_folds: true,
      text: "< 100",
      formData: {
        data_sources: "",
        date_type: "1",
        times: []
      },
      zhushow: false,
      histogram: { float: "left", width: "100%", height: "380px" }, //图表样式
      is_show: false,
      box_name: "",
      UserId: "",
      geoShow: true,
      titles:"",
      barData: { quotaData: [] },
      city: china,
      tableId: "1000260",
      Statistics: [],
      groupArr:{},//地图数据
      dataArr:[],
    };
  },
  created() {
    this.UserId = this.$route.query.userId;
    var tableId = this.$route.query.tableId;
    if (tableId) {
      this.tableId = tableId;
    }
  },
  mounted() {
    // this.getbotmEcarts();
    // this.mYecharts();
    // this.mYgradeEcharts();
    // this.getBox1Data()
    this.$refs.refsearch.getData();
  },
  methods: {
    dialogVisibleClose() {
      this.dialogVisible = false;
      this.$refs.refsearch.inquireTap();
    },
    TabbleCommon(f) {},
    // 条件筛选折叠展开
    open_fold() {
      this.open_folds = !this.open_folds;
    },
    //获取日期
    timeChange(e) {
      this.formData.times = e;
    },
    getcity(r) {
      // this.barData
      this.barData = { quotaData: [] };
      var d = JSON.parse(this.$store.state.Filter);
      d.CITY = r;
      this.$store.state.Filter = JSON.stringify(d);
      this.CITY = r;
      this.dialogVisible = true;
      var that = this;
      MSG.loading("加载中...");
      this.$nextTick(() => {
        setTimeout(() => {
          that.$refs.QualityTwoChildren.getData();
        }, 1000);
      });
      // this.$router.push({
      //   name: "QualityTwoChildren",
      //   query: {
      //     userId: this.UserId,
      //     sfName: r,
      //     name: '品质数据分析'
      //   },
      // });
    },
    //弹窗方法
    getBox1Data() {
      const box1 = echarts.init(document.getElementById("box1"));
      let option;
      option = {
        backgroundColor: "#ffffff",
        legend: {
          itemWidth: 15, //图例的宽度
          itemHeight: 15, //图例的高度
          itemGap: 25,
          orient: "vertical",
          right: "right",
          top: "center",
          icon: "rect",
          selectedMode: false, //取消图例上的点击事件
          show: false
        },
        color: ["#4B9FFC", "#4CC473", "#FAB220"], //扇形区域以及列表颜色
        series: [
          {
            type: "pie",
            radius: ["60%", "75%"], //两个表示环
            center: ["50%", "55%"],
            labelLine: {
              //设置延长线的长度
              normal: {
                length: 5 //设置延长线的长度
                // length2: 3,//设置第二段延长线的长度
              }
            },
            label: {
              normal: {
                formatter: "{b}", //这里最后另一行设置了一个空数据是为了能让延长线与hr线对接起来
                padding: [0, -10], //取消hr线跟延长线之间的间隙
                rich: {
                  a: {
                    color: "#999",
                    lineHeight: 20, //设置最后一行空数据高度，为了能让延长线与hr线对接起来
                    align: "center"
                  },
                  hr: {
                    //设置hr是为了让中间线能够自适应长度
                    borderColor: "auto", //hr的颜色为auto时候会主动显示颜色的
                    width: "105%",
                    borderWidth: 0.5,
                    height: 0.5
                  },
                  per: {
                    //用百分比数据来调整下数字位置，显的好看些。如果不设置，formatter最后一行的空数据就不需要
                    padding: [4, 0]
                  }
                }
              },
              position: "left"
            },
            data: [
              {
                value: 20,
                name: ">500"
              },
              {
                value: 20,
                name: "200~500"
              },
              {
                value: 20,
                name: "1~200"
              }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      box1.setOption(option);
      // 自适应窗口大小
      window.addEventListener("resize", function() {
        box1.resize();
      });
    },
    //左下角环形图
    mYgradeEcharts() {
      const gradeEcharts = echarts.init(
        document.getElementById("gradeEcharts")
      );
      let option;
      option = {
        backgroundColor: "#ffffff",
        legend: {
          itemWidth: 15, //图例的宽度
          itemHeight: 15, //图例的高度
          itemGap: 25,
          orient: "vertical",
          right: "right",
          top: "center",
          icon: "rect",
          selectedMode: false, //取消图例上的点击事件
          data: ["4~18岁", "18<X≤80岁", ">80岁"]
        },
        color: ["#4B9FFC", "#4CC473", "#FAB220"], //扇形区域以及列表颜色
        series: [
          {
            type: "pie",
            radius: ["60%", "75%"], //两个表示环
            center: ["50%", "55%"],
            labelLine: {
              //设置延长线的长度
              normal: {
                length: 5 //设置延长线的长度
                // length2: 3,//设置第二段延长线的长度
              }
            },
            label: {
              normal: {
                // formatter: '{d}%, {c} \n\n',
                formatter: "{b}", //这里最后另一行设置了一个空数据是为了能让延长线与hr线对接起来
                padding: [0, -10], //取消hr线跟延长线之间的间隙
                rich: {
                  a: {
                    color: "#999",
                    lineHeight: 20, //设置最后一行空数据高度，为了能让延长线与hr线对接起来
                    align: "center"
                  },
                  hr: {
                    //设置hr是为了让中间线能够自适应长度
                    borderColor: "auto", //hr的颜色为auto时候会主动显示颜色的
                    width: "105%",
                    borderWidth: 0.5,
                    height: 0.5
                  },
                  per: {
                    //用百分比数据来调整下数字位置，显的好看些。如果不设置，formatter最后一行的空数据就不需要
                    padding: [4, 0]
                  }
                }
              },
              position: "left"
            },
            data: [
              {
                value: 20,
                name: ">500"
              },
              {
                value: 20,
                name: "200~500"
              },
              {
                value: 20,
                name: "1~200"
              }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      gradeEcharts.setOption(option);
      option;
      window.addEventListener("resize", function() {
        gradeEcharts.resize();
      });
    },
    getbotmEcarts(f) {
      this.barData.quotaData = [];
      this.zhushow = false;
      this.geoShow = true;
      // var a = { "XMMC": "脂肪", "TNAME": "FXXMPT_WRW_SR", "DTYPE": "JYRQ", "KSRQ": "2022-01-01", "JSRQ": "2022-12-31", "CITY": "*", "JTYPE": "*", "NYDMC": "*", "JCTYPE": "*" }
      const data = {
        SType: "GetTableData",
        UserId: this.UserId,
        ExcelID: "",
        TreeID: "1000262",
        PageIndex: "1",
        PageSize: "10000000",
        Filter: JSON.stringify(f)
      };
      this.$store.state.Filter = data.Filter;
      this.$getReq("/ashx/Common.ashx", "post", data).then(res => {
        var datas = res.Result.data;
        var name = [],
          max = [],
          min = [],
          avg = [],
          P50List = [],
          P95list = [];
        if (datas.length > 0) {
          datas.map(r => {
            name.push(r.CITY);
            avg.push(r.AVGVLAUE);
            max.push(r.MAXVLAUE);
            min.push(r.MINVLAUE);
            P50List.push(r.P50);
            P95list.push(r.P95);
          });
          this.zhushow = true;
          this.$nextTick(() => {
            this.initEcharts(name, max, min, avg, P50List, P95list);
          });
        }
      });
      data.TreeID = "1000260";
      data.PageSize = "9999";
      this.$getReq("/ashx/Common.ashx", "post", data).then(res => {
        var data2 = res.Result.data;
        this.dataArr = JSON.parse(JSON.stringify(data2))
        
        var nameList = [];
        var obj = [];
        if (data2.length > 0) {
          // 计算总数 20230513 ch
          let s = [];
          this.groupArr = {};
          let group = this.getGroup(data2, "QJMS");
          this.groupArr = group;
          s.push({
            title: "总数量",
            num: data2.length
          });
          if (s.length > 0) {
            this.Statistics = s;
          }
          //
          data2.map(r => {
            if (obj.indexOf(r.CITY) < 0) {
              obj.push(r.CITY);
              nameList.push({
                name: r.CITY,
                center: [r.LONGITUDE, r.LATITUDE],
                val: []
              });
            }
          });
          nameList.map(r => {
            data2.map(res => {
              if (r.name == res.CITY) {
                r.val.push({ name: res.QJMS, value: res.GS, city: r.name });
              }
            });
          });
          nameList.map(r => {
            this.barData.quotaData.push(
              this.randomPieSeries(r.val, r.center, 20)
            );
          });
        } else {
          this.barData.quotaData = [];
        }
        this.geoShow = false;
      });
    },
    getTitle(it){
      this.titles=it[0].TITLE
    },
    randomPieSeries(data, center, radius) {
      let that = this;
      return {
        type: "pie",
        coordinateSystem: "geo",
        tooltip: {
          formatter: function(params) {
            var str = "<div>";
            str += `${params.data.city}<br/>${params.data.name}:${params.data.value}</div>`;
            return str;
          }
        },
        label: {
          show: false
        },

        labelLine: {
          show: false
        },
        animationDuration: 0,
        radius,
        center,
        data
      };
    },
    //底部柱状图
    initEcharts(name, max, min, avg, P50List, P95list) {
      const histogram = echarts.init(document.getElementById("histogram"));

      histogram.clear();
      // 基本柱状图
      const option = {
        backgroundColor: "#ffffff",
        // tooltip: {
        //   trigger: 'item',
        //   triggerOn: 'mousemove',
        //   enterable: true,//鼠标是否可进入提示框浮层中
        //   formatter: formatterHover,//修改鼠标悬停显示的内容
        // },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        legend: {
          data: ["最大值", "最小值", "均值", "P50", "P95"]
        },
        xAxis: [
          {
            type: "category",
            data: name,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: {},
        series: [
          {
            name: "最大值",
            type: "bar",
            tooltip: {
              valueFormatter: function(value) {
                return value;
              }
            },
            data: max
          },
          {
            name: "最小值",
            type: "bar",
            tooltip: {
              valueFormatter: function(value) {
                return value;
              }
            },
            data: min
          },
          {
            name: "均值",
            type: "line",

            tooltip: {
              valueFormatter: function(value) {
                return value;
              }
            },
            data: avg
          },
          {
            name: "P50",
            type: "bar",

            tooltip: {
              valueFormatter: function(value) {
                return value;
              }
            },
            data: P50List
          },
          {
            name: "P95",
            type: "bar",

            tooltip: {
              valueFormatter: function(value) {
                return value;
              }
            },
            data: P95list
          }
        ]
      };
      function formatterHover(params) {
        let dataIndex = params.dataIndex;
        return `<div style='padding-left:10px;border-left:16px solid #4B9FFA;height:10px;line-height:10px;text-align:left'>最大值：${yData[dataIndex].max}</div>
          <div style='padding-left:10px;border-left:16px solid #4CC473;height:10px;line-height:10px;margin-top:10px;text-align:left'>最小值：${yData[dataIndex].min}</div>`;
      }
      histogram.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        histogram.resize();
      });
    }
  }
};
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
    padding: 0;
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

.chinaMap {
  height: 550px;
  position: relative;
  .chinaMap_statistics {
    position: absolute;
    right: 60px;
    top: 111px;
    z-index: 99;
    .tt {
      font-size: 15px;
      background-color: #eee;
      padding: 8px 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &.zsl {
        margin-top: 10px;
      }
      .text {
        font-weight: 600;
        color: #0083d6;
      }
    }
  }
  .left_bottom {
    position: absolute;
    bottom: 30px;
    left: 30px;
    text-align: left;

    .title2 {
      padding-left: 16px;
      font-size: 16px;
    }
  }

  .right_bottom {
    position: absolute;
    bottom: 30px;
    right: 60px;
    text-align: left;

    div {
      margin-top: 8px;
      font-size: 12px;
      height: 10px;
      line-height: 10px;
      padding-left: 10px;
    }

    .title2 {
      margin-bottom: 16px;
      font-size: 16px;
      padding: 0;
    }

    div:nth-child(2) {
      border-left: 22px solid #0086d5;
    }

    div:nth-child(3) {
      border-left: 22px solid #4bb1ee;
    }

    div:nth-child(4) {
      border-left: 22px solid #c6e5f5;
    }
  }

  .box1_div {
    position: absolute;
    top: 20px;
    width: 200px;
    height: 140px;
    left: 50%;
    margin-left: -100px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 2px 0px #4bb1ee;
  }
}

.index .body1 .histogram_body_bottom {
  height: 380px;
  // padding: 0 0 60px 0;
  overflow: hidden;

  .histogram_bottom {
    display: flex;
    justify-content: center;

    .bottom_div div {
      float: left;
    }

    .max_zhi {
      width: 16px;
      height: 10px;
      background: #4b9ffa;
      display: block;
      margin: 6px 10px 0 0;
    }

    .min_zhi {
      width: 16px;
      height: 10px;
      background: #4cc473;
      display: block;
      margin: 6px 10px 0 20px;
    }
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
