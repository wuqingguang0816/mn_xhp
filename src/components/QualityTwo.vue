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
      <div class="body_bottom" v-if="open_folds">
        <!-- <el-form ref="forms" :model="formData" label-width="130px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="数据来源" style="margin:0">
                <el-select v-model="formData.data_sources" placeholder="请选择" style="width: 100%">
                  <el-option v-for="item in sourcesData" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="日期类型" style="margin:0">
                <el-radio v-model="formData.date_type" label="1">生产日期</el-radio>
                <el-radio v-model="formData.date_type" label="2">检验日期</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="日期范围" style="margin:0">
                <el-date-picker v-model="formData.times" style="width: 100%" type="daterange" range-separator="至"
                  start-placeholder="开始日期" end-placeholder="结束日期" @change="timeChange" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="区域" style="margin:10px 0">
                <el-select v-model="formData.data_sources" placeholder="请选择" style="width: 100%">
                  <el-option v-for="item in sourcesData" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="检出/未检出" style="margin:10px 0">
                <el-select v-model="formData.data_sources" placeholder="请选择" style="width: 100%">
                  <el-option v-for="item in sourcesData" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="牧场" style="margin:10px 0">
                <el-select v-model="formData.data_sources" placeholder="请选择" style="width: 100%">
                  <el-option v-for="item in sourcesData" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="'引用监测\n数据数值'" class="item"
                style="margin:0;white-space: pre-line;line-height: 20px;">
                <el-select v-model="formData.data_sources" placeholder="请选择" style="width: 100%;line-height: 20px;">
                  <el-option v-for="item in sourcesData" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目名称" style="margin:0">
                <el-select v-model="formData.data_sources" placeholder="请选择" style="width: 100%">
                  <el-option v-for="item in sourcesData" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="btn">
                <el-button type="primary" class="btns">查询</el-button>
                <el-button class="btns">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form> -->
        <search ref="refsearch"  @getList="TabbleCommon"  name="/"
                    :UserId="UserId" :tableId="tableId"></search>
      </div>
    </div>
    <div class="body1">
      <div class="body_top">
        <div class="title">农药残留数据分析地图</div>
        <!-- <div class="fold_right" @click="open_fold">
            <span>{{open_folds?'折叠':'展开'}}</span>
            <i :class="open_folds?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
          </div> -->
      </div>
      <div class="body_bottom chinaMap">
        <div id="dataMapecharts" style="width: 100%;height: 660px;"></div>
        <div class="left_bottom">
          <div class="title2">检出含量等级</div>
          <div id="gradeEcharts" style="width: 200px;height: 100px;"></div>
        </div>
        <div class="right_bottom">
          <div class="title2">平均检出量</div>
          <div> > 200</div>
          <div> 100 ~ 200</div>
          <div>{{ text }} </div>
          <div class="wsj"><span></span><span>无数据</span></div>
        </div>
        <div v-show="is_show" class="box1_div" @click="to_children(box_text)">
          <div style="line-height:30px">{{ box_name }}</div>
          <div id="box1" style="width:200px;height:100px;"></div>
        </div>
      </div>
    </div>
    <div class="body1">
      <div class="body_top">
        <div class="title">农药残留数据分析</div>
      </div>
      <div class="body_bottom histogram_body_bottom">
        <!-- <el-col :span="24">
            <div class="histogram_bottom">
              <div class="bottom_div">
                <div class="max_zhi"></div>
                <div>求和项：XXX</div>
              </div>
              <div class="bottom_div">
                <div class="min_zhi"></div>
                <div>求和项：XXX</div>
              </div>
              <div class="bottom_div">
                <div class="san"></div>
                <div>求和项：XXX</div>
              </div>
            </div>
          </el-col> -->
        <el-col :span="24">
          <div class="histogram" id="histogram" :style="histogram"></div>
        </el-col>
        <el-col :span="24">
          <el-table :data="tableData2" :span-method="arraySpanMethod" style="width: 96%;margin: auto;"
            :header-cell-style="{ 'text-align': 'center', 'background': '#f8f8f8', 'height': '54px' }"
            :cell-style="TableCellStyle" row-key="id" border default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
            <el-table-column v-for="(item, index) in tableHead2" :label="item.name" :key="index"
              :prop="item.property" />
          </el-table>
          <el-pagination class="pagins" background layout="prev, pager, next" @current-change="handleCurrentChange"
            :current-page="PageIndex" :total="recordsTotal">
          </el-pagination>

        </el-col>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import china from "@/assets/china.json";  //地图包
