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
        setOptions({ quotaData,name } = {}) {
            var thta = this
            this.chart.setOption({
                legend: {
                    // top: 'bottom'，
                    show: false
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                        name: name?name:'测试',
                        type: 'pie',
                        radius: [50, 250],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            // borderRadius: 8
                        },
                        data: [
                            { value: 40, name: 'rose 1' },
                            { value: 38, name: 'rose 2' },
                            { value: 32, name: 'rose 3' },
                            { value: 30, name: 'rose 4' },
                            { value: 28, name: 'rose 5' },
                            { value: 26, name: 'rose 6' },
                            { value: 22, name: 'rose 7' },
                            { value: 18, name: 'rose 8' }
                        ]
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
  