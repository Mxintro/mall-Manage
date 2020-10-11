<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
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
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row
            class="v-center"
            :class="['bd-bottom', index1===0 ? 'bd-top' : '']"
            v-for="(item1, index1) in scope.row.children"
            :key="item1.id">
            <!-- 以及权限 -->
            <el-col :span="5">
              <el-tag
                closable
                @close="deleteRoleRight(scope.row, item1.id)">
                {{item1.authName}}
                {{item1.id}}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
            <!-- 二级权限  -->
            <!-- 三级权限   -->
            <el-col :span="19">
              <el-row
                class="v-center"
                :class="[index2===0 ? '' : 'bd-top']"
                v-for="(item2, index2) in item1.children"
                :key="item2.id">
                <!-- 二级权限 -->
                <el-col :span="6">
                  <el-tag
                    type="success"
                    closable
                    @close="deleteRoleRight(scope.row, item2.id)">
                    {{item2.authName}}
                    {{item2.id}}</el-tag>
                  <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                <el-col :span="18">
                  <el-tag
                    type="warning"
                    closable
                    @close="deleteRoleRight(scope.row, item3.id)"
                    :class="[index3===0 ? '' : 'bd-top']"
                    v-for="(item3, index3) in item2.children"
                    :key="item3.id">
                    {{item3.authName}}{{item3.id}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 用户列 -->
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
      <el-table-column label="操作" width="290px" class="">
        <template slot-scope="scope">
          <div class="handle-bts">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editRole(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRole(scope.row)">删除</el-button>
            <el-button type="warning" icon="el-icon-star-off" size="mini" @click="getRoleRights(scope.row)">分配权限</el-button>
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
    <!-- 权限分配   -->
    <rights-set
      :roleId="roleId"
      :checkKeys="currentRights"
      :setRightsVisible="setRightsVisible"
      @roleRightsSet="roleRightsSet"
      @cancelClick="rightsSetClose">
    </rights-set>
  </el-card>
</div>
</template>

<script>
import { getRoles, deleteRoleRight } from 'network/rights'

import RolesEdit from './childComps/RolesEdit'
import RolesAdd from './childComps/RolesAdd'
import RightsSet from './childComps/RightsSet'

export default {
  name: 'Roles',
  data() {
    return {
      rolesList: [],
      editInfo: {},
      addRolesVisible: false,
      editVisible: false,
      setRightsVisible: false,
      editId: '',
      currentRights: [],
      roleId: 0
    }
  },
  components: {
    RolesEdit,
    RolesAdd,
    RightsSet
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
    deleteRoleRight(role, rightId) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRoleRight(role.id, rightId).then(res => {
          this.$message.success('删除成功')
          role.children = res.data
          console.log(role)
        }).catch(error => {
          this.$message.error(error)
        })
      })
    },
    getRoleRights(row) {
      this.roleId = row.id
      const rights = []
      function getId(item) {
        if (!Object.prototype.hasOwnProperty.call(item, 'children')) return rights.push(item.id)
        item.children.forEach(el => {
          getId(el)
        })
      }
      getId(row)
      this.currentRights = rights
      console.log(this.currentRights)
      this.setRightsVisible = true
    },
    roleRightsSet() {
      this.getRolesList()
      this.rightsSetClose()
    },
    rightsSetClose() {
      this.setRightsVisible = false
      this.currentRights = []
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

.el-tag {
  margin: 7px;
}
.bd-top {
  border-top: 1px solid #eee;
}
.bd-bottom {
  border-bottom: 1px solid #eee;
}
.v-center {
  display: flex;
  align-items: center;
}
</style>
