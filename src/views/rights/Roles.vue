<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 权限列表 -->
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
          <el-tooltip content="Top center" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-star-off" size="mini"></el-button>
          </el-tooltip>
          <edit-user
            :editUserInfo="editUserInfo"
            :dialogVisible="editId===scope.row.id ? editUserVisible : false"
            @cancelClick="editHide"
            @editUser="editUser($event, scope.row)">
          </edit-user>
        </template>
      </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
  name: 'Roles'
}
</script>

<style scoped>
</style>
