<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品分类</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <el-alert
      title="注意，只允许为第三级分类设置相关参数"
      type="warning"
      show-icon>
    </el-alert>
    <!-- 选择分类 -->
    <p class="cate-cascader">
      选择商品分类：
      <el-cascader
          v-model="selectedKeys"
          :options="parentCateList"
          clearable
          :props="{
            label:'cat_name',
            children: 'children',
            value:'cat_id' }"
          @change="handleChange"></el-cascader>
    </p>
    <!-- 参数展示 -->
    <el-tabs v-model="activeSel" @tab-click="paramTypeClick">
      <el-tab-pane label="动态参数" name="many">
        <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addAttrVisible = true">添加参数</el-button>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="only">
        <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addAttrVisible = true">添加属性</el-button>
      </el-tab-pane>
    </el-tabs>
    <!-- 参数列表 -->
    <el-table
      :data="attrList"
      border
      @expand-change="arrayAttrvals"
      v-if="attrList.length > 0"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-tag
           closable
           v-for="(item, index) in scope.row.attr_vals"
           @close="deleteVals(scope.row, index)"
           :key="index">
           {{item}}
          </el-tag>
          <el-input
            :key="scope.row.attr_id"
            class="input-new-tag"
            v-if="inputValVisible === scope.row.attr_id"
            v-model="newVal"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(scope.attr.row)"
            @blur="handleInputConfirm(scope.row)"
          >
          </el-input>
          <el-button
            v-else class="button-new-tag"
            size="small"
            @click="showValInput(scope.row.attr_id)">+ New Tag</el-button>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="attr_name" label="参数名称"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click()="editAttrShow(scope.row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteAtrrShow(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <!-- 添加属性 -->
  <el-dialog
    :title="addAttrtitle"
    :visible.sync="addAttrVisible"
    @close="addFormReset"
    width="40%">
    <!-- 当form只有一行时按回车键会自动提交表单  @submit.native.prevent解决-->
    <el-form
      width="100%"
      ref="attrForm"
      :model="addAttrInfo"
      @submit.native.prevent>
      <el-form-item
        prop="attr_name"
        label="请输入参数名称："
        :rules="[
          { required: true, mini: 1, message: '请输入参数'}
        ]">
        <el-input
          v-model="addAttrInfo.attr_name"
          @keyup.enter.native.prevent = 'addAttr'
          ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addAttrVisible = false">取 消</el-button>
      <el-button type="primary" @click="addAttr">确 定</el-button>
    </span>
  </el-dialog>
  <!-- 修改属性 -->
  <el-dialog
    title="修改参数"
    :visible.sync="editAttrVisible"
    @close="editFormReset"
    width="40%">
    <!-- 当form只有一行时按回车键会自动提交表单  @submit.native.prevent解决-->
    <el-form
      width="100%"
      ref="editForm"
      :model="editAttrInfo"
      @submit.native.prevent>
      <el-form-item
        label="请输入参数名称："
        prop="attr_name"
        :rules="[
          { required: true, message: '请修改输入参数'}
        ]">
        <el-input
          v-model="editAttrInfo.attr_name"
          @keyup.enter.native.prevent = 'editAttr'
          ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addAttrVisible = false">取 消</el-button>
      <el-button type="primary" @click="editAttr">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import { getGoodsCate, getGoodsAttributes, addGoodsAttr, editGoodAttr, deleteGoodAttr } from 'network/goods'

