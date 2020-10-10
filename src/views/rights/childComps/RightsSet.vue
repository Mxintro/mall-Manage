<template>
  <div>
    <el-dialog
    title="权限分配"
    :visible="dialogVisible"
    @update:visible = "cancelClick"
    width="40%">
    <el-tree
      :data="rightsTree"
      ref="rightsTree"
      default-expand-all
      show-checkbox
      node-key="id"
      :default-checked-keys="checkKeys"
      :props="defaultProps">
    </el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelClick">取 消</el-button>
      <el-button type="primary" @click="setRights">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRights, setRoleRights } from 'network/rights'

export default {
  name: 'RightsSet',
  data() {
    return {
      dialogVisible: false,
      rightsTree: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  props: {
    setRightsVisible: {
      type: Boolean,
      defualt: false
    },
    checkKeys: {
      type: Array,
      defualt() {
        return []
      }
    },
    roleId: {
      type: Number,
      defualt: 0
    }
  },
  created() {
    this.getRightsTree()
  },
  methods: {
    setRights() {
      let rightKeys = this.$refs.rightsTree.getCheckedKeys()
      const halfCheck = this.$refs.rightsTree.getHalfCheckedKeys()
      // 要转换成字符串
      rightKeys = rightKeys.concat(halfCheck).join(',')
      setRoleRights(this.roleId, rightKeys).then(() => {
        this.$message.success('权限分配成功')
        this.$emit('roleRightsSet')
      }).catch(error => {
        this.$message({ message: error, type: 'error'})
      })
    },
    cancelClick() {
      this.$emit('cancelClick')
    },
    getRightsTree() {
      getRights('tree').then(res => {
        this.rightsTree = res.data
      })
    }
  },
  watch: {
    setRightsVisible() {
      this.dialogVisible = this.setRightsVisible
    }
  }
}
</script>

<style scoped>
</style>
