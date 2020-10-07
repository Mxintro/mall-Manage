<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 添加角色 -->
  <el-button type="primary" @click="addRolesVisible = true">添加角色</el-button>
  <roles-add
    :dialogVisible="addRolesVisible"
    @addDone="rolesList.unshift($event)"
    @cancelClick="addRolesVisible = false">
    </roles-add>
  <!-- 权限列表 -->
  <el-table
    :data="rolesList"
    border
    v-if="rolesList.length > 0"
    style="width: 100%">
    <!-- 展开列 -->
    <el-table-column type="expand"></el-table-column>
    <!-- 用户列 -->
    <el-table-column type="index"></el-table-column>
    <el-table-column prop="roleName" label="角色名称"></el-table-column>
    <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
    <el-table-column prop="id" label="操作" width="290px" class="">
      <template slot-scope="scope">
        <div class="handle-bts">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editRole(scope.row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRole(scope.row)">删除</el-button>
          <el-button type="warning" icon="el-icon-star-off" size="mini">分配权限</el-button>
        </div>
          <!-- 权限编辑 -->
        <roles-edit
          :editInfo="editInfo"
          :dialogVisible="editId===scope.row.id ? editVisible : false"
          @editDone="editDone($event, scope.row)"
          @cancelClick="editVisible=false">
        </roles-edit>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import { getRoles } from 'network/rights'

import RolesEdit from './childComps/RolesEdit'
import RolesAdd from './childComps/RolesAdd'

export default {
  name: 'Roles',
  data() {
    return {
      rolesList: [],
      editInfo: {},
      addRolesVisible: false,
      editVisible: false,
      editId: ''
    }
  },
  components: {
    RolesEdit,
    RolesAdd
  },
  created() {
    this.getRolesList()
  },
  methods: {
    getRolesList() {
      getRoles().then(res => {
        this.rolesList = res.data
      }).catch(error => {
        this.$memssage.error(error)
      })
    },
    editRole(row) {
      this.editId = row.id
      this.editInfo = row
      this.editVisible = true
    },
    editDone(data, row) {
      // this.userList.find(item => item.)
      row.roleName = data.roleName
      row.roleDesc = data.roleDesc
      this.editVisible = false
    },
    addRoles(data) {
      this.rolesList.unshift(data)
    }
  }
}
</script>

<style scoped>
.handle-bts {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.el-button {
  margin-top: 10px;
}
</style>
