<template>
  <div>
    <el-dialog
      title="修改用户权限"
      :visible="dialogVisible"
      @update:visible = "cancelClick"
      destroy-on-close
      width="40%">
        <el-form
        ref="addUserForm"
        :model="editParams"
        label-width="80px"
      >
        <el-form-item label="id">
          <el-input
            v-model="editParams.id"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input
            v-model="editParams.roleName"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="editParams.roleDesc"
            @keyup.enter.native.prevent="editSummit"
          ></el-input>
        </el-form-item>
        <el-form-item label-position="right" class="submit-button">
          <el-button type="primary" @click="editSummit">提交</el-button>
          <el-button type="primary" @click="cancelClick">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { editRoles } from 'network/rights'

export default {
  name: 'RolesEdit',
  data() {
    return {
      editParams: {}
    }
  },
  props: {
    editInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    editSummit() {
      editRoles(this.editParams).then(res => {
        this.$message.success('修改成功')
        this.$emit('editDone', res.data)
      }).catch(error => {
        this.$message({ message: error, type: 'error'})
      })
    },
    cancelClick() {
      this.$emit('cancelClick')
    }
  },
  watch: {
    editInfo() {
      this.editParams = {...this.editInfo}//editInfo指向row，解构赋值=深拷贝
    }
  }
}
</script>

<style scoped>
</style>
