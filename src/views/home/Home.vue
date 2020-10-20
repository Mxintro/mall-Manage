<template>
  <el-container>
    <el-header>后台管理系统
      <div class="log-out"><el-button type="info" @click="logOut">退出登录</el-button></div>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '60px' : '200px'">
        <div class="toggle-button" @click="toggleClick">|||</div>
        <el-menu
          :collapse = "isCollapse"
          :collapse-transition = false
          class="el-menu-vertical-demo"
          background-color="#313743"
          text-color="#EEE8F0"
          active-text-color="#ffd04b"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="menu.id + ''"
            v-for="menu in menuList"
            :key="menu.id"
          >
            <template slot="title">
              <i :class="iconFont[menu.path]"></i>
              <span>{{ menu.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/'+child.path"
              v-for="child in menu.children"
              :key="child.id"
              @click="itemClick('/'+child.path)"
              ><template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ child.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMenus } from 'network/axios'

export default {
  name: 'Home',
  data() {
    return {
      menuList: [],
      iconFont: {
        users: 'iconfont icon-users',
        rights: 'iconfont icon-tijikongjian',
        goods: 'iconfont icon-shangpin',
        orders: 'iconfont icon-danju',
        reports: 'iconfont icon-baobiao'
      },
      isCollapse: false,
      activePath: window.sessionStorage.getItem('activePath') || ''
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    getMenuList() {
      getMenus().then((res, error) => {
        this.menuList = res.data
      }).catch(error => {
        this.$message({ message: error, type: 'error'})
      })
    },
    toggleClick() {
      this.isCollapse = !this.isCollapse
    },
    itemClick(arg) {
      window.sessionStorage.setItem('activePath', arg)
      this.activePath = arg
    },
    logOut() {
      sessionStorage.clear()
      try {
        window.sessionStorage.clear()
        this.$router.push('login')
      } catch {
        this.$message.error('退出失败')
      }
    }
  }
}
</script>

<style scoped>

.el-header {
  background-color: #363d40;
  color: #eee8f0;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #313743;
  color: #eee8f0;
  text-align: center;
  line-height: 200px;
}
.toggle-button {
  line-height: 30px;
  letter-spacing: 0.2em;
  background-color: #505A6C;
}
.el-aside .el-menu {
  border-right: none;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container {
  height: 100%;
}

/* .el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
} */
.iconfont {
  margin-right: 10px;
}
.log-out {
  float: right;
  height: 100%;
}
</style>
