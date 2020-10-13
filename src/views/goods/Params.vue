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
    <el-table
      :data="AttrList"
      border
      v-if="AttrList.length > 0"
      style="width: 100%">
      <el-table-column type="expand"></el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="attr_name" label="参数名称"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editAttr(scope.row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteAtrr(scope.row)">删除</el-button>
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
    <el-form
      width="100%"
      ref="attrForm"
      :model="addAttrInfo">
      <el-form-item
        prop="attr_name"
        label="请输入参数名称："
        :rules="[
          { required: true, mini: 1, message: '请输入参数'}
        ]">
        <el-input v-model="addAttrInfo.attr_name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addAttrVisible = false">取 消</el-button>
      <el-button type="primary" @click="addAttr">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import { getGoodsCate, getGoodsAttributes, addGoodsAttr } from 'network/goods'

export default {
  name: 'Params',
  data() {
    return {
      selectedKeys: [],
      parentCateList: [],
      quryInfoId: '',
      activeSel: 'many',
      AttrList: [],
      sel: 'many',
      addAttrVisible: false,
      addAttrInfo: {
        attr_name: '',
        attr_sel: '',
        attr_vals: ''
      },
      shitEvent: []
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
        this.AttrList = res.data
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
            this.AttrList.unshift(res.data)
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
    editAttr(attr) {
      console.log(attr)
    },
    deleteAtrr(attr) {
      console.log(attr)
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
</style>
