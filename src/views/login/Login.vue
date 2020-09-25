<template>
  <div id="login-page">
    <div class="login-bar">
      <div class="login-title">用户登录</div>
      <div class="login-form">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" prefix-icon="el-icon-lock" v-model="loginForm.password"
            @keyup.enter.native.prevent="submitForm"></el-input>
          </el-form-item>
          <el-form-item label-position="right" class="submit-button">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Login } from 'network/axios'

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        // 要与对应的input绑定的属性同名
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '最少6位数', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      // const { name, password } = this.loginForm
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          alert('submit!')
          Login(this.loginForm).then(res => {
            console.log(res)
            const data = res.data
            if (data.meta.status === 200) {
              console.log('登录成功')
            } else {
              console.log('登录失败')
            }
            console.log(data.meta.msg)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style scoped>
#login-page {
  background-color: #789;
  height: 100%;
  width: 100%;
  position: relative;
}
.login-bar {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 450px;
  height: 300px;
  background-color: azure;
  border-radius: 8px;
}
.login-title {
  margin-top: 30px;
  text-align: center;
  font-size: 18px;
}
.login-form {
  padding: 30px 30px 30px 0;
}
.submit-button {
  float: right;
}
</style>
