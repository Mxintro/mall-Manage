<template>
<div>
  <!-- 不直接修改props属性 -->
  <el-dialog
    title="修改用户"
    :visible="dialogVisible"
    @update:visible = "cancelClick"
    destroy-on-close
    width="30%">
    <p>用户名：{{userInfo.username}}</p>
    <p>角色：{{userInfo.role_name}}</p>
    <el-select v-model="selectedRole" placeholder="请选择">
      <el-option
        v-for="item in rolesList"
        :key="item.id"
        :label="item.roleName"
        :value="item.id">
      </el-option>
    </el-select>
    <el-button type="primary" @click="setRole">提交</el-button>
    <el-button type="primary" @click="cancelClick">取消</el-button>
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
      }).catch(error => {
        this.$message({type: 'error', message: error})
      })
    }
  }
}

</script>

<style scoped>
</style>