import search from './search.vue'
export default {
  name: 'QualityTwo',
  components:{search},
  data() {
    return {
      UserId:'',
      tableId:'',
      tableData2: [],
      tableHead2: [],
      PageIndex: 1,
      recordsTotal: 0,
      spans: [],
      open_folds: false,
      text: '< 100',
      formData: {
        data_sources: '',
        date_type: '1',
        times: []
      },
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

      //柱狀圖
      xData: ["牧场1", "牧场2", "牧场3", "牧场4", "牧场5", "牧场7", "牧场7", "牧场8"], //横坐标
      yData: [{ max: 39, min: 23, san: 31 }, { max: 39, min: 31, san: 31 }, { max: 39, min: 31, san: 31 }, { max: 39, min: 31, san: 31 },
      { max: 39, min: 23, san: 31 }, { max: 39, min: 31, san: 31 }, { max: 39, min: 31, san: 31 }, { max: 39, min: 31, san: 31 }],
      histogram: { float: "left", width: "100%", height: "380px" }, //图表样式
      sfData: [
        { name: "北京", selected: false, text: "beijing", value: 0 },
        { name: "天津", selected: false, text: "tianjin", value: 0 },
        { name: "上海", selected: false, text: "shanghai", value: 0 },
        { name: "重庆", selected: false, text: "chongqing", value: 0 },
        { name: "河北", selected: false, text: "hebei", value: 12 },
        { name: "河南", selected: false, text: "henan", value: 12 },
        { name: "云南", selected: false, text: "yunnan", value: 0 },
        { name: "辽宁", selected: false, text: "liaoning", value: 0 },
        { name: "黑龙江", selected: false, text: "heilongjiang", value: 0 },
        { name: "湖南", selected: false, text: "hunan", value: 190 },
        { name: "安徽", selected: false, text: "anhui", value: 0 },
        { name: "山东", selected: false, text: "shandong", value: 0 },
        { name: "新疆", selected: false, text: "xinjiang", value: 0 },
        { name: "江苏", selected: false, text: "jiangsu", value: 0 },
        { name: "浙江", selected: false, text: "zhejiang", value: 0 },
        { name: "江西", selected: false, text: "jiangxi", value: 0 },
        { name: "湖北", selected: false, text: "hubei", value: 0 },
        { name: "广西", selected: false, text: "guangxi", value: 0 },
        { name: "甘肃", selected: false, text: "gansu", value: 0 },
        { name: "山西", selected: false, text: "shanxi1", value: 150 },
        { name: "内蒙古", selected: false, text: "neimenggu", value: 210 },
        { name: "陕西", selected: false, text: "shanxi3", value: 0 },
        { name: "吉林", selected: false, text: "jilin", value: 0 },
        { name: "福建", selected: false, text: "fujian", value: 0 },
        { name: "贵州", selected: false, text: "guizhou", value: 0 },
        { name: "广东", selected: false, text: "guangdong", value: 0 },
        { name: "青海", selected: false, text: "qinghai", value: 120 },
        { name: "西藏", selected: false, text: "xizang", value: 320 },
        { name: "四川", selected: false, text: "sichuan", value: 0 },
        { name: "宁夏", selected: false, text: "ningxia", value: 0 },
        { name: "海南", selected: false, text: "hainan", value: 0 },
        { name: "台湾", selected: false, text: "tianjin", value: 0 },
        { name: "香港", selected: false, text: "xianggang", value: 0 },
        { name: "澳门", selected: false, text: "aomen", value: 0 },
      ],
      is_show: false,
      box_name: '',
      box_text: '',
      tableData: [{
        id: 1,
        name: '区域：北方',
        mc: '',
        dln: '2.78',
        qfwjhhw: '2.78',
        lhsl: '2.78',
        children: [{
          id: 2,
          name: '生乳3',
          mc: '九牧',
          dln: '2.78',
          qfwjhhw: '2.78',
          lhsl: '2.78',
        }]
      }, {
        id: 3,
        name: '区域：东北',
        mc: '',
        dln: '3.08',
        qfwjhhw: '3.08',
        lhsl: '3.08',
        children: [{
          id: 4,
          name: '生乳3',
          mc: '一牧',
          dln: '1.54',
          qfwjhhw: '1.54',
          lhsl: '1.54',
        }, {
          id: 5,
          name: '生乳3',
          mc: '一牧',
          dln: '1.54',
          qfwjhhw: '1.54',
          lhsl: '1.54',
        }]
      }],
    }
  },
  mounted() {
    this.getEcharts();
    this.initEcharts()
    this.mYecharts();
    this.mYgradeEcharts();
    this.getBox1Data()
  },
  methods: {
    //指定行颜色
    TableCellStyle: function (row) {
      if (row.row.mc == '') {
        return 'background-color: #f8f8f8;text-align:center;heigh:54px';
      }
      return 'text-align:center;heigh:54px'
    },
    open_fold() {
      this.open_folds = !this.open_folds
    },
    //获取日期
    timeChange(e) {
      this.formData.times = e
    },
    to_children(e) {
      this.$router.push({
        path: '/QualityTwoChildren',
        query: {
          sfName: e
        }
      })
    },
    //中国地图
    mYecharts() {
      echarts.registerMap("china", china, {});
      //加载中国地图
      var customSettings = [];
      var that = this;
      this.sfData.forEach(function (item, index) {
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
            areaColor: iScolor,
          },
        });
      });
      var myChart = echarts.init(document.getElementById("dataMapecharts"));
      // 绘制图表
      let sfData = this.sfData
      var chinaMap = {
        zoom: 12,
        selectedMode: "single",
        geo: {
          // 设置地图的显示信息
          map: "china", // 注意  哪个区域的就显示哪个区域的名称
          regions: customSettings,
          label: {
            show: true,
            normal: {
              show: false,
              textStyle: {
                color: "#000",
                fontSize: 12,
              },
            },
            emphasis: {
              show: true,
            },
          },
          roam: false,
          itemStyle: {
            normal: {
              borderColor: "#ccc",
              areaColor: "#e0f3f8",
            },
            emphasis: {
              areaColor: "#9DD4F4",
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          top: 0,
        },
        series: [
          {
            type: "map",
            geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
            data: this.sfData
          },
        ],
      };

      myChart.on('click', function (data) {
        that.box_name = data.name
        that.box_text = data.data.text
        that.is_show = true
      });
      myChart.setOption(chinaMap);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    TabbleCommon(){},
    //弹窗方法
    getBox1Data() {
      const box1 = echarts.init(document.getElementById("box1"));
      let option
      option = {
        legend: {
          itemWidth: 15, //图例的宽度
          itemHeight: 15, //图例的高度
          itemGap: 25,
          orient: 'vertical',
          right: 'right',
          top: 'center',
          icon: "rect",
          selectedMode: false, //取消图例上的点击事件
          show: false
        },
        color: ['#4B9FFC', '#4CC473', '#FAB220'],//扇形区域以及列表颜色
        series: [{
          type: 'pie',
          radius: ['60%', '75%'],//两个表示环
          center: ['50%', '55%'],
          labelLine: {//设置延长线的长度
            normal: {
              length: 5,//设置延长线的长度
              // length2: 3,//设置第二段延长线的长度
            }
          },
          label: {
            normal: {
              formatter: '{b}',//这里最后另一行设置了一个空数据是为了能让延长线与hr线对接起来
              padding: [0, -10],//取消hr线跟延长线之间的间隙
              rich: {
                a: {
                  color: '#999',
                  lineHeight: 20,//设置最后一行空数据高度，为了能让延长线与hr线对接起来
                  align: 'center'
                },
                hr: {//设置hr是为了让中间线能够自适应长度
                  borderColor: 'auto',//hr的颜色为auto时候会主动显示颜色的
                  width: '105%',
                  borderWidth: 0.5,
                  height: 0.5,
                },
                per: {//用百分比数据来调整下数字位置，显的好看些。如果不设置，formatter最后一行的空数据就不需要
                  padding: [4, 0],
                }
              }
            },
            position: 'left',
          },
          data: [{
            value: 20,
            name: '>500'
          }, {
            value: 20,
            name: '200~500'
          }, {
            value: 20,
            name: '1~200'
          }],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };
      box1.setOption(option);
      // 自适应窗口大小
      window.addEventListener('resize', function () {
        box1.resize();
      });
    },
    //左下角环形图
    mYgradeEcharts() {
      const gradeEcharts = echarts.init(document.getElementById("gradeEcharts"));
      let option
      option = {
        legend: {
          itemWidth: 15, //图例的宽度
          itemHeight: 15, //图例的高度
          itemGap: 25,
          orient: 'vertical',
          right: 'right',
          top: 'center',
          icon: "rect",
          selectedMode: false, //取消图例上的点击事件
          data: ['4~18岁', '18<X≤80岁', '>80岁']
        },
        color: ['#4B9FFC', '#4CC473', '#FAB220'],//扇形区域以及列表颜色
        series: [{
          type: 'pie',
          radius: ['60%', '75%'],//两个表示环
          center: ['50%', '55%'],
          labelLine: {//设置延长线的长度
            normal: {
              length: 5,//设置延长线的长度
              // length2: 3,//设置第二段延长线的长度
            }
          },
          label: {
            normal: {
              // formatter: '{d}%, {c} \n\n',
              formatter: '{b}',//这里最后另一行设置了一个空数据是为了能让延长线与hr线对接起来
              padding: [0, -10],//取消hr线跟延长线之间的间隙
              rich: {
                a: {
                  color: '#999',
                  lineHeight: 20,//设置最后一行空数据高度，为了能让延长线与hr线对接起来
                  align: 'center'
                },
                hr: {//设置hr是为了让中间线能够自适应长度
                  borderColor: 'auto',//hr的颜色为auto时候会主动显示颜色的
                  width: '105%',
                  borderWidth: 0.5,
                  height: 0.5,
                },
                per: {//用百分比数据来调整下数字位置，显的好看些。如果不设置，formatter最后一行的空数据就不需要
                  padding: [4, 0],
                }
              }
            },
            position: 'left',
          },
          data: [{
            value: 20,
            name: '>500'
          },
          {
            value: 20,
            name: '200~500'
          },
          {
            value: 20,
            name: '1~200'
          }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };
      gradeEcharts.setOption(option); option
      window.addEventListener("resize", function () {
        gradeEcharts.resize();
      });
    },
    handleCurrentChange(val) {
      this.PageIndex = val
      this.getEcharts()
      console.log(`当前页: ${val}`, this.PageIndex);
    },
    getEcharts() {
      const data = {
        "SType": "GetTableData",
        "UserId": "88800000",
        "ExcelID": "",
        "TreeID": "1000234",
        "PageIndex": this.PageIndex,
        "PageSize": "10",
        "Filter": "{}",
      }
      this.$getReq('/ashx/Common.ashx',"post",data).then(r => {
        var title = r.Result.showtitle.split(',')
        if (r.Result.data.length > 0) {
          var t = r.Result.data[0]
          this.tableHead2 = []
          this.recordsTotal = r.Result.recordsTotal
          Object.keys(t).forEach((key, index) => {
            if (title[index]) {
              var n = { name: title[index], property: key }
              this.tableHead2.push(n)
            }
          })
          this.tableData2 = r.Result.data.filter(r => r.NYDJC)
          // 合并计算
          var index = 0
          this.spans = []
          for (var i = 0; i < this.tableData2.length; i++) {
            if (i === 0) {
              this.spans.push(1);
              index = 0;
            } else {
              // 判断当前区域与上一个区域是否相同
              if (this.tableData2[i].DQ === this.tableData2[i - 1].DQ) {
                this.spans[index] += 1;
                this.spans.push(0);
              } else {
                this.spans.push(1);
                index = i;
              }
            }
          }
          var name=[],max=[]
          // 柱状图数据
          this.tableData2.map(res=>{
            name.push(res.NYDJC)
            max.push(res.VALUE_S)
          })
          this.initEcharts(name,max)
        } else {
          this.tableData2 = []
        }

      })
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(row)
      if (columnIndex === 0) {
        const _row = this.spans[rowIndex];
        console.log(_row)
        return {
          // [0,0] 表示这一行不显示， [2,1]表示行的合并数
          rowspan: _row,
          colspan: 1
        };
      }
    },
    //底部柱状图
    initEcharts(name,max) {
      const histogram = echarts.init(document.getElementById("histogram"));
      histogram.clear()
      // 基本柱状图
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['检测结果']
        },
        xAxis: [
          {
            type: 'category',
            data:name,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: {},
        series: [
          {
            name: '检测结果',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value 
              }
            },
            data: max,
            barWidth : 14
          }
        ]
      };
      function formatterHover(params) {
        let dataIndex = params.dataIndex
        return `<div style='padding-left:10px;border-left:16px solid #4B9FFA;height:10px;line-height:10px;text-align:left'>求和项：${yData[dataIndex].max}</div>
            <div style='padding-left:10px;border-left:16px solid #4CC473;height:10px;line-height:10px;margin:10px 0;text-align:left'>求和项：${yData[dataIndex].min}</div>
            <div style='padding-left:10px;border-left:16px solid #FAB221;height:10px;line-height:10px;text-align:left'>求和项：${yData[dataIndex].san}</div>`
      }
      histogram.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        histogram.resize();
      });
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
    padding: 20px 46px 20px 0;
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
      border-left: 22px solid #0086D5;
    }

    div:nth-child(3) {
      border-left: 22px solid #4BB1EE;
    }

    div:nth-child(4) {
      border-left: 22px solid #C6E5F5;
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
    background-color: #FFF;
    border-radius: 4px;
    box-shadow: 0px 0px 2px 0px #4BB1EE,
  }
}

.index .body1 .histogram_body_bottom {
  padding: 0 0 60px 0;
  overflow: hidden;

  .histogram_bottom {
    display: flex;
    justify-content: end;
    margin: 30px 150px 0 0;

    .bottom_div div {
      float: left;
    }

    .max_zhi {
      width: 16px;
      height: 10px;
      background: #4B9FFA;
      display: block;
      margin: 6px 10px 0 0;
    }

    .min_zhi {
      width: 16px;
      height: 10px;
      background: #4CC473;
      display: block;
      margin: 6px 10px 0 20px;
    }

    .san {
      width: 16px;
      height: 10px;
      background: #FAB221;
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

.warm-row {
  background-color: #f8f8f8 !important;
}

.pagins {
  margin-top: 10px;
  text-align: center;
}
</style>
    