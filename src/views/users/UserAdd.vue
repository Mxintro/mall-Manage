<template>
</template>

<script>
export default {
  name: "UserAdd",
  data() {
    return {
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
      },
      dialogVisible: false // 添加用户dialog控制
    }
  }
}
</script>

<style scoped>
</style>