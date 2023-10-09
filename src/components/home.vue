<template>
    <div class="home">
        <p class="titles">
            <img src="../assets/img/yldslogo.png" />
            食品安全热点大数据预警平台
        </p>
        <div class="home_title">
            <div class="home_div"
                :style="[{ 'background-color': item.color }, { cursor: (index == 3 || index == 4 ? 'pointer' : '') }]"
                v-for="(item, index) in homeList" :key="index" @click="openData2(index)">
                <div class="imgs" :style="{ 'background-color': item.imgcolor }">
                    <img :src="item.bgimg" />
                </div>
                <div class="home_div2">
                    <p>{{ item.val }}</p>
                    <p>{{ item.name }}</p>
                </div>
            </div>
        </div>

        <div class="main">
            <div class="main_1">
                <div class="main_div">
                    <p class="p1">国内食品质量安全通报
                        <el-button @click="openData('国内食品质量安全通报', data2, 3)" style="position: absolute;right: 15px;"
                            type="text">更多></el-button>
                    </p>
                    <pieCharts :barData="barData2" height="calc(100% - 40px)" />
                </div>
                <div class="main_div">
                    <p class="p1">国外食品质量安全通报
                        <el-button @click="openData('国外食品质量安全通报', data, 3)" style="position: absolute;right: 15px;"
                            type="text">更多></el-button>
                    </p>
                    <pieCharts :barData="barData" height="calc(100% - 40px)" />
                </div>
                <div class="main_div">
                    <p class="p1">食品安全增长分析
                        <el-button @click="openData('食品安全增长分析', listQuery)" style="position: absolute;right: 15px;"
                            type="text">更多></el-button>
                    </p>
                    <query class="tables" ref="queryTable" height="100%" :totalshow="false" :listQuery="listQuery">
                    </query>
                </div>
            </div>

            <div class="main_1">
                <div class="main_div">
                    <p class="p1">重点关注信息
                        <el-button @click="openData('重点关注信息', listQuery1)" style="position: absolute;right: 15px;"
                            type="text">更多></el-button>
                    </p>
                    <query class="tables" ref="queryTable1" height="100%" :totalshow="false" :listQuery="listQuery1">
                    </query>
                </div>
                <div class="main_div">
                    <p class="p1">重点跟进信息
                        <el-button @click="openData('重点跟进信息', listQuery2)" style="position: absolute;right: 15px;"
                            type="text">更多></el-button>
                    </p>
                    <query class="tables" ref="queryTable2" height="100%" :totalshow="false" :listQuery="listQuery2">
                    </query>
                </div>
                <div class="main_div">
                    <p class="p1">热点信息风险指标分析
                        <el-button @click="openData('热点信息风险指标分析', listQuery4, 1)" style="position: absolute;right: 15px;"
                            type="text">更多></el-button>
                    </p>
                    <query class="tables" @queryData="getlist" ref="queryTable3" :tableColumn="false" :totalshow="false"
                        height="100%" :listQuery="listQuery4">
                        <el-table-column v-if="tableHead.length > 0" slot="tableColumn" show-overflow-tooltip
                            v-for="(item, index) in tableHead" :label="item.name" align="center" :key="index"
                            :prop="item.property">
                            <template slot-scope="scope">
                                <div class="dvs" v-if="index == 0" v-html="scope.row[item.property]"></div>
                                <span v-else>{{ scope.row[item.property] }}</span>
                            </template>
                        </el-table-column>

                    </query>
                </div>
            </div>
            <div class="main_1">
                <div class="main_div">
                    <p class="p1">热点信息产品品类分析
                        <el-button @click="openData('热点信息产品品类分析', listQuery3, 1)" style="position: absolute;right: 15px;"
                            type="text">更多></el-button>
                    </p>
                    <query class="tables" @queryData="getlist2" ref="queryTable4" :tableColumn="false" :totalshow="false"
                        height="100%" :listQuery="listQuery3">
                        <el-table-column v-if="tableHead2.length > 0" slot="tableColumn" show-overflow-tooltip
                            v-for="(item, index) in tableHead2" :label="item.name" align="center" :key="index"
                            :prop="item.property">
                            <template slot-scope="scope">
                                <div class="dvs" v-if="index == 0" v-html="scope.row[item.property]"></div>
                                <span v-else>{{ scope.row[item.property] }}</span>
                            </template>
                        </el-table-column>

                    </query>
                </div>
                <div class="main_div" style="flex: 2;    ">
                    <p class="p1">事业部跟进情况</p>
                    <lineEcharts :barData="barData3" height="calc(100% - 40px)" />
                </div>
            </div>

        </div>
        <el-dialog :title="title" :visible.sync="dialogVisible" width="80%" append-to-body>
            <query v-if="num == 1" style="height: 40rem" class="tables" @queryData="getlist3" ref="gongList"
                :tableColumn="false" :totalshow="false" height="100%" :listQuery="GlistQuery">
                <el-table-column v-if="tableHead3.length > 0" slot="tableColumn" show-overflow-tooltip
                    v-for="(item, index) in tableHead3" :label="item.name" align="center" :key="index"
                    :prop="item.property">
                    <template slot-scope="scope">
                        <div class="dvs" v-if="index == 0" v-html="scope.row[item.property]"></div>
                        <span v-else>{{ scope.row[item.property] }}</span>
                    </template>
                </el-table-column>
            </query>
            <query v-else-if="num == undefined" style="height: 40rem" class="tables" ref="gongList" height="100%"
                :totalshow="false" :listQuery="GlistQuery">
            </query>
            <pieCharts v-if="num == 3 && barData4.quotaData.length > 0" :barData="barData4" height="40rem" />
        </el-dialog>
        <!--  -->
    </div>
