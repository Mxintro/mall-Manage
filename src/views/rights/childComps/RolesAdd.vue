<template>
  <div>
    <el-dialog
      title="修改用户权限"
      :visible="dialogVisible"
      @update:visible = "cancelClick"
      destroy-on-close
      width="40%">
        <el-form
        :model="addParams"
        label-width="80px"
      >
        <el-form-item label="角色名称">
          <el-input
            v-model="addParams.roleName"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="addParams.roleDesc"
            @keyup.enter.native.prevent="addSumit"
          ></el-input>
        </el-form-item>
        <el-form-item label-position="right" class="submit-button">
          <el-button type="primary" @click="addSumit">提交</el-button>
          <el-button type="primary" @click="cancelClick">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addRoles } from 'network/rights'

export default {
  name: 'RolesAdd',
  data() {
    return {
      addParams: {
        roleName: '',
        roleDesc: ''
      }
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    addSumit() {
      addRoles(this.addParams).then(res => {
        this.$message.success('修改成功')
        this.$emit('addDone', res.data)
        this.$emit('cancelClick')
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
