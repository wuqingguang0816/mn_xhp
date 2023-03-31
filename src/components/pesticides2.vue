<template>
    <div class="index">
        <div class="body1">
            <div class="body_top">
                <div class="title">筛选条件</div>
                <div class="fold_right" @click="open_fold">
                    <span>{{ open_folds ? "折叠" : "展开" }}</span>
                    <i :class="open_folds ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
                </div>
            </div>
            <div class="body_bottom" v-show="open_folds">
                <search ref="refsearch" @getList="getbotmEcarts" name="/" :UserId="UserId" :tableId="tableId"></search>
            </div>
        </div>
        <div class="body1">
            <div class="body_top">
                <div class="title">农药单例样本分析地图</div>
            </div>
            <div class="body_bottom chinaMap" v-loading="geoShow">
                <mapEcharts v-if="barData.quotaData.length > 0" height="100%" :city="city" @cityList="getcity"
                    :barData="barData" :clickshow="false"></mapEcharts>
                <div v-else style="text-align: center;line-height: 200px;font-size: 18px;">暂无数据</div>
            </div>
        </div>

    </div>
</template>
<script>
import * as echarts from "echarts";
import mapEcharts from "./mapEcharts.vue";
import search from "./search.vue";
import china from "@/assets/china.json"; //地图包
import QualityTwoChildren from "./QualityTwoChildren.vue";
import query from './queryTbale.vue'
import MSG from "@/linbs/mesAge";



