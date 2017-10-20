<template>
	<div class="tmpl">

		<!-- 侧边栏 -->
		<el-col :span="leftcol">
			<div class="layout menu">
				<img src="../../../statics/imgs/logo.png" alt="">

				<el-menu default-active="5-1" class="el-menu-vertical-demo" :collapse="isCollapse">
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-message"></i>
							<span slot="title">学员问题汇总</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="1-1">内容管理</el-menu-item>
							<el-menu-item index="1-2">类别管理</el-menu-item>
							<el-menu-item index="1-3">评论管理</el-menu-item>
						</el-menu-item-group>						
					</el-submenu>
						<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-message"></i>
							<span slot="title">前端常用功能</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="2-1">内容管理</el-menu-item>
							<el-menu-item index="2-2">类别管理</el-menu-item>
							<el-menu-item index="2-3">评论管理</el-menu-item>
						</el-menu-item-group>						
					</el-submenu>
					<el-submenu index="3">
						<template slot="title">
							<i class="el-icon-message"></i>
							<span slot="title">重难点专区</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="3-1">内容管理</el-menu-item>
							<el-menu-item index="3-2">类别管理</el-menu-item>
							<el-menu-item index="3-3">评论管理</el-menu-item>
						</el-menu-item-group>						
					</el-submenu>
						<el-submenu index="4">
						<template slot="title">
							<i class="el-icon-message"></i>
							<span slot="title">资源下载</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="4-1">内容管理</el-menu-item>
							<el-menu-item index="4-2">类别管理</el-menu-item>
							<el-menu-item index="4-3">评论管理</el-menu-item>
						</el-menu-item-group>						
					</el-submenu>
					<el-submenu index="5">
						<template slot="title">
							<i class="el-icon-message"></i>
							<span slot="title">购物商城</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="5-1">
								<router-link to="goodslist">内容管理</router-link>
							</el-menu-item>
							<el-menu-item index="5-2">类别管理</el-menu-item>
							<el-menu-item index="5-3">评论管理</el-menu-item>
						</el-menu-item-group>						
					</el-submenu>
					<el-submenu index="6">
						<template slot="title">
							<i class="el-icon-message"></i>
							<span slot="title">订单管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="6-1">内容管理</el-menu-item>
							<el-menu-item index="6-2">类别管理</el-menu-item>
							<el-menu-item index="6-3">评论管理</el-menu-item>
						</el-menu-item-group>						
					</el-submenu>
						
					
				</el-menu>

			</div>
		</el-col>

		<el-col :span="rightcol">
			<!-- 顶部功能栏 -->
			<el-row>
				<div class="topbg">
					<el-col :span="1">
						<div class="topbg"  @click="showMeun">
							<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
								<el-radio-button :label="!isCollapse"><i class="el-icon-menu"> </i></el-radio-button>
							</el-radio-group>
						</div>
					</el-col>
					<el-col :span="5" :offset="17">
						你好，admin
						<el-dropdown split-button type="primary">
							更多
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>修改密码</el-dropdown-item>
								<el-dropdown-item>注销登录</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</el-col>
				</div>
			</el-row>
			<!-- 内容展示区域 -->
			<el-row>
				<el-col :span="24">
					<!-- 利用vue-router进行填充 -->
					<router-view></router-view>
				</el-col>
			</el-row>
		</el-col>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				leftcol: 4,
				rightcol: 20,
				isCollapse:false
			}
		},
		methods: {
			showMeun(){
				if(!this.isCollapse){
					this.leftcol = 1;
					this.rightcol = 23;
				}else{
					this.leftcol = 4;
					this.rightcol = 20;
				}
			}
			
		}
	}
</script>
<style scoped>
.el-icon-menu{
	color: #686f7f;
}
.layout{
	height: 649px;
}
.el-row{
	background: #fff;
}
</style>