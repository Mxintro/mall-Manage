<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="rightsList"
      border
      v-if="rightsList.length > 0"
      style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限说明"></el-table-column>
      <el-table-column prop="path" label="对应访问路径"></el-table-column>
      <el-table-column prop="level" label="权限层级">
        <template slot-scope="scope">
        <el-tag v-if="scope.row.level === '0'">一级</el-tag>
        <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
        <el-tag type="warning" v-else-if="scope.row.level === '2'">三级</el-tag>
        </template>
        <el-tag type="success">标签二</el-tag>
      </el-table-column>>
    </el-table>
  </div>
</template>

<script>
import { getRights } from 'network/rights'

export default {
  name: 'Rights',
  data() {
    return {
      rightsList: []
    }
  },
  created() {
    this.getRightsList()
  },
  methods: {
    getRightsList() {
      getRights('list').then(res => {
        this.rightsList = res.data
      }).catch(error => {
        this.$message.error(error)
      })
    }
  }
}
</script>

<style scoped>
</style>
