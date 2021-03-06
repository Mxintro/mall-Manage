<template>
<div>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <!-- 搜索 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入内容"
          v-model="queryParams.query"
          @keyup.enter.native.prevent="getUserInfo"
          @clear="getUserInfo"
          clearable>
          <el-button slot="append" icon="el-icon-search" @click="getUserInfo"></el-button>
        </el-input>
      </el-col>
        <!-- 添加用户 -->
      <el-col :span="4">
        <el-button type="primary" @click="addUserVisible = true">添加用户</el-button>
        <add-user
          :dialogVisible="addUserVisible"
          @cancelClick="addCancel"
          @addUser="addUser"></add-user>
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
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUserShow(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row)"></el-button>
          <el-tooltip content="角色分配" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-star-off" size="mini" @click="setRole(scope.row)"></el-button>
          </el-tooltip>
          <edit-user
            :editUserInfo="editUserInfo"
            :dialogVisible="editId===scope.row.id ? editUserVisible : false"
            @cancelClick="editHide"
            @editUser="editUser($event, scope.row)">
          </edit-user>
          <!-- 通过$event传递子组件传出来的值 -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[2, 4, 5, 10]"
        :page-size="queryParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>
    <!-- 角色分配 -->
  <set-role
    :userInfo="userInfo"
    :dialogVisible="setRoleVisible"
    @newRole="gotNewRole"
    @cancelClick="setRoleCancel"></set-role>
  </el-card>
</div>
</template>

<script>
import AddUser from './childComps/AddUser'
import EditUser from './childComps/EditUser'
import SetRole from './childComps/SetRole'

import { getUsers, userStateChange, deleteUser } from 'network/user'

export default {
  name: 'Users',
  data() {
    return {
      queryParams: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      totalPage: 0,
      pageNum: 1,
      userList: [],
      addUserVisible: false,
      editUserVisible: false,
      editId: '',
      editUserInfo: {},
      userInfo: {},
      setRoleVisible: false
    }
  },
  components: {
    AddUser,
    EditUser,
    SetRole
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      getUsers(this.queryParams).then(res => {
        const data = res.data
        this.totalPage = data.total
        this.pageNum = data.pagenum
        this.userList = data.users
        this.id = data.id
      }).catch(error => {
        this.$message({ message: error, type: 'error'})
      })
    },
    handleSizeChange(newSize) {
      this.queryParams.pagesize = newSize
      this.getUserInfo()
    },
    handleCurrentChange(currentPage) {
      this.queryParams.pagenum = currentPage
      this.getUserInfo()
    },
    userStateChange(row) {
      userStateChange({ uId: parseInt(row.id), type: row.mg_state})
    },
    addUser(data) {
      this.userList.unshift(data)
      // this.getUserInfo()
      this.addUserVisible = false
    },
    addCancel() {
      this.addUserVisible = false
    },
    editUser(data, row) {
      // this.userList.find(item => item.)
      row.email = data.email
      row.mobile = data.mobile
      this.editHide()
    },
    editUserShow(row) {
      this.editId = row.id
      this.editUserInfo = row
      this.editUserVisible = true
    },
    editHide() {
      this.editUserVisible = false
    },
    deleteUser(row) {
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(row.id).then(() => {
          this.$message.success('删除成功')
          const index = this.userList.indexOf(this.userList.find(item => item.id === row.id))
          this.userList.splice(index, 1)
          this.totalPage--
        }).catch(error => {
          this.$message.error(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    setRole(user) {
      this.userInfo = user
      this.setRoleVisible = true
    },
    gotNewRole(data) {
      console.log(data)
      this.userInfo.role_name = data.roleName
      this.setRoleCancel()
    },
    setRoleCancel() {
      this.setRoleVisible = false
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
