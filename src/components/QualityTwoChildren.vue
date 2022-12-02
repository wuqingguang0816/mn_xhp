<template>
  <div class="QualityTwoChildren">
    <div class="body1">
      <div class="body_top">
        <div class="title">省市农药残留数据分析</div>
      </div>
      <div class="body_bottom chinaMap">
        <div id="dataMapecharts" style="width: 100%;height: 600px;"></div>
        <div class="left_bottom">
          <div class="title2">检出含量等级</div>
          <div id="gradeEcharts" style="width: 200px;height: 100px;"></div>
        </div>
        <div class="right_bottom">
          <div class="title2">平均检出量</div>
          <div> > 200</div>
          <div> 100 ~ 200</div>
          <div>{{text}} </div>
          <div class="wsj"><span></span><span>无数据</span></div>
        </div>
        <div v-show="is_show" class="box1_div">
          <i class="el-icon-circle-close" @click="quxiaotk" style="position:absolute;right:6px;top:6px"></i>
          <div style="line-height:30px">{{box_name}}</div>
          <div id="box1" style="width:200px;height:100px;"></div>
        </div>
      </div>
    </div>
    <div class="body2">
      <div class="body_top">
        <div class="title">省市农药残留详情数据</div>
      </div>
      <div class="body_bottom">
        <el-table
          :data="tableData"
          :header-cell-style="{'text-align':'center','background':'#f8f8f8','height':'54px'}"
          :cell-style="{'text-align':'center','height':'54px'}"
          height="330"
          style="width: 100%">
          <el-table-column
            prop="ypdl"
            label="样品大类">
          </el-table-column>
          <el-table-column
            prop="ypfl"
            label="样品分类">
          </el-table-column>
          <el-table-column
            prop="ypID"
            label="样品ID">
          </el-table-column>
          <el-table-column
            prop="ypName"
            label="样品名称">
          </el-table-column>
          <el-table-column
            prop="mc"
            label="牧场">
          </el-table-column>
          <el-table-column
            prop="qy"
            label="区域">
          </el-table-column>
          <el-table-column
            prop="lll"
            label="六六六">
          </el-table-column>
          <el-table-column
            prop="DDT"
            label="DDT">
          </el-table-column>
          <el-table-column
            prop="ld"
            label="林丹">
          </el-table-column>
          <el-table-column
            prop="jcx"
            label="检出限">
          </el-table-column>
          <el-table-column
            prop="zs"
            label="注释">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: 'QualityTwoChildren',
  data () {
    return {
      text:'< 100',
      tableData:[
        {ypdl:'乳及乳制品',ypfl:'生乳',ypID:'301',ypName:'生乳1',mc:'一牧',
          qy:'西部',lll:'0.34',DDT:'0.34',ld:'0.34',jcx:'1',zs:'2个农药有检出'},
        {ypdl:'乳及乳制品',ypfl:'生乳',ypID:'302',ypName:'生乳2',mc:'一牧',
          qy:'西部',lll:'0.34',DDT:'0.34',ld:'0.34',jcx:'1',zs:'2个农药有检出'},
        {ypdl:'乳及乳制品',ypfl:'生乳',ypID:'303',ypName:'生乳3',mc:'一牧',
          qy:'西部',lll:'0.34',DDT:'0.34',ld:'0.34',jcx:'1',zs:'2个农药有检出'},
        {ypdl:'乳及乳制品',ypfl:'生乳',ypID:'304',ypName:'生乳4',mc:'一牧',
          qy:'西部',lll:'0.34',DDT:'0.34',ld:'0.34',jcx:'1',zs:'2个农药有检出'},
        {ypdl:'乳及乳制品',ypfl:'生乳',ypID:'305',ypName:'生乳5',mc:'一牧',
          qy:'西部',lll:'0.34',DDT:'0.34',ld:'0.34',jcx:'1',zs:'2个农药有检出'},
        {ypdl:'乳及乳制品',ypfl:'生乳',ypID:'306',ypName:'生乳6',mc:'一牧',
          qy:'西部',lll:'0.34',DDT:'0.34',ld:'0.34',jcx:'1',zs:'2个农药有检出'},
      ],

      //省份数据
      sfData: [],
      is_show:false,
      box_name:'',
      json_data:[],
    }
  },
  created(){
    let that = this;
    let json_name = this.$route.query.sfName
    console.log(this.$route.query)
    console.log(json_name)
    var getData = require("../assets/"+ json_name + ".json"); // 直接引入省级地图json文件
    this.json_data = getData
    let data = getData.features
    let arr = [];
    for(let i = 0; i<data.length;i++){
      let obj = {
        name:data[i].properties.name,
        value:Math.floor(Math.random()*100),
      }
      arr.push(obj)
    }
    this.sfData = arr
  },
  mounted() {
    this.mYecharts();
    this.mYgradeEcharts();
    this.getBox1Data()
  },
  methods: {
    quxiaotk(){this.is_show=false},
    //省份
    mYecharts() {
      echarts.registerMap("hunan", this.json_data, {});
      //加载中国地图
      var customSettings = [];
      var that = this;
      this.sfData.forEach(function (item, index) {
        let iScolor;
        if (item.value > 0&&item.value<101) {
          iScolor = "#C6E5F5";
        } else if(item.value>100&&item.value<201){
          iScolor = "#4BB1EE";
        }else if(item.value>200){
          iScolor = "#0086D5";
        }else{
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
          top:"2%",
        },
        series: [
          {
            type: "map",
            geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
            data:this.sfData
          },
        ],
      };

      myChart.on('click', function (data) {
          let box_name = data.name
          that.box_name = box_name
          that.is_show = true
      });
      myChart.setOption(chinaMap);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
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
            top:'center',
            icon: "rect",
            selectedMode: false, //取消图例上的点击事件
            show:false
        },
        color: ['#4B9FFC','#4CC473','#FAB220'],//扇形区域以及列表颜色
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
            },{
                value: 20,
                name: '200~500'
            },{
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
    mYgradeEcharts(){
      const gradeEcharts = echarts.init(document.getElementById("gradeEcharts"));
      let option
        option = {
        legend: {
            itemWidth: 15, //图例的宽度
            itemHeight: 15, //图例的高度
            itemGap: 25,
            orient: 'vertical',
            right: 'right',
            top:'center',
            icon: "rect",
            selectedMode: false, //取消图例上的点击事件
            data: ['4~18岁', '18<X≤80岁', '>80岁']
        },
      color: ['#4B9FFC','#4CC473','#FAB220'],//扇形区域以及列表颜色
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
      gradeEcharts.setOption(option);option
      window.addEventListener("resize", function () {
        gradeEcharts.resize();
      });
    },
    //底部柱状图
    initEcharts() {
      const histogram = echarts.init(document.getElementById("histogram"));
      let yData = this.yData
      let yData1=[]
      let yData2=[]
      let yData3=[]
      for(let i = 0;i<yData.length;i++){
        yData1.push(yData[i].max)
        yData2.push(yData[i].min)
        yData3.push(yData[i].san)
      }
      histogram.clear()
      // 基本柱状图
      const option = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          enterable:true,//鼠标是否可进入提示框浮层中
          formatter:formatterHover,//修改鼠标悬停显示的内容
        },
        xAxis: {
          data: this.xData
        },
        yAxis: {},
        series: [
          {
            type: "bar", //形状为柱状图
            data: yData1,
            itemStyle: {color: '#4B9FFA'},
            barWidth : 14, //柱图宽度
          },{
            type: "bar", //形状为柱状图
            data: yData2,
            itemStyle: {color: '#4CC473'},
            barWidth : 14, //柱图宽度
          },{
            type: "bar", //形状为柱状图
            data: yData3,
            itemStyle: {color: '#FAB221'},
            barWidth : 14, //柱图宽度
          }
        ]
      };
      function formatterHover(params){
        if(params.componentIndex==0){
          return `<div style='padding-left:10px;border-left:16px solid #4B9FFA;height:10px;line-height:10px'>最大值：${params.data}</div>`
        }else{
          return `<div style='padding-left:10px;border-left:16px solid #4CC473;height:10px;line-height:10px'>最小值：${params.data}</div>`
        }
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
.QualityTwoChildren{background-color: #edf0f2;position: absolute;width: 100%;height: 100%;top: 0;left: 0;overflow-y: auto;}
.QualityTwoChildren .body1{margin: 20px 20px 14px 20px;background: #fff;border-radius: 4px;
  .body_top{height: 58px;display: flex;justify-content: space-between;
    .fold_right{font-size: 14px;height: 14px;margin-top: 23px;line-height: 14px;color: #abbccb;margin-right: 20px;}
  }
  .body_bottom{border-top: 1px solid #eff4f5;padding:20px 46px 20px 0;
  }
}
.QualityTwoChildren{
  .title{font-size: 14px;font-weight: bold;margin-left: 20px;padding-left: 10px;border-left: 4px solid #0083d6;height: 14px;
    margin-top: 23px;line-height: 14px;}
  .title span:last-child{font-weight: 500;}
}
.chinaMap{height: 550px;position: relative;
  .left_bottom{position: absolute;bottom: 30px;left: 30px;text-align: left;
    .title2{padding-left: 16px;font-size: 16px;}
  }
  .right_bottom{position: absolute;bottom: 30px;right: 60px;text-align: left;
    div{margin-top: 8px;font-size: 12px;height: 10px;line-height: 10px;padding-left: 10px;}
    .title2{margin-bottom: 16px;font-size: 16px;padding: 0;}
    div:nth-child(2){border-left: 22px solid #0086D5;}
    div:nth-child(3){border-left: 22px solid #4BB1EE;}
    div:nth-child(4){border-left: 22px solid #C6E5F5;}
    .wsj{display: flex;padding:0;
      span:nth-child(1){width: 20px;height: 8px;border: 1px solid #666;display: block;}
      span:nth-child(2){padding-left: 10px;}
    }
  }
  .box1_div{position:absolute;top:20px;width:200px;height:140px;left:50%;margin-left:-100px;background-color: #FFF;
    border-radius: 4px; box-shadow: 0px 0px 2px 0px #4BB1EE,
  }
}

.body2{
  margin: 0 20px 14px 20px;background: #fff;border-radius: 4px;
    .body_top{height: 58px;display: flex;justify-content: space-between;}
    .body_bottom{text-align: center;}
}
.btn{float:right;margin:0;
  .btns{width: 88px;}
}
</style>
  