<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品分类</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <tree-table
      :data="cateList"
      :expand-type="false"
      :selection-type='false'
      show-index
      index-text="#"
      :columns="columns">
    </tree-table>
  </el-card>
</div>
</template>

<script>
import { getGoodsCate } from 'network/goods'

export default {
  name: 'Cate',
  data() {
    return {
      cateList: [],
      getCateParams: {
        pagenum: 1,
        pagesize: 5
      },
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        }
      ]
    }
  },
  created() {
    this.getCate()
  },
  methods: {
    getCate() {
      getGoodsCate(this.getCateParams).then(res => {
        this.cateList = res.data.result
      })
    }
  }
}
</script>

<style scoped>
</style>