</template>
  
<script>
import query from './queryTbale.vue'
import pieCharts from './pieEcharts.vue'
import lineEcharts from './lineEcharts.vue'
export default {
    components: {
        query,
        pieCharts,
        lineEcharts
    },
    name: 'Home',
    data() {
        return {
            GlistQuery: '',
            title: '',
            dialogVisible: false,
            tableId: '1000194',
            data: {
                "SType": "GetTableData",
                "UserId": '',
                "ExcelID": "",
                "TreeID": "1000284",
                "PageIndex": 1,
                "PageSize": 15,
                "Filter": "{}"
            },
            data2: {
                "SType": "GetTableData",
                "UserId": '',
                "ExcelID": "",
                "TreeID": "1000285",
                "PageIndex": 1,
                "PageSize": 15,
                "Filter": "{}"
            },
            listQuery: {
                "SType": "GetTableData",
                "UserId": "88800000",
                "ExcelID": "",
                "TreeID": "1000283",
                "PageIndex": 1,
                "PageSize": 10,
                "Filter": "{}"
            },
            listQuery1: {
                "SType": "GetTableData",
                "UserId": "88800000",
                "ExcelID": "",
                "TreeID": "1000282",
                "PageIndex": 1,
                "PageSize": 10,
                "Filter": "{}"
            },
            listQuery2: {
                "SType": "GetTableData",
                "UserId": "88800000",
                "ExcelID": "",
                "TreeID": "1000280",
                "PageIndex": 1,
                "PageSize": 10,
                "Filter": "{}"
            },
            listQuery3: {
                "SType": "GetTableData",
                "UserId": "88800000",
                "ExcelID": "",
                "TreeID": "1000278",
                "PageIndex": 1,
                "PageSize": 10,
                "Filter": "{}"
            },
            listQuery4: {
                "SType": "GetTableData",
                "UserId": "88800000",
                "ExcelID": "",
                "TreeID": "1000281",
                "PageIndex": 1,
                "PageSize": 10,
                "Filter": "{}"
            },
            listQuery5: {
                "SType": "GetTableData",
                "UserId": "88800000",
                "ExcelID": "",
                "TreeID": "1000286",
                "PageIndex": 1,
                "PageSize": 100000000,
                "Filter": "{}"
            },
            listQuery6: {
                "SType": "GetTableData",
                "UserId": "88800000",
                "ExcelID": "",
                "TreeID": "1000292",
                "PageIndex": 1,
                "PageSize": 1000000000,
                "Filter": "{}"
            },
            listQuery7: {
                "SType": "GetTableData",
                "UserId": "88800000",
                "ExcelID": "",
                "TreeID": "1000293",
                "PageIndex": 1,
                "PageSize": 1000000000,
                "Filter": "{}"
            },

            homeList: [
                { name: '年预警事件数', val: 0, imgcolor: '#DCE0F9', color: '#516AE8', bgimg: require('@/assets/img/icon1.png') },
                { name: '食品安全国内通报数量', val: 0, imgcolor: '#FFE7CF', color: '#FF870F', bgimg: require('@/assets/img/icon2.png') },
                { name: '食品安全国外通报数量', val: 0, imgcolor: '#CBE7FE', color: '#0088FE', bgimg: require('@/assets/img/icon3.png') },
                { name: '今日浏览次数', val: 0, imgcolor: '#D7F3E5', color: '#30C283', bgimg: require('@/assets/img/icon4.png') },
                { name: '总浏览次数', val: 0, imgcolor: '#DFE4FF', color: '#607DFF', bgimg: require('@/assets/img/icon5.png') }
            ],
            barData2: { quotaData: [], radius: [20, 100] },
            barData: { quotaData: [], radius: [20, 100] },
            barData4: { quotaData: [], radius: [50, 250] },
            barData3: { quotaData: [], nameData: [], legendData: [] },
            tableHead: [],
            tableHead2: [],
            tableHead3: [],
            num: '',
        }
    },
    created() {
        this.UserId = this.$route.query.userId;
        if (this.UserId) {
            this.getliulan()
        }

    },
    mounted() {
        // this.TabbleCommon()
        this.listQuery6.UserId = this.listQuery7.UserId = this.data.UserId = this.data2.UserId = this.listQuery5.UserId = this.listQuery4.UserId = this.listQuery3.UserId = this.listQuery1.UserId = this.listQuery2.UserId = this.listQuery.UserId = this.UserId
        this.$refs.queryTable.getList()
        this.$refs.queryTable1.getList()
        this.$refs.queryTable2.getList()
        this.$refs.queryTable3.getList()
        this.$refs.queryTable4.getList()
        // this.$refs.queryTable5.getList()
        this.getechatrs()

    },
    methods: {
        openData2(i) {
            if (i == 3) {
                this.openData('今日浏览详情', this.listQuery6)
            } else if (i == 4) {
                this.openData('总浏览详情', this.listQuery7)
            }
        },
        openData(title, query, i) {
            // console.log(query)
            this.num = i
            this.title = title
            query.PageSize = 99999999
            this.GlistQuery = query
            this.dialogVisible = true
            if (i == 3) {
                this.$nextTick(() => {
                    this.$getReq('/ashx/Common.ashx', "post", query).then(res => {
                        var data = this.getshuju(res.Result.data)
                        this.barData4.quotaData = data
                    })
                })
            } else {

                this.$nextTick(() => {
                    this.$refs.gongList.getList()
                })
            }

        },
        // 浏览次数
        getliulan() {
            var data = {
                Method: 'Visit',
                UserId: this.UserId
            }
            console.log(this.UserId)
            this.$getReq('/Views/Screen/SafetyHotspotsAPI.ashx', "post", data).then(res => { })
        },
        getlist(list) {
            var data = list.list
            this.tableHead = []
            var title = data.showtitle.split(',')
            var t = data.data[0]
            Object.keys(t).forEach((key, index) => {
                if (title[index]) {
                    var n = { name: title[index], property: key }
                    this.tableHead.push(n)
                }
            })

        },
        getlist2(list2) {
            var data = list2.list
            this.tableHead2 = []
            var title = data.showtitle.split(',')
            var t = data.data[0]
            Object.keys(t).forEach((key, index) => {
                if (title[index]) {
                    var n = { name: title[index], property: key }
                    this.tableHead2.push(n)
                }
            })

        },
        getlist3(list2) {
            var data = list2.list
            this.tableHead3 = []
            var title = data.showtitle.split(',')
            var t = data.data[0]
            Object.keys(t).forEach((key, index) => {
                if (title[index]) {
                    var n = { name: title[index], property: key }

                    this.tableHead3.push(n)


                }
            })

        },
        TabbleCommon(f) {
            this.listQuery2.UserId = this.listQuery.UserId = this.UserId
            this.listQuery2.Filter = this.listQuery.Filter = JSON.stringify(f)
            this.$refs.queryTable2.getList()
            this.$refs.queryTable.getList()
        },
        getechatrs() {

            const data3 = {
                "SType": "GetTableData",
                "UserId": this.UserId,
                "ExcelID": "",
                "TreeID": "1000287",
                "PageIndex": 1,
                "PageSize": 10,
                "Filter": "{}"
            }
            const data4 = {
                "SType": "GetTableData",
                "UserId": this.UserId,
                "ExcelID": "",
                "TreeID": "1000288",
                "PageIndex": 1,
                "PageSize": 10,
                "Filter": "{}"
            }
            const data5 = {
                "SType": "GetTableData",
                "UserId": this.UserId,
                "ExcelID": "",
                "TreeID": "1000289",
                "PageIndex": 1,
                "PageSize": 10,
                "Filter": "{}"
            }
            const data6 = {
                "SType": "GetTableData",
                "UserId": this.UserId,
                "ExcelID": "",
                "TreeID": "1000290",
                "PageIndex": 1,
                "PageSize": 10,
                "Filter": "{}"
            }
            const data7 = {
                "SType": "GetTableData",
                "UserId": this.UserId,
                "ExcelID": "",
                "TreeID": "1000291",
                "PageIndex": 1,
                "PageSize": 10,
                "Filter": "{}"
            }

            this.$getReq('/ashx/Common.ashx', "post", this.data).then(res => {
                var data = this.getshuju(res.Result.data)
                this.barData.quotaData = data
            })
            this.$getReq('/ashx/Common.ashx', "post", this.data2).then(res => {
                var data = this.getshuju(res.Result.data)
                this.barData2.quotaData = data
            })
            for (let index = 0; index < this.homeList.length; index++) {
                var datas = [data3, data4, data5, data6, data7]
                this.$getReq('/ashx/Common.ashx', "post", datas[index]).then(res => {
                    this.homeList[index].val = res.Result.data[0].SL || res.Result.data[0].CS;
                    if (index == 0) {
                        this.homeList[index].name = res.Result.data[0].NF + this.homeList[index].name;
                    }

                })
            }
            this.$getReq('/ashx/Common.ashx', "post", this.listQuery5).then(res => {

                var bname = [], legend = [], qdata = [], listData = []
                res.Result.data.map(r => {
                    if (bname.indexOf(r.CATEGORIES) < 0) {
                        bname.push(r.CATEGORIES)
                    }
                    if (legend.indexOf(r.NAME) < 0) {
                        legend.push(r.NAME)
                    }
                })
                // lehend数据，xaixs数据bname
                this.barData3.nameData = bname
                this.barData3.legendData = legend
                bname.map(r => {
                    var dt = []
                    res.Result.data.map(res => {
                        if (res.CATEGORIES == r) {
                            dt.push({ CATEGORIES: res.CATEGORIES, val: res.NAME, data: res.DATA })
                        }
                    })
                    listData.push(dt)
                })

                // 取差值，补值
                listData.map((r, index) => {
                    var dld = []
                    if (r.length < legend.length) {
                        r.map(re => {
                            dld.push(re.val)
                        })
                        var dlds = new Set(dld);
                        var newlegend = new Set(legend);
                        let differenceABSet = Array.from(new Set([...newlegend].filter(x => !dlds.has(x))))
                        differenceABSet.map(ress => {
                            r.push({ CATEGORIES: listData[index][0].CATEGORIES, val: ress, data: 0 })
                        })

                    }
                })


                var zuizhongdata = []//最终data数据
                listData.map(r => {
                    zuizhongdata.push(...r)
                })
                legend.map(r => {
                    var obj = {
                        name: r,
                        type: 'bar',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value;
                            }
                        },
                        barWidth: 20,
                        data: []
                    }
                    zuizhongdata.map(res => {
                        if (r == res.val) {
                            obj.data.push(res.data)
                        }
                    })
                    qdata.push(obj)
                })
                this.barData3.quotaData = qdata

            })
        },
        getshuju(r) {
            var data = []
            r.map(res => {
                data.push({ name: res.NAME, value: res.VALUE })
            })
            return data
        }

    }
}
</script>
  
