<template>
  <div class="QualityTwoChildren">
    <div class="body1">
      <div class="body_top">
        <div class="title">省市{{ name }}</div>
        <!-- <div class="goback">
          <el-button @click="goback" type="primary">返回</el-button>
        </div> -->
      </div>
      <div class="body_bottom chinaMap">
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
          v-if="city"
          height="100%"
          :city="city"
          chinas="China"
          @cityList="getcity"
          :clickshow="false"
          :barData="barData2"
        >
        </mapEcharts>
        <!-- <div id="dataMapecharts" style="width: 100%;height: 600px;"></div> -->
        <div class="left_bottom" v-if="1 < 0">
          <div class="title2">检出含量等级</div>
          <div id="gradeEcharts" style="width: 200px; height: 100px"></div>
        </div>
        <div class="right_bottom" v-if="1 < 0">
          <div class="title2">平均检出量</div>
          <div>> 2.5</div>
          <div>2.0 ~ 2.5</div>
          <div>{{ text }}</div>
          <div class="wsj"><span></span><span>无数据</span></div>
        </div>
        <div v-show="is_show" class="box1_div">
          <i
            class="el-icon-circle-close"
            @click="quxiaotk"
            style="position: absolute; right: 6px; top: 6px"
          ></i>
          <div style="line-height: 30px">{{ box_name }}</div>
          <div id="box1" style="width: 200px; height: 100px"></div>
        </div>
      </div>
    </div>
    <div class="body2">
      <div class="body_top">
        <div class="title">省市{{ name }}</div>
      </div>
      <div class="body_bottom">
        <query ref="queryTable" height="330" :listQuery="listQuery"></query>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import query from "./queryTbale.vue";
