<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="box-card">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary">添加用户</el-button>
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
import { getUsers } from 'network/axios'

export default {
  name: 'Users',
  data() {
    return {
      queryParams: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      totalPage: 0,
      pageNum: 1,
      userList: []
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      getUsers(this.queryParams).then(res => {
        const data = res.data
        this.totalPage = data.tatalpage
        this.pageNum = data.pagenum
        this.userList = data.users
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
</script>

<style scoped>
</style>
