<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils/get-page-title";

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "300px"
    },
    barData: {
      type: Object,
      required: true
    },
    city: {
      type: Object,
      required: true
    },
    clickshow: {
      type: Boolean,
      default: true
    },
    chinas: {
      type: String,
      default: "china"
    },
    groupArr: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      chart: null,
      Tname: "",
      quotaData: null
    };
  },
  watch: {
    barData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  mounted() {
    this.initChart();
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    window.addEventListener("resize", this.__resizeHandler);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener("resize", this.__resizeHandler);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      let that = this;
      this.chart = echarts.init(this.$el, "macarons");
      echarts.registerMap(that.chinas, that.city, {
        Alaska: {
          left: -131,
          top: 25,
          width: 15
        },
        Hawaii: {
          left: -110,
          top: 28,
          width: 5
        },
        "Puerto Rico": {
          left: -76,
          top: 26,
          width: 2
        }
      });

      this.setOptions(this.barData);
      if (that.clickshow) {
        this.chart.on("click", function(data) {
          if (data.componentSubType && data.componentSubType == "pie") {
            // console.log(data.data.city)
            that.$emit("cityList", data.data.city);
          }
        });
        this.chart.on("mouseout", function(data) {
          that.chegenBgc("");
        });
        this.chart.on("mouseover", function(data) {
          if (data.componentSubType && data.componentSubType == "pie") {
            if (that.$parent.dataArr.length > 0) {
              let dataArr = that.$parent.dataArr;
              let sj = dataArr.find(itm => itm.CITY === data.data.city);
              that.chegenBgc(sj.PROVINCE, data.event.target.z);
            }
          }
        });
      }
    },
    chegenBgc(name, z) {
      let that = this;
      let getOption = this.chart.getOption();
      if (name) {
        this.setOption.geo["regions"] = [
          {
            name: name,
            selected: true
          }
        ];
        this.setOption.geo["zoom"] = getOption.geo[0].zoom;
        this.setOption.geo["center"] = getOption.geo[0].center;
      } else {
        this.setOption.geo["regions"] = [];
        this.setOption.geo["zoom"] = getOption.geo[0].zoom;
        this.setOption.geo["center"] = getOption.geo[0].center;
      }
      this.loadMap();
    },
    loadMap() {
      this.chart.setOption(this.setOption, true);
    },
    setOptions({ quotaData, showColor } = {}) {
      var that = this;
      this.quotaData = null;
      this.quotaData = quotaData;
      if (showColor && showColor.show) {
        this.setOption = {
          backgroundColor: "#ffffff",
          geo: {
            type: "map",
            map: that.chinas,
            label: {
              show: true
            },
            aspectScale: 1.3,
            roam: true,
            select: {
              itemStyle: {
                //相关配置项很多，可以参考echarts官网
                areaColor: "#57aee4" //选中
              }
            },
            emphasis: {
              itemStyle: {
                //相关配置项很多，可以参考echarts官网
                areaColor: "#57aee4" //选中
              }
            }
          },
          tooltip: {},
          legend: {
            orient: "middle",
            top: "30%",
            right: 40
          },
          series: quotaData
        };
        this.loadMap();
      } else {
        this.setOption = {
          backgroundColor: "#ffffff",
          geo: {
            map: that.chinas,
            roam: true,
            itemStyle: {
              areaColor: "#e7e8ea"
            },
            aspectScale: 1.3,
            label: {
              show: true
            },

            select: {
              itemStyle: {
                //相关配置项很多，可以参考echarts官网
                areaColor: "#57aee4" //选中
              }
            },
            emphasis: {
              itemStyle: {
                //相关配置项很多，可以参考echarts官网
                areaColor: "#57aee4" //选中
              }
            }
          },
          tooltip: {},
          legend: {
            orient: "middle",
            top: "30%",
            right: 40,
            formatter: function(name) {
              if (that.groupArr[name]) {
                return name + "：" + that.groupArr[name].length;
              } else {
                return name;
              }
            }
          },
          series: quotaData
        };
        this.loadMap();
      }
    }
  }
};
</script>
<style>
.chart {
  width: 100%;
  height: 660px;
}
</style>
