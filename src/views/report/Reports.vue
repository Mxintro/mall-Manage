<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div ref="main" style="width: 750px; height: 400px"></div>
    <el-card></el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getReports } from 'network/reports'
import { deepMerge } from 'common/utils.js'

export default {
  name: 'Reports',
  data() {
    return {
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  created() {
    this.getOptions()
  },
  mounted() {
  },
  methods: {
    showEcharts() {
      const myChart = echarts.init(this.$refs.main)
      myChart.setOption(this.options)
    },
    getOptions() {
      getReports().then(res => {
        console.log(res.data)
        this.options = deepMerge(this.options, res.data)
        console.log(this.options)
        this.showEcharts()
      })
    }
  }
}
</script>

<style scoped>
</style>
