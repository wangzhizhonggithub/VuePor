<template>
    <div class="arttmpl">
        <el-row>
            <el-col :span="24">
                <div class="abread bt-line">
                    <!-- 使用elementUI中的面包屑导航组件完成 -->
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-col>
        </el-row>
        <div class="operation">
            <el-row>
                <el-col :span="5">
                    <!-- 新增，删除，全选按钮 -->
                    <el-button>全选</el-button>
                    <el-button>新增</el-button>
                    <el-button>删除</el-button>
                </el-col>
                <el-col :span="3" :offset="16">
                    <!-- 搜索框 -->
                    <el-input placeholder="请输入搜索条件" icon="search" v-model="searchValue" :on-icon-click="handleIconClick">
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <el-row>
            <el-col :span="24">
                <el-table :data="list" style="width: 100%" :row-class-name="tableRowClassName" @selection-change="getRows" height="440">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="title" label="标题">
                        <template scope="scope">
                         <router-link v-bind="{to:'/admin/goodslist/'+scope.row.id}">
                         {{scope.row.title}}
                          </router-link>
                    </template>
                    </el-table-column>
                    <el-table-column prop="categoryname" label="类别" width="100">
                        </el-table-column>
                    <el-table-column label="发布人/发布时间"  width="240">
                        <template scope="scope">
                            {{scope.row.user_name }} / {{scope.row.add_time | datefmt}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="属性" width="120">
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
                    <el-table-column label="操作" width="80">
                         <template scope="scope">
                         <router-link v-bind="{to:'/admin/goodslist/'+scope.row.id}">
                         <el-button type="success" size="mini">修改</el-button>
                          </router-link>
                          </template>
                    </el-table-column>
            </el-table>
        </el-col>
        </el-row>
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
</template>

<script>
    export default {
        data() {
            return {
                // 表格中的每行数据来源于list，而这个list将来是通过getlist()方法请求后台api接口获取到的
                list: [],
                ids:'',
                 // 搜索框的绑定属性
                searchValue:'',
                totalcount:0,
                pageSize:10,
                pageIndex:1,
                pageSizes:[10,20,30,40]
            }
        },
        created() {
            // 获取到列表数据
            this.getList();
        },
        methods: {
            // 用axios去发出具体的url的请求获取到数据后绑定到表格中
            getList() {
                // 1.0 获取url
                var url = '/admin/goods/getlist?pageIndex='+this.pageIndex+'&pageSize='+this.pageSize+'&searchvalue='+this.searchValue;
                this.$http.get(url).then(res => {
                    // 判断服务器返回的状态status
                    if (res.data.status == 1) {
                        this.$message.error(res.data.message);
                        return;
                    }
                    // 正常逻辑的处理
                    this.list = res.data.message;
                    // 获取总条数
                    this.totalcount = res.data.totalcount;
                    // 获取每页显示的条数
                    this.pageSize = res.data.pageSize;
                    // 获取当前页码
                    this.pageIndex = res.data.pageIndex;
                });
            },
            // 控制表格的隔行变色
            tableRowClassName(row, index) {
                //    控制奇数和偶数行的颜色
                if (index % 2 == 0) {
                    return 'info-row';
                } else {
                    return 'positive-row';
                }
            },
             // 获取点击的id值
            getRows(rows){           
                this.ids = "";
                for(var i =0;i<rows.length;i++){
                    if(i==rows.length-1){
                        this.ids += rows[i].id;
                    }else{
                         // 拼接要删除的数据id
                    this.ids +=rows[i].id + ",";
                    }
                   
                }
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
        }
    }
</script>
<style scoped>
	.pageTool {
		padding: 10px;
	}
</style>