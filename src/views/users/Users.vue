<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="box-card">
    <!-- 搜索 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addUser">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 用户列表 -->
    <el-table
      :data="userList"
      border
      v-if="userList.length > 0"
      style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column prop="mg_state" label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="userStateChange(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="操作" width="175px">
        <template>
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          <el-tooltip content="Top center" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-star-off" size="mini"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="queryParams.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="4">
        </el-pagination>
      </div>
  </el-card>
</div>
</template>

<script>
import { getUsers, userStateChange } from 'network/user'

export default {
  name: 'Users',
  data() {
    return {
      queryParams: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      totalPage: 0,
      pageNum: 1,
      userList: [],
      userParams: {
        username: '',
        password: 0,
        email: 0,
        mobile: 0
      }
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
        this.$message({ message: error, type: 'error'})
      })
    },
    handleSizeChange(newSize) {
      this.queryParams.pagesize = newSize
    },
    handleCurrentChange(currentPage) {
      this.queryParams.pagenum = currentPage
      this.getUserInfo()
    },
    userStateChange(row) {
      userStateChange({ uId: parseInt(row.id), type: row.mg_state})
    },
    addUser() {
    }
  }
}
</script>

<style scoped>
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
