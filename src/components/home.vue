<template>
    <div class="home">
        <p class="titles">
            <img src="../assets/img/yldslogo.png" />
            食品安全热点大数据预警平台
        </p>
        <div class="home_title">
            <div class="home_div" :style="{ 'background-color': item.color }" v-for="(item,index) in homeList"
                :key="index">
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
                <div class="main_div"> <pieCharts height="100%" /></div>
                <div class="main_div"> <pieCharts height="100%" /></div>
                <div class="main_div"> <pieCharts height="100%" /></div>
            </div>
            <div class="main_1">
                <div class="main_div"></div>
                <div class="main_div"></div>
                <div class="main_div"></div>
            </div>
            <div class="main_1">
                <div class="main_div"></div>
                <div class="main_div2"></div>
            </div>
           
        </div>
        <!-- <query ref="queryTable" height="270" :listQuery="listQuery"></query> -->
    </div>
</template>
  
<script>
import query from './queryTbale.vue'
import pieCharts from './pieEcharts.vue'
export default {
    components: {
        query,
        pieCharts
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
            homeList: [
                { name: '2022年预警事件数', val: 21152, imgcolor: '#DCE0F9', color: '#516AE8', bgimg: require('@/assets/img/icon1.png') },
                { name: '食品安全国内通报数量', val: 21152, imgcolor: '#FFE7CF', color: '#FF870F', bgimg: require('@/assets/img/icon2.png') },
                { name: '食品安全国外通报数量', val: 21152, imgcolor: '#CBE7FE', color: '#0088FE', bgimg: require('@/assets/img/icon3.png') },
                { name: '今日浏览次数', val: 21152, imgcolor: '#D7F3E5', color: '#30C283', bgimg: require('@/assets/img/icon4.png') },
                { name: '总浏览次数', val: 21152, imgcolor: '#DFE4FF', color: '#607DFF', bgimg: require('@/assets/img/icon5.png') }
            ]
        }
    },
    created() {
        this.UserId = this.$route.query.userId;
    },
    mounted() {
        // this.TabbleCommon()
        //   this.$refs.refsearch.getData()
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
        box-shadow: 0 0 10px 1px #000;

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
                p:nth-child(1){
                    font-size: 1.2rem;
                    font-weight: bold;
                }
                p:nth-child(2){
                    color: rgba(255,255,255,0.7);
                }
            }
        }
    }

    .main{
        display: flex;
        flex-flow: column;
        height: calc(100% - 9.5rem);
        .main_1{
            display: flex;
            flex: 1;
            margin-top: 0.625rem;
            .main_div{
                flex: 1;
            }
        }
    }
}
</style>
  