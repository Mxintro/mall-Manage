<template>
<div>
  <!-- 不直接修改props属性 -->
  <el-dialog
    title="修改用户"
    :visible="dialogVisible"
    @update:visible = "cancelClick"
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
          disabled
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
          @keyup.enter.native.prevent="editUser"
        ></el-input>
      </el-form-item>
      <el-form-item label-position="right" class="submit-button">
        <el-button type="primary" @click="editUser">提交</el-button>
        <el-button type="primary" @click="cancelClick">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
import { editUser } from 'network/user'

export default {
  name: 'EditUser',
  data() {
    return {
      userParams: {
        username: '',
        email: '',
        mobile: ''
      },
      registerRules: {
        // 要与对应的input绑定的属性同名
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的号码', trigger: 'blur' }
        ]
      }// 添加用户dialog控制
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    editUserInfo: {
      type: Object,
      default: () => { return {} }
    }
  },
  methods: {
    editUser() {
      editUser(this.userParams).then(res => {
        this.$message({ message: '修改成功', type: 'success'})
        this.$emit('editUser', res.data)
        // console.log(res)
      }).catch(error => {
        this.$message({ message: error, type: 'error'})
      })
    },
    cancelClick() {
      this.$emit('cancelClick')
    }
  },
  watch: {
    editUserInfo() {
      this.userParams = {...this.editUserInfo}
    }
  }
}

</script>

<style scoped>
</style>