export default {
    name: "pesticides2",
    components: { query, search, mapEcharts, QualityTwoChildren },
    data() {
        return {
            dialogVisible: false,
            CITY: "",
            open_folds: true,
            text: "< 100",
            formData: {
                data_sources: "",
                date_type: "1",
                times: [],
            },
            geoShow: true,
            listQuery: {
                "SType": "GetTableData",
                "UserId": "88800000",
                "ExcelID": "",
                "TreeID": "1000359",
                "PageIndex": 1,
                "PageSize": 10,
                "Filter": "{}"
            },
            listQuery2: {
                "SType": "GetTableData",
                "UserId": "88800000",
                "ExcelID": "",
                "TreeID": "1000361",
                "PageIndex": 1,
                "PageSize": 10,
                "Filter": "{}"
            },
            zhushow: false,
            histogram: { float: "left", width: "100%", height: "380px" }, //图表样式
            is_show: false,
            box_name: "",
            UserId: "",
            barData: { quotaData: [], showColor: { show: false, max: [] } },
            city: china,
            tableId: "1000362",
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
            this.$refs.refsearch.getData();
        },
        TabbleCommon(f) {
            // this.listQuery.Filter = this.listQuery.Filter = JSON.stringify(f)
            // this.listQuery2.Filter = this.listQuery.Filter = JSON.stringify(f)
            // this.$refs.queryTable.getList();
            // this.$refs.queryTable2.getList();
        },
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
            MSG.loading('加载中...');
            this.$nextTick(() => {
                setTimeout(() => {
                    that.$refs.QualityTwoChildren.getData();
                }, 1000)

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
        getbotmEcarts(f) {
            this.barData.quotaData = [];
            // this.zhushow = false
            this.geoShow=true
            const data = {
                SType: "GetTableData",
                UserId: this.UserId,
                ExcelID: "",
                TreeID: "1000362",
                PageIndex: "1",
                PageSize: "10000000",
                Filter: JSON.stringify(f),
            };
            // 农药饼图
            this.$getReq("/ashx/Common.ashx", "post", data).then((res) => {
                var data2 = res.Result.data;
                var nameList = [];
                var obj = [];
                if (data2.length > 0) {
                    data2.map((r) => {
                        if (obj.indexOf(r.CITY) < 0) {
                            obj.push(r.CITY);
                            nameList.push({
                                name: r.CITY,
                                center: [r.LONGITUDE, r.LATITUDE],
                                val: [],
                            });
                        }
                    });
                    nameList.map((r) => {
                        data2.map((res) => {
                            if (r.name == res.CITY) {
                                r.val.push({ name: res.STYPE, value: res.STYPESUM, city: r.name });
                            }
                        });
                    });
                    nameList.map((r) => {
                        this.barData.quotaData.push(
                            this.randomPieSeries(r.val, r.center, 20)
                        );
                    });
                } else {
                    this.barData.quotaData = [];
                }
            });
            // 省级颜色
            data.TreeID = '1000363';
            data.PageSize = "9999";
            this.$getReq("/ashx/Common.ashx", "post", data).then((res) => {
                let province = res.Result.data
                let p = province.sort(this.sortAll)
                let pList = p.map((r, index) => {
                    return {
                        name: r.PROVINCE,
                        itemStyle: {
                            areaColor: this.getItemColors(index + 1),
                            color: this.getItemColors(index + 1)
                        }
                    }
                })
                this.barData.showColor.max = pList
                this.barData.showColor.show = true
                this.geoShow = false
            })

        },
        sortAll(a, b) {
            return b.GS - a.GS
        },
        getItemColors(colorLevel) {
            var colors = '';
            //默认的最深颜色
            var red = 134, green = 108, blue = 184;
            //最浅颜色是239,239,239 比如：最浅颜色的red是 239 则差值为239-134=105
            var maxRed = 105, maxGreen = 131, maxBlue = 55;
            var level = colorLevel;
            while (level--) {
                colors = 'rgb(' + red + ',' + green + ',' + blue + ')';
                red += parseInt(maxRed / colorLevel);
                green += parseInt(maxGreen / colorLevel);
                blue += parseInt(maxBlue / colorLevel);
            }
            return colors;
        },
        randomPieSeries(data, center, radius) {
            return {
                type: "pie",
                coordinateSystem: "geo",
                tooltip: {
                    formatter: function (params) {
                        // console.log(params)
                        var str = "<div>";
                        str += `${params.data.city}<br/>${params.data.name}:${params.data.value}</div>`;
                        return str;
                    },
                },
                label: {
                    show: false,
                },

                labelLine: {
                    show: false,
                },
                animationDuration: 0,
                radius,
                center,
                data,
            };
        },
        //底部柱状图
        initEcharts(name, max, min, avg, P50List, P95list) {

            const histogram = echarts.init(document.getElementById("histogram"));

            histogram.clear();
            // 基本柱状图
            const option = {
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
                            color: "#999",
                        },
                    },
                },
                legend: {
                    data: ["最大值", "最小值", "均值", "P50", "P95"],
                },
                xAxis: [
                    {
                        type: "category",
                        data: name,
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                ],
                yAxis: {},
                series: [
                    {
                        name: "最大值",
                        type: "bar",
                        tooltip: {
                            valueFormatter: function (value) {
                                return value;
                            },
                        },
                        data: max,
                    },
                    {
                        name: "最小值",
                        type: "bar",
                        tooltip: {
                            valueFormatter: function (value) {
                                return value;
                            },
                        },
                        data: min,
                    },
                    {
                        name: "均值",
                        type: "line",

                        tooltip: {
                            valueFormatter: function (value) {
                                return value;
                            },
                        },
                        data: avg,
                    },
                    {
                        name: "P50",
                        type: "bar",

                        tooltip: {
                            valueFormatter: function (value) {
                                return value;
                            },
                        },
                        data: P50List,
                    },
                    {
                        name: "P95",
                        type: "bar",

                        tooltip: {
                            valueFormatter: function (value) {
                                return value;
                            },
                        },
                        data: P95list,
                    },
                ],
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
        },
    },
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
    position: relative;

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
    height: calc(100vh - 180px);
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

.tables {
    position: absolute;
    width: 100%;
    height: calc(100% - 58px)
}
</style>
