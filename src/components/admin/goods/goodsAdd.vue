<template>
  <div class="tmpl">
		<el-row>
			<el-col :span="24">
				<div class="abread bt-line">
					<el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/goodslist' }">放回上一层</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/goodslist' }">购物商城</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>新增数据</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
			</el-col>
		</el-row>
  新增页面
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {}
  }
</script>
<style scoped>

</style>