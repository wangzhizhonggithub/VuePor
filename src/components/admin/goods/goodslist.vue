<template>
	<div class="tmpl">
		<!-- 面包屑 -->
		<el-row>
			<el-col :span="24">
				<div class="abread bt-line">
					<el-breadcrumb separator="/">
						<el-breadcrumb-item>购物商城</el-breadcrumb-item>
						<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
						<el-breadcrumb-item>内容管理</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
			</el-col>
		</el-row>
		<!--内容-->
		
		<el-row>
			<div class="operation">
			<!--功能区-->
			<div class="goodInput">
				<el-row>
					<el-col :span="6">
						<el-button icon="plus">
						<router-link to="goodsAdd">新增</router-link>
						</el-button>
						<el-button icon="check">全选</el-button>
						<el-button icon="delete">删除</el-button>
					</el-col>
					<el-col :span="5" :offset="13">
						<el-input placeholder="请输入搜索内容" icon="search" v-model="input2" :on-icon-click="handleIconClick">
						</el-input>
					</el-col>
				</el-row>
			</div>
			<!--内容显示区-->
			<el-row>
				<el-col :span="24">
				<div class="tableContern">
					<el-table ref="multipleTable" height="440" :data="list" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column label="标题" show-overflow-tooltip>
							<template scope="scope">
							<router-link v-bind="{to:'/admin/goodslist/'+scope.row.id}">
                   {{scope.row.title}}
              </router-link>
							</template>
						</el-table-column>
						<el-table-column label="所属类别" width="150">
							<template scope="scope">
								{{ scope.row.categoryname }}
							</template>
						</el-table-column>
						<el-table-column label="库存" width="120">
							<template scope="scope">
								{{ scope.row.stock_quantity }}
							</template>
						</el-table-column>
						<el-table-column label="市场价" width="100">
							<template scope="scope">
								{{ scope.row.market_price }}
							</template>
						</el-table-column>
						<el-table-column label="销售价" width="100">
							<template scope="scope">
								{{ scope.row.sell_price }}
							</template>
						</el-table-column>
							<el-table-column label="属性" width="120">
							<template scope="scope">
								<el-tooltip class="item" effect="dark" v-bind="{content:(scope.row.is_slide==1?'进入轮播图':'不进入轮播图')}" placement="bottom">
                     <i v-bind="{class:'el-icon-picture ls '+(scope.row.is_slide==1?'imgactive':'')}"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" v-bind="{content:(scope.row.is_top==1?'置顶':'不置顶')}" placement="bottom">
                      <i v-bind="{class:'el-icon-upload ls '+(scope.row.is_top==1?'imgactive':'')}"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" v-bind="{content:(scope.row.is_hot==1?'热门':'非热门')}" placement="bottom">
                      <i v-bind="{class:'el-icon-star-on ls '+(scope.row.is_hot==1?'imgactive':'')}"></i>
                </el-tooltip> 
							</template>
						</el-table-column>
						<el-table-column label="操作" width="88">
							<template scope="scope">
								<router-link v-bind="{to:'/admin/goodslist/'+scope.row.id}">
                  <el-button type="success" size="mini">修改</el-button>
                  </router-link>
							</template>
						</el-table-column>
					</el-table>
					</div>
			</el-col>
	</el-row>
<!--翻页功能区-->
<el-row>
    <el-col :span="12">
        <div class="pageTool">
						<el-pagination 
						@size-change="handleSizeChange" 
						@current-change="handleCurrentChange"
						:current-page="pageIndex" 
						:page-sizes="pageSizes" 
						:page-size="pageSize" 
						layout="total, sizes, prev, pager, next, jumper" 
						:total="totalcount">
            </el-pagination>
        </div>
    </el-col>
</el-row>
</div>
</el-row>
</div>
</template>

<script>
	export default {
		data() {
			return {
				input2: '',
				list: [],
				totalcount: 0,
				pageSize: 10,
				pageIndex: 1,
				pageSizes: [10, 20, 30, 40],
				ids:''
			}
		},
		created() {
			//			调用获取数据的方法
			this.getList();
		},
		methods: {
			handleSelectionChange(val) {
				// 获取当前选中的选项数据
				this.ids = "";
				// 获取选中的选项的ID并且拼接
				for(var i =0;i<val.length;i++){
					if(i==val.length-1){
						this.ids += val[i].id;

					}else{
						this.ids += val[i].id + ',';
					}
				}
				// console.log(this.ids);
			
			},
			handleIconClick() {
				//			调用获取数据的方法
				this.getList();
			},
			handleSizeChange(val) {
				//      console.log(`每页 ${val} 条`);
				this.pageSize = val;
				//			调用获取数据的方法
				this.getList();
			},
			handleCurrentChange(val) {
				//      console.log(`当前页: ${val}`);
				this.pageIndex = val;
				//			调用获取数据的方法
				this.getList();
			},
			getList() {
				//				使用axios去发出具体的URL的请求获取到数据后捆绑到表格中
				var url = '/admin/goods/getlist?pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize + '&searchvalue=' + this.input2;
				this.$http.get(url).then(res => {
					if (res.data.status == 1) {
						this.$message.error(res.data.message);
						return;
					}
					//					获取列表数据
					this.list = res.data.message;
					//					获取总条数
					this.totalcount = res.data.totalcount;
					//					获取每页显示的数量
					this.pageSize = res.data.pageSize;
					//					获取当前页码
					this.pageIndex = res.data.pageIndex;
				});
			}
		}
	}
</script>
<style scoped>
	.abread {
		background: #fff;
		margin-bottom: 10px;
	}
	.goodInput {
		padding: 10px;
		border: 1px solid #f0f0f0;
		border-radius: 10px;
	}
	.pageTool {
		padding: 10px;
	}
	.tableContern{
		padding:10px;
	}
</style>