<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <!-- 提示 -->
    <el-alert title="添加商品信息" type="info" center show-icon></el-alert>
    <!-- 步骤条  -->
    <el-steps :active="activeStep - 0" align-center finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <!-- 侧边栏 -->
    <el-form
      width="100%"
      ref="addGoodForm"
      :rules="addGoodRule"
      label-position="top"
      :model="addGoodInfo">
      <el-tabs tab-position="left" @tab-click="tabClick" :before-leave="stepConfirm">
        <el-tab-pane label="基本信息">
          <el-form-item prop="goods_name" label="商品名称:">
            <el-input v-model="addGoodInfo.goods_name"></el-input>
          </el-form-item>
          <el-form-item prop="goods_price" label="价格:">
            <el-input v-model="addGoodInfo.goods_price"></el-input>
          </el-form-item>
          <el-form-item prop="goods_number" label="数量:">
            <el-input v-model="addGoodInfo.goods_number"></el-input>
          </el-form-item>
          <el-form-item prop="goods_weight" label="重量:">
            <el-input v-model="addGoodInfo.goods_weight"></el-input>
          </el-form-item>
          <el-form-item prop="goods_cat" label="选择分类:">
            <el-cascader
              v-model="addGoodInfo.goods_cat"
              :options="parentCateList"
              clearable
              :props="{
                label:'cat_name',
                children: 'children',
                value:'cat_id' }"
              @change="handleChange"></el-cascader>
          </el-form-item>
          <!-- <el-form-item prop="goods_introduce" label="介绍:">
            <el-input v-model="addGoodInfo.goods_introduce"></el-input>
          </el-form-item> -->
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <el-form-item
            v-for="(many, index1) in manyAttrList"
            :label="many.attr_name"
            :key="index1">
            <el-checkbox-group v-model="many.attr_vals" @change="cheackGroupChange">
              <el-checkbox
                v-for="(val, i) in many.attr_vals"
                :key="i"
                :label="val" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <el-form-item
            v-for="(only, index2) in onlyAttrList"
            :label="only.attr_name"
            :key="index2">
            <el-input v-model="only.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片">商品图片
          <el-form-item prop="pics" label="添加图片:">
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</div>
</template>

<script>
import { getGoodsCate, getGoodsAttributes } from 'network/goods'

export default {
  name: 'AddGoods',
  data() {
    return {
      activeStep: 0,
      addGoodInfo: {
        goods_name: '',
        goods_cat: [],
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: {},
        attrs: []
      },
      quryInfoId: '',
      sel: 'many', // 静态参数
      gotAttr: false,
      onlyAttrList: [],
      manyAttrList: [],
      checkboxGroup: [],
      parentCateList: [],
      addGoodRule: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getCategories()
  },
  methods: {
    tabClick(tab) {
      const index = tab.index
      this.activeStep = index
    },
    getCategories() {
      getGoodsCate().then(res => {
        this.parentCateList = res.data
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    getGoodsAttrs(list) {
      getGoodsAttributes(this.quryInfoId, this.sel).then(res => {
        this[list] = res.data
        this[list].forEach(item => {
          item.attr_vals = item.attr_vals.split(' ')
        })
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
        this.gotAttr = false
      } else {
        this.addGoodInfo.goods_cat = []
      }
    },
    stepConfirm(activeName, oldActiveName) {
      if (this.addGoodInfo.goods_cat.length !== 3 && oldActiveName === '0') {
        this.$message({type: 'error', message: '请选择商品分类'})
        return false
      }
      if (activeName === '1' && !this.gotAttr) {
        this.sel = 'many'
        this.manyAttrList = this.getGoodsAttrs('manyAttrList')
        this.addGoodInfo.attrs = this.manyAttrList
        console.log(this.addGoodInfo.attrs)
        this.sel = 'only'
        this.onlyAttrList = this.getGoodsAttrs('onlyAttrList')
        this.gotAttr = true
      }
    },
    cheackGroupChange(value) {
      console.log(this.manyAttrList)
    }
  }
}
</script>

<style scoped>
.el-steps {
  margin: 16px 0;
}
.el-step .el-step__title {
  font-size: 13px;
}
.el-checkbox {
  margin:5px 0 0 10px;
}
</style>
