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
        <el-input placeholder="请输入内容"
          v-model="queryParams.query"
          @keyup.enter.native.prevent="getUserInfo"
          @clear="getUserInfo"
          clearable>
          <el-button slot="append" icon="el-icon-search" @click="getUserInfo"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
        <!-- 添加用户 -->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          destroy-on-close
          width="30%">
            <el-form
            ref="addUserForm"
            :model="userParams"
            :rules="registerRules"
            label-width="80px"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                prefix-icon="el-icon-user"
                v-model="userParams.username"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                prefix-icon="el-icon-lock"
                v-model="userParams.password"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input
                prefix-icon="el-icon-message"
                v-model="userParams.email"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
              <el-input
                prefix-icon="el-icon-phone"
                v-model="userParams.mobile"
                @keyup.enter.native.prevent="addUser"
              ></el-input>
            </el-form-item>
            <el-form-item label-position="right" class="submit-button">
              <el-button type="primary" @click="addUser">提交</el-button>
              <el-button type="primary" @click="dialogVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
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
import { getUsers, userStateChange, addUser } from 'network/user'

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
        password: '',
        email: '',
        mobile: ''
      },
      registerRules: {
        // 要与对应的input绑定的属性同名
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '最少6位数', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的号码', trigger: 'blur' }
        ]
      },
      dialogVisible: false // 添加用户dialog控制
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
      addUser(this.userParams).then(res => {
        this.$message({ message: '添加成功', type: 'success'})
        this.userList.unshift(res.data)
        this.dialogVisible = false
      }).catch(error => {
        this.$message({ message: error, type: 'error'})
      })
      this.$refs.addUserForm.resetFields()
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
