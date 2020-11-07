<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    <el-breadcrumb-item>订单列表</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card>
    <el-row :gutter="20">
      <!-- 搜索 -->
      <el-col :span="10">
        <el-input placeholder="请输入内容"
          v-model="ordersQuery.query"
          @keyup.enter.native.prevent="orderQuery"
          clearable>
          <el-button slot="append" icon="el-icon-search" @click="orderQuery"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table
      :data="ordersList"
      border
      style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="order_number" label="订单编号"></el-table-column>
      <el-table-column prop="order_price" label="价格"></el-table-column>
      <el-table-column prop="pay_status" label="是否付款">
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.pay_status === '0'">未付款</el-tag>
          <el-tag type="success" v-else>已付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"></el-table-column>
      <el-table-column prop="create_time" label="下单时间"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEidt()"></el-button>
          <el-button type="success" icon="el-icon-location" size="mini" @click="showProgress()"></el-button>
        </template>
      </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="ordersQuery.pagenum"
        :page-sizes="[5, 10, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="ordersQuery.pagesize"
        :total="totalPages">
      </el-pagination>
  </el-card>
  <!-- 修改地址 -->
  <el-dialog
    title="修改地址"
    :visible.sync="editVisible"
    @close="resetAddressForm"
    width="50%">
    <el-form
      :data="addressForm"
      ref="addressForm"
      width="100%"
      label-width="18%"
      :rules="addressRules">
      <el-form-item prop="address1" label="省市区/县">
        <el-cascader
          v-model="addressForm.address1"
          :options="cityData"
          :props="{ expandTrigger: 'hover' }"
          clearable
          @change="handleAddressChange"></el-cascader>
      </el-form-item>
      <el-form-item prop="address1" label="详细地址">
        <el-input v-model="addressForm.address2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="eidtAddress()">提交</el-button>
        <el-button @click="editVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 物流进度 -->
  <el-dialog
    title="物流进度"
    width="60%"
    :visible.sync="progressVisible">
    <el-timeline :reverse="false">
      <el-timeline-item
        v-for="(activity, index) in progressInfo"
        :key="index"
        :timestamp="activity.ftime">
        {{activity.context}}
      </el-timeline-item>
    </el-timeline>
  </el-dialog>
</div>
</template>

<script>
import { getOrders, getProgress } from 'network/order'
import { formatDate } from 'common/utils.js'
import cityData from './citydata'

export default {
  name: 'Order',
  data() {
    return {
      ordersQuery: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      totalPages: 0,
      ordersList: [],
      editVisible: false,
      addressForm: {
        address1: [],
        address2: ''
      },
      addressRules: {
        address1: [
          { required: true, message: '请选择地址', trigger: 'blur' }
        ],
        address2: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
      cityData,
      progressVisible: false,
      progressInfo: [],
      progressId: 0
    }
  },
  created() {
    this.getOrdersList()
  },
  methods: {
    getOrdersList() {
      getOrders(this.ordersQuery).then(res => {
        this.ordersList = res.data.goods
        this.ordersList.forEach(item => {
          const date = new Date(item.create_time * 1000)
          item.create_time = formatDate(date, 'yyyy-MM-dd  hh:mm:ss')
        })
        this.totalPages = res.data.total
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    getProgressInfo() {
      getProgress(this.progressId).then(res => {
        this.progressInfo = res.data
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    orderQuery() {
      if (!this.orderQuery.query) {
        this.getOrdersList()
      }
    },
    handleSizeChange(newSize) {
      this.ordersQuery.pagesize = newSize
      this.getOrdersList()
    },
    handleCurrentChange(newPage) {
      this.ordersQuery.pagenum = newPage
      this.getOrdersList()
    },
    handleAddressChange(value) {
      if (value.length === 2) {
        console.log(value)
      }
    },
    eidtAddress() {
    },
    resetAddressForm() {
      this.$refs.addressForm.resetFields()
    },
    showEidt(row) {
      this.editVisible = true
    },
    showProgress() {
      this.progressVisible = true
      // this.progressId = 773046451247625
      this.progressId = 1106975712662
      this.getProgressInfo()
    }
  }
}
</script>

<style scoped>
.el-cascader {
  width: 100%;
}
</style>
