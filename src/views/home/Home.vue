<template>
  <el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#313743"
      text-color="#EEE8F0"
      active-text-color="#ffd04b">
      <!-- 一级菜单 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item index="1-1">选项1</el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
  .el-header {
    background-color: #363D40;
    color: #EEE8F0;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #313743;
    color: #EEE8F0;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container{
    height: 100%;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
