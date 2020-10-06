<template>
  <div>rr
    <!-- <el-dialog
      title="修改用户权限"
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
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  name: 'RightsEdit'
}
</script>

<style scoped>
</style>
