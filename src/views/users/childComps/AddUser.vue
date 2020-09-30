<template>
  <div>
    <!-- 不直接修改props属性 -->
    <el-dialog
      title="提示"
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
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
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
          <el-button type="primary" @click="cancelClick">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addUser } from 'network/user'

export default {
  name: 'AddUser',
  data() {
    return {
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
      }// 添加用户dialog控制
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    addUser() {
      addUser(this.userParams).then(res => {
        this.$message({ message: '添加成功', type: 'success'})
        this.$emit('addUser', res.data)
        // console.log(res)
      }).catch(error => {
        this.$message({ message: error, type: 'error'})
      })
    },
    cancelClick() {
      this.$emit('cancelClick')
    }
  }
}
</script>

<style scoped>
</style>