<style scoped lang="scss">
.home {
    position: fixed;
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    background-color: #F4F4F4;
    padding: 15px;

    .titles {
        background-color: #fff;
        height: 3rem;
        font-size: 1.2rem;
        font-weight: bold;
        position: absolute;
        top: 0;
        width: 100%;
        left: 0;
        line-height: 3rem;
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);

        img {
            width: 3rem;
            vertical-align: middle;
            margin: 0 15px;
        }
    }

    .home_title {
        display: flex;
        margin-top: 3rem;

        .home_div {
            flex: 1;
            padding: 1.25rem;
            margin: 0 0.625rem;
            border-radius: 0.5rem;
            display: flex;
            color: #fff;
            font-size: 1.2rem;
            height: 4rem;

            .imgs {
                width: 3.75rem;
                height: 3.75rem;
                line-height: 3.75rem;
                text-align: center;
                border-radius: 8px;

                img {
                    width: 32px;
                    vertical-align: middle;
                }
            }

            .home_div2 {
                justify-content: space-between;
                display: flex;
                flex-flow: column;
                margin-left: 10px;

                p:nth-child(1) {
                    font-size: 1.2rem;
                    font-weight: bold;
                }

                p:nth-child(2) {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 1rem;
                    white-space: nowrap;
                }
            }
        }
    }

    .main {
        display: flex;
        flex-flow: column;
        height: calc(100% - 9.5rem);

        .main_1 {
            display: flex;
            flex: 1;
            margin-top: 0.625rem;

            .main_div {
                flex: 1;
                background-color: #fff;
                position: relative;

                .p1 {
                    padding-left: 15px;
                    line-height: 40px;
                    position: relative;
                    height: 40px;
                    font-weight: bold;
                }

                .tables {
                    width: 100%;
                    position: absolute;
                    height: calc(100% - 40px)
                }

                .p1::before {
                    content: '';
                    position: absolute;
                    height: 20px;
                    width: 5px;
                    top: 10px;
                    left: 0;
                    background-color: #0581E2;
                }
            }

            .main_div:nth-child(2) {
                margin: 0 0.625rem;

            }
        }
    }
}
</style>
<style>
.dvs a {
    text-decoration: revert !important;
    color: #409EFF
}
</style>