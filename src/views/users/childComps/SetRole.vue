<template>
<div>
  <!-- 不直接修改props属性 -->
  <el-dialog
    title="修改用户"
    :visible="dialogVisible"
    @update:visible = "cancelClick"
    destroy-on-close
    width="25%">
    <p>用户名：{{userInfo.username}}</p>
    <p>当前角色：{{userInfo.role_name}}</p>
    <div class="role-select">
      <el-select v-model="selectedRole" placeholder="请选择">
        <el-option
          v-for="item in rolesList"
          :key="item.id"
          :label="item.roleName"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button type="primary" @click="setRole">提交</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { getRoles } from 'network/rights'
import { setUserRloe } from 'network/user'

export default {
  name: 'SetRole',
  data() {
    return {
      userParams: {
        username: '',
        email: '',
        mobile: ''
      },
      rolesList: [],
      selectedRole: ''
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: () => { return {} }
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    cancelClick() {
      this.$emit('cancelClick')
    },
    getRolesList() {
      getRoles().then(res => {
        this.rolesList = res.data
      }).catch(error => {
        this.$message({type: 'error', message: error})
      })
    },
    setRole() {
      setUserRloe(this.userInfo.id, this.selectedRole).then(res => {
        const newUser = this.rolesList.find(item => item.id === res.data.rid)
        this.$emit('newRole', newUser)
        this.$message({type: 'success', message: '角色分配成功'})
      }).catch(error => {
        this.$message({type: 'error', message: error})
      })
    }
  }
}

</script>

<style scoped>
.el-dialog p {
  margin: 10px 0;
}
.role-select {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
