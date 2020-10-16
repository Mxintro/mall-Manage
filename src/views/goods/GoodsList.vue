<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card>
    <el-row :gutter="20">
      <!-- 搜索 -->
      <el-col :span="10">
        <el-input placeholder="请输入内容"
          v-model="goodsListQuery.query"
          @keyup.enter.native.prevent="goodsQuery"
          @clear="goodsQuery"
          clearable>
          <el-button slot="append" icon="el-icon-search" @click="goodsQuery"></el-button>
        </el-input>
      </el-col>
      <!-- 添加商品 -->
      <el-col :span="4">
        <el-button type="primary" @click="goToAddPage">添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 商品列表 -->
    <el-table
      :data="goodsList"
      border
      v-if="goodsList.length > 0"
      style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" show-overflow-tooltip width="500px"></el-table-column>
      <el-table-column prop="goods_price" label="价格"></el-table-column>
      <el-table-column prop="goods_weight" label="重量"></el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="135px"></el-table-column>
      <el-table-column label="操作" width="120px">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEidt(scope.row)"></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteGood(scope.row)"></el-button>
      </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="goodsListQuery.pagenum"
      :page-sizes="[5, 10, 30]"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="goodsListQuery.pagesize"
      :total="totalgoods">
    </el-pagination>
  </el-card>

  <!-- 对话框区 -->
  <!-- 添加商品对话框 -->
</div>
</template>

<script>
import { getGoodsList } from 'network/goods'
import { formatDate } from 'common/utils.js'

export default {
  name: 'GoodsList',
  data() {
    return {
      goodsList: [],
      totalgoods: 0,
      goodsListQuery: {
        query: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getGoodsList(this.goodsListQuery).then(res => {
        this.goodsList = res.data.goods
        this.goodsList.forEach(item => {
          const date = new Date(item.add_time * 1000)
          item.add_time = formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        })
        this.totalgoods = res.data.total
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    goodsQuery() {
      if (this.goodsListQuery.query + '') {
        this.getList()
      }
    },
    goToAddPage() {
      this.$router.replace({path: '/goods/add'})
    },
    handleSizeChange(newSize) {
      this.goodsListQuery.pagesize = newSize
      this.getList()
    },
    handleCurrentChange(newPage) {
      this.goodsListQuery.pagenum = newPage
      this.getList()
    },
    showEidt(row) {
      console.log(row)
    },
    deleteGood(row) {
      console.log(row)
    }
  }
}
</script>

<style scoped>
.el-table {
  font-size: 12px;
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
