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
        setOptions({ quotaData, radius } = {}) {
            var thta = this
            this.chart.setOption({
                legend: {
                    // top: 'bottom'，
                    show: false
                },
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        // name: name ? name : '测试',
                        type: 'pie',
                        radius: radius,
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            // borderRadius: 8
                        },
                        data: quotaData
                    }
                ]
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
  