export default {
  name: 'Params',
  data() {
    return {
      selectedKeys: [],
      parentCateList: [],
      quryInfoId: '',
      activeSel: 'many',
      attrList: [],
      sel: 'many',
      addAttrVisible: false,
      addAttrInfo: {
        attr_name: '',
        attr_sel: '',
        attr_vals: ''
      },
      shitEvent: [],
      editAttrInfo: {
        id: '',
        attrId: '',
        attr_name: '',
        attr_sel: '',
        attr_vals: ''
      },
      attrRow: {},
      editAttrVisible: false,
      inputValVisible: 0,
      newVal: ''
    }
  },
  created() {
    this.getCategories()
  },
  computed: {
    isBtnDisabled() {
      if (this.selectedKeys.length !== 3) {
        return true
      } else {
        return false
      }
    },
    addAttrtitle() {
      if (this.sel === 'many') {
        return '添加动态参数'
      } else {
        return '添加静态参数'
      }
    }
  },
  methods: {
    getCategories() {
      getGoodsCate({type: 3}).then(res => {
        this.parentCateList = res.data
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    getGoodsAttrs() {
      getGoodsAttributes(this.quryInfoId, this.sel).then(res => {
        this.attrList = res.data
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    handleChange(value) {
      if (value.length === 3) {
        this.quryInfoId = value[value.length - 1]
        this.getGoodsAttrs()
      }
      console.log(value)
    },
    paramTypeClick(tab) {
      if (this.selectedKeys.length !== 3) {
        this.$message({
          type: 'warning',
          message: '请选择分类！'
        })
      } else {
        this.sel = tab.name
        this.getGoodsAttrs()
      }
    },
    addFormReset() {
      this.$refs.attrForm.resetFields()
    },
    addAttr() {
      this.$refs.attrForm.validate((valid) => {
        console.log(valid)
        if (valid) {
          this.addAttrInfo.attr_sel = this.sel
          addGoodsAttr(this.quryInfoId, this.addAttrInfo).then(res => {
            console.log(res.data)
            this.attrList.unshift(res.data)
            this.addAttrVisible = false
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          }).catch(error => {
            this.$message({
              type: 'error',
              message: error
            })
          })
        } else {
          this.$message({
            type: 'error',
            message: '请输入参数'
          })
          return false
        }
      })
    },
    editAttrShow(attr) {
      this.editAttrInfo = { ...attr }
      this.attrRow = attr
      this.editAttrInfo.id = this.quryInfoId
      this.editAttrVisible = true
    },
    editAttr() {
      this.$refs.editForm.validate((valid) => {
        console.log(valid)
        if (valid) {
          editGoodAttr(this.editAttrInfo).then(res => {
            console.log(res.data)
            this.attrRow.attr_name = res.data.attr_name
            this.editAttrVisible = false
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          }).catch(error => {
            this.$message({
              type: 'error',
              message: error
            })
          })
        } else {
          this.$message({
            type: 'error',
            message: '请输入参数'
          })
          return false
        }
      })
    },
    deleteAtrrShow(scope) {
      this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGoodAttr(this.quryInfoId, scope.row.attr_id).then(() => {
          this.$message.success('删除成功')
          this.attrList.splice(scope.$index, 1)
        }).catch(error => {
          this.$message.error(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editFormReset() {
      this.$refs.editForm.resetFields()
    },
    arrayAttrvals(row) {
      if (typeof (row.attr_vals) === 'string') {
        row.attr_vals = row.attr_vals ? row.attr_vals.split(' ') : []
      }
    },
    showValInput(id) {
      this.inputValVisible = id
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm(row) {
      const newVal = this.newVal
      // const vals = row.attr_vals
      if (newVal) {
        this.handleValsChange(row, newVal).then(_ => {
          row.attr_vals.push(newVal)
        }).catch(error => {
          this.$message({
            type: 'error',
            message: error
          })
        })
      }
      this.inputValVisible = false
      this.newVal = ''
    },
    deleteVals(row, index) {
      const newRow = { ...row }
      newRow.attr_vals.splice(index, 1)
      this.handleValsChange(newRow).then(_ => {
        row.attr_vals.splice(index, 1)
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    handleValsChange(row, newVal) {
      this.editAttrInfo = { ...row }
      if (row.attr_vals.length > 0) {
        this.editAttrInfo.attr_vals = row.attr_vals.join(' ') + (newVal ? ' ' + newVal : '')
      } else {
        this.editAttrInfo.attr_vals = newVal
      }
      console.log(this.editAttrInfo.attr_vals)
      this.editAttrInfo.id = this.quryInfoId

      return editGoodAttr(this.editAttrInfo)
    }
  }
}
</script>

<style scoped>
.cate-cascader {
  margin-top: 20px;
  font-weight: 700;
}
.el-tabs {
  margin-top: 20px;
}
.el-tag {
  margin: 5px;
}
</style>
