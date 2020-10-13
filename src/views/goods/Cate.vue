<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品分类</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <!-- 添加分类按钮   -->
    <el-button type="primary" @click="addCate()">添加分类</el-button>
    <tree-table
      class="tree_table"
      :data="cateList"
      :expand-type="false"
      :selection-type='false'
      border
      show-index
      index-text="#"
      :columns="columns">
      <!-- 是否有效 -->
      <template slot="isOk" slot-scope="scope">
        <i class="el-icon-success" style="color: lightgreen;" v-if="scope.row.cat_deleted === false"></i>
        <i class="el-icon-error" style="color: red;" v-else></i>
      </template>
      <!-- 排序 -->
      <template slot="order" slot-scope="scope">
        <el-tag size="mini" v-if="scope.row.cat_level===0">一级</el-tag>
        <el-tag size="mini" type="success" v-else-if="scope.row.cat_level===1">二级</el-tag>
        <el-tag size="mini" type="warning" v-else>三级</el-tag>
      </template>
      <!-- 操作 -->
      <template slot="operate" slot-scope="">
        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
      </template>
    </tree-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="getCateParams.pagenum"
      :page-sizes="[5, 10, 30]"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="getCateParams.pagesize"
      :total="totalCate">
    </el-pagination>
  </el-card>

  <!-- 添加分类对话框 -->
  <el-dialog
    title="添加分类"
    destroy-on-close
    @closed="addCateClose"
    :visible.sync="addCateVisible"
    width="30%">
    <el-form :model="addCateInfo" ref="addCate" label-width="100px" class="demo-ruleForm">
      <el-form-item
        label="分类名称"
        prop="cat_name"
        :rules="[
          { required: true, message: '类名不能为空'}
        ]">
        <el-input v-model="addCateInfo.cat_name"></el-input>
      </el-form-item>
      <el-form-item
        label="父级分类">
        <el-cascader
          v-model="selectedKeys"
          :options="parentCateList"
          clearable
          :props="{
            label:'cat_name',
            checkStrictly: true,
            children: 'children',
            value:'cat_id' }"
          @change="handleChange"></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addNewCate()">提交</el-button>
        <el-button @click="addCateVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
</el-dialog>
</div>
</template>

<script>
import { getGoodsCate, addGoodsCate } from 'network/goods'

export default {
  name: 'Cate',
  data() {
    return {
      cateList: [],
      totalCate: 0,
      getCateParams: {
        pagenum: 1,
        pagesize: 5
      },
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'isOk'
        },
        {
          label: '排序',
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          type: 'template',
          template: 'operate',
          width: '200px'
        }
      ],
      addCateVisible: false,
      addCateInfo: {
        cat_name: '',
        cat_level: 0,
        cat_pid: 0
      },
      parentCateList: [],
      selectedKeys: [] // 包含选中父子id
    }
  },
  created() {
    this.getCate()
    this.getTotal()
  },
  methods: {
    getTotal() {
      getGoodsCate().then(res => {
        this.totalCate = res.data.length
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    getCate() {
      getGoodsCate(this.getCateParams).then(res => {
        this.cateList = res.data.result
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    getParentCate() {
      getGoodsCate({type: 2}).then(res => {
        console.log(res.data)
        this.parentCateList = res.data
        console.log(this.parentCateList)
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    addCate() {
      this.getParentCate()
      this.addCateVisible = true
    },
    handleSizeChange(pagesize) {
      this.getCateParams.pagesize = pagesize
      this.getCate()
    },
    handleCurrentChange(currentPage) {
      this.getCateParams.pagenum = currentPage
      this.getCate()
    },
    handleChange() {
      if (this.selectedKeys.length > 0) {
        this.addCateInfo.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        this.addCateInfo.cat_level = this.selectedKeys.length
      } else {
        this.addCateInfo.cat_pid = 0
        this.addCateInfo.cat_level = 0
      }
    },
    addNewCate() {
      addGoodsCate(this.addCateInfo).then(res => {
        console.log(res.data)
        this.$message({
          type: 'success',
          message: '新分类添加成功'
        })
        this.getCate()
        this.addCateVisible = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    addCateClose() {
      this.addCateVisible = false
      this.$refs.addCate.resetFields()
      this.selectedKeys = []
      this.addCateInfo.cat_name = ''
    },
    addFormReset() {
      this.$refs.attrForm.resetFields()
    }
  }
}
</script>

<style scoped>
.el-pagination {
  margin-top: 10px;
  text-align: center;
}
.tree_table {
  margin-top: 20px;
}
.el-cascader {
  width: 100%;
}
</style>