import mapEcharts from "./mapEcharts.vue";
import MSG from "@/linbs/mesAge";
export default {
  name: "QualityTwoChildren",
  components: {
    query,
    mapEcharts
  },
  props: {
    UserId: {
      type: String,
      default: ""
    },
    CITY: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // PageIndex:1,
      // recordsTotal:0,
      // tableHead:[],
      text: "< 2.0",
      // tableData:[],
      listQuery: {
        SType: "GetTableData",
        UserId: "88800000",
        ExcelID: "",
        TreeID: "1000266",
        PageIndex: 1,
        PageSize: 10,
        Filter: "{}"
      },
      //省份数据
      sfData: [],
      is_show: false,
      box_name: "",
      json_data: [],
      barData2: { quotaData: [] },
      city: "",
      Statistics: []
    };
  },
  created() {
    // let that = this;
    // this.UserId = this.$route.query.userId;
    // let r = this.$route.query.sfName
    // console.log(this.$route.query)
    // this.name = this.$route.query.name
    // var getData = require("../../static/json/" + r + ".json"); // 直接引入省级地图json文件
    // let str ="/apo"; //正式库是需要去掉
  },
  mounted() {
    //表格数据
    // this.mYgradeEcharts();
    // this.getBox1Data()
  },
  methods: {
    getData() {
      this.city = "";
      MSG.closeLoading();
      this.$getReq(`/json/${this.CITY}.json`, "get", {}).then(Data => {
        //本地使用这个
        this.city = Data;
        this.getsj();
        this.getEcharts();
      });
    },
    goback() {
      this.$router.go(-1);
    },
    // 数据
    getsj() {
      this.barData2.quotaData = [];
      const data = {
        SType: "GetTableData",
        UserId: this.UserId,
        ExcelID: "",
        TreeID: "1000264",
        PageIndex: "1",
        PageSize: "1000000000",
        Filter: this.$store.state.Filter
      };
      this.$getReq("/ashx/Common.ashx", "post", data).then(res => {
        var data2 = res.Result.data;
        var nameList = [];
        var obj = [];
        if (data2.length > 0) {
          let s = [];
          // let group = this.getGroup(data2, "QJMS");
          // for (let key in group) {
          //   s.push({
          //     title: key,
          //     num: group[key].length
          //   });
          // }
          s.push({
            title: "总数量",
            num: data2.length
          });
          if (s.length > 0) {
            this.Statistics = s;
          }
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
            this.barData2.quotaData.push(
              this.randomPieSeries(r.val, r.center, 20)
            );
          });
        } else {
          this.barData2.quotaData = [];
        }
      });
    },
    randomPieSeries(data, center, radius) {
      return {
        type: "pie",
        coordinateSystem: "geo",
        tooltip: {
          formatter: function(params) {
            console.log(params);
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
    quxiaotk() {
      this.is_show = false;
    },
    //省份
    mYecharts() {
      echarts.registerMap("hunan", this.json_data, {});

      //加载中国地图
      var customSettings = [];
      var that = this;
      this.sfData.forEach(function(item, index) {
        let iScolor;
        if (item.value > 0 && item.value < 101) {
          iScolor = "#C6E5F5";
        } else if (item.value > 100 && item.value < 201) {
          iScolor = "#4BB1EE";
        } else if (item.value > 200) {
          iScolor = "#0086D5";
        } else {
          iScolor = "#fff";
        }
        customSettings.push({
          name: item.name,
          itemStyle: {
            areaColor: iScolor
          }
        });
      });
      var myChart = echarts.init(document.getElementById("dataMapecharts"));
      // 绘制图表
      let sfData = this.sfData;
      var chinaMap = {
        zoom: 8,
        selectedMode: "single",
        geo: {
          // 设置地图的显示信息
          map: "hunan", // 注意  哪个区域的就显示哪个区域的名称
          regions: customSettings,
          label: {
            show: true,
            normal: {
              show: false,
              textStyle: {
                color: "#000",
                fontSize: 12
              }
            },
            emphasis: {
              show: true
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              borderColor: "#ccc",
              areaColor: "#e0f3f8"
            },
            emphasis: {
              areaColor: "#9DD4F4",
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          },
          top: "2%"
        },
        series: [
          {
            type: "map",
            geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
            data: this.sfData
          }
        ]
      };

      myChart.on("click", function(data) {
        let box_name = data.name;
        that.box_name = box_name;
        that.is_show = true;
      });
      myChart.setOption(chinaMap);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    getcity() {},
    //弹窗方法
    getBox1Data() {
      const box1 = echarts.init(document.getElementById("box1"));
      let option;
      option = {
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
                name: "未检出"
              },
              {
                value: 20,
                name: "检出1种农药"
              },
              {
                value: 20,
                name: "检出2-5种农药"
              },
              {
                value: 20,
                name: "检出6-10种农药"
              },
              {
                value: 20,
                name: "检出大于10种农药"
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
    handleCurrentChange(val) {
      this.PageIndex = val;
      this.getEcharts();
      console.log(`当前页: ${val}`, this.PageIndex);
    },
    getEcharts() {
      this.listQuery.UserId = this.UserId;
      this.listQuery.Filter = this.$store.state.Filter;
      this.$refs.queryTable.list = [];
      this.$refs.queryTable.getList();
      MSG.closeLoading();

      // const data = {
      //   "SType": "GetTableData",
      //   "UserId": "88800000",
      //   "ExcelID": "",
      //   "TreeID": "1000248",
      //   "PageIndex": this.PageIndex,
      //   "PageSize": "10",
      //   "Filter": "{}",
      // }
      // this.$axios.post('/api/LIMS/ashx/Common.ashx', data).then(r => {
      //   var title = r.Result.showtitle.split(',')
      //   if (r.Result.data.length > 0) {
      //     var t = r.Result.data[0]
      //     this.tableHead = []
      //     this.recordsTotal = r.Result.recordsTotal
      //     Object.keys(t).forEach((key, index) => {
      //       if (title[index]) {
      //         var n = { name: title[index], property: key }
      //         this.tableHead.push(n)
      //       }
      //     })
      //     this.tableData = r.Result.data
      //   } else {
      //     this.tableData= []
      //   }

      // })
    }
  }
};
</script>

<style scoped lang="scss">
.QualityTwoChildren {
  background-color: #edf0f2;
  position: absolute;
  width: 100%;
  height: 94%;
  top: 50px;
  left: 0;
  overflow-y: auto;
}

.QualityTwoChildren .body1 {
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
    // padding: 20px 46px 20px 0;
  }
}

.QualityTwoChildren {
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

    .wsj {
      display: flex;
      padding: 0;

      span:nth-child(1) {
        width: 20px;
        height: 8px;
        border: 1px solid #666;
        display: block;
      }

      span:nth-child(2) {
        padding-left: 10px;
      }
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

.btn {
  float: right;
  margin: 0;

  .btns {
    width: 88px;
  }
}

.goback {
  line-height: 58px;
  margin-right: 20px;
}
</style>
