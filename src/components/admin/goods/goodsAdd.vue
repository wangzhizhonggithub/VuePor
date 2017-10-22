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
    <!--内容-->
    <el-row class="tableAdd">
        <el-col :span="24">
             <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" height="440px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="内容标题" prop="title">
                             <el-input v-model="form.title"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="副标题" prop="title">
                            <el-input v-model="form.title"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="所属类别" prop="category_id">
                             <el-select v-model="form.category_id" placeholder="请选择">
                                    <el-option v-for="(cate,index) in categorylist" :key="index" :label="cate.title" :value="cate.category_id">
                                         <span v-for="count in (cate.class_layer-1)">&nbsp;&nbsp;</span>
                                         <span v-if="cate.class_layer>1">|-</span>
                                         <span v-text="cate.title"></span>
                                    </el-option>
                             </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" :offset="4">
                        <el-form-item label="是否发布">
                            <el-switch v-model="form.status" on-text="是" off-text="否"></el-switch>
                        </el-form-item>      
                    </el-col>
                    <el-col :span="8" :offset="2">
                        <el-form-item label="推荐类型">
                            <el-switch v-model="form.is_slide" on-text="取消轮播" off-text="轮播图" :width="80"></el-switch>
                            <el-switch v-model="form.is_top" on-text="不置顶" off-text="置顶" :width="70"></el-switch>
                            <el-switch v-model="form.is_hot" on-text="不推荐" off-text="推荐" :width="70"></el-switch>
                        </el-form-item>      
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                            <el-form-item label="上传封面" >
                                    <el-upload
                                    class="upload-demo"
                                    action="http://157.122.54.189:9095/admin/article/uploadimg"
                                    :file-list="form.imgList"
                                    :on-success="imgUploaded"
                                    list-type="picture">
                                    <el-button size="small" type="primary">点击上传</el-button>&nbsp;&nbsp;
                                    <span slot="tip" class="el-upload__tip">只能上传图片文件</span>
                                  </el-upload>
                                </el-form-item>
                    </el-col>
                    <el-col :span="12">
                            <el-form-item label="图片相册" >
                                    <el-upload
                                    class="upload-demo"
                                    action="http://157.122.54.189:9095/admin/article/uploadfile"                               
                                    :file-list="form.fileList"
                                    :on-success="fileUploaded"
                                    list-type="picture">
                                    <el-button size="small" type="primary">点击上传</el-button>&nbsp;&nbsp;
                                    <span slot="tip" class="el-upload__tip">只能上传图片文件</span>
                                  </el-upload>
                                </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="商品货号" prop="goods_no">
                            <el-input v-model="form.goods_no"></el-input>
                        </el-form-item> 
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="库存数量" prop="stock_quantity">
                            <el-input v-model="form.stock_quantity"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="市场价格" prop="market_price">
                            <el-input v-model="form.market_price"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="销售价格" prop="sell_price">
                            <el-input v-model="form.sell_price"></el-input>
                        </el-form-item>
                    </el-col>


                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="内容摘要" > 
                        <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="form.textarea">
                      </el-input>
                    </el-form-item> 
                </el-col>  
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="详细描述" >
                            <quill-editor v-model="form.content"></quill-editor>
                        </el-form-item>    
                    </el-col>  
                </el-row>
                <el-row>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>  

                </el-row>

             </el-form>   
        </el-col>    
    </el-row>
  </div>
</template>

<script>
    // 导入富文本框编辑器组件对象
    import {
        quillEditor
    } from 'vue-quill-editor'

    export default {
        // 注册私有组件
        components: {
            quillEditor
        },
        data() {
            var checkNumber = (rules, value, callback) => {
                // 非空验证
                if (!value) {
                    return callback(new Error("内容不能为空"));
                };
                // 非数字验证
                if (isNan(value)) {
                    return callback(new Error("请输入数值"));
                } else {
                    callback();
                }
            }
            return {
                // 当前商品分类
                categorylist: [],
                // form表单元素数据
                form: {
                    title: '',
                    sub_title: '',
                    category_id: '',
                    status: true,
                    is_slide: true,
                    is_top: true,
                    is_hot: true,
                    goods_no: '',
                    stock_quantity: 0,
                    market_price: 0,
                    sell_price: 0,
                    content: '',
                    imgList: [], // 商品封面图片数据对象
                    fileList: [] //商品相册图片数组
                },
                // 设置文本框的验证规则
                rules: {
                    // required：文本框不能为空 message:失去焦点时验证失败的提示信息
                    title: [{
                        required: true,
                        message: '请输入标题名称',
                        trigger: 'blur'
                    }],
                    goods_no: [{
                        required: true,
                        message: '请输入商品编号',
                        trigger: 'blur'
                    }],
                    category_id: [{
                        required: true,
                        message: '请选择所属类别',
                        trigger: 'blur'
                    }],
                    // validator：设置自定义验证方法
                    stock_quantity: [{
                        validator: checkNumber,
                        trigger: 'blur'
                    }],
                    market_price: [{
                        validator: checkNumber,
                        trigger: 'blur'
                    }],
                    sell_price: [{
                        validator: checkNumber,
                        trigger: 'blur'
                    }],
                }
            }
        },
        created() {
            // 在页面加载完之后调用此方法
            this.getCatelist();
            // console.log(this.categorylist);
        },
        methods: {
            // 获取商品分类列表
            getCatelist() {
                this.$http.get('/admin/category/getlist/goods')
                    .then(res => {
                        if (res.data.status == 1) {
                            return res.data.massage;
                        }
                        // 获取商品列表分类
                        this.categorylist = res.data.message;
                        // console.log(this.categorylist);
                    })
            },
            imgUploaded() {

            },
            fileUploaded() {

            },
            submitForm() {

            },
            resetForm() {

            }

        }
    }
</script>
<style scoped>
    .tableAdd {
        margin: 10px;
        padding: 10px;
        border: 1px solid #e8e8e8;
        border-radius: 10px;
    }
    
    .quill-editor p {
        height: 100px;
    }
</style>