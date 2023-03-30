<template>
    <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils/get-page-title'

export default {
    props: {
        className: {
            type: String,
            default: 'chart'
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '300px'
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
        chinas:{
            type: String,
            default: 'china'
        }
    },
    data() {
        return {
            chart: null
        }
    },
    watch: {
        barData: {
            deep: true,
            handler(val) {
                this.setOptions(val)
            }
        },

    },
    mounted() {
        this.initChart()
        this.__resizeHandler = debounce(() => {
            if (this.chart) {
                this.chart.resize()
            }
        }, 100)
        window.addEventListener('resize', this.__resizeHandler)
    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        window.removeEventListener('resize', this.__resizeHandler)
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        initChart() {
            var that = this
            this.chart = echarts.init(this.$el, 'macarons')
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
                'Puerto Rico': {
                    left: -76,
                    top: 26,
                    width: 2
                },
            });

            this.setOptions(this.barData)
            if (that.clickshow) {
                this.chart.on('click', function (data) {
                    if (data.componentSubType && data.componentSubType == 'pie') {
                        // console.log(data.data.city)
                        that.$emit('cityList', data.data.city)
                    }


                });
            }

        },


        setOptions({ quotaData, showColor } = {}) {
            var that = this
            if (showColor && showColor.show) {
                this.chart.setOption({
                    backgroundColor:"#ffffff",
                    geo: {
                        type: 'map',
                        map: that.chinas,
                        label: {
                            show: true
                        },
                        aspectScale:1.3,
                        roam: true,
                        regions: showColor.max,
                    },
                    tooltip: {},
                    legend: {
                        orient: 'middle',
                        top: '30%',
                        right: 50,
                    },
                    series: quotaData
                })
            } else {
                this.chart.setOption({
                    backgroundColor:"#ffffff",
                    geo: {
                        map: that.chinas,
                        roam: true,
                        itemStyle: {
                            areaColor: '#e7e8ea'
                        },
                        aspectScale:1.3,
                        label: {
                            show: true
                        }
                    },
                    tooltip: {},
                    legend: {
                        orient: 'middle',
                        top: '30%',
                        right: 50,

                    },
                    series: quotaData
                })
            }

        }
    }
}
</script>
<style>
.chart {
    width: 100%;
    height: 660px;
}
</style>
