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
            default: () => {
                return {}
            }
        },
        city: {
            type: Object,
            default: () => {
                return {}
            }
        },
        clickshow: {
            type: Boolean,
            default: true
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
            this.chart = echarts.init(this.$el, 'macarons')
            this.setOptions(this.barData)
        },
        setOptions({ quotaData, nameData, legendData } = {}) {
            var thta = this
            this.chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                grid: {
                    left: '5%',
                    top: '20',
                    right: '20',
                    bottom: 30
                },
                legend: {
                    data: legendData,
                    // left: 'right',
                    right:10
                },
                xAxis: [
                    {
                        type: 'category',
                        data: nameData,
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',

                    }
                ],
                series: quotaData
            })
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
  