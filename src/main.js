// 导入vue
import Vue from 'vue';
// 导入路由插件
import vueRouter from 'vue-router';

// 导入Add组件
import App from './App.vue';




// 导入login.vue组件对象
import login from './components/admin/account/login.vue';
//导入后天管理系统的整体布局组件
import layout from './components/admin/layout.vue';
// 导入goodlist.vue组件
import goodslist from './components/admin/goods/goodslist.vue';
// 导入goodlist02.vue组件
import goodslist02 from './components/admin/goods/goodslist02.vue';
// 导入goodsAdd.vue组件
import goodsAdd from './components/admin/goods/goodsAdd.vue';


// 定义路由规则
var router = new vueRouter({
    routes: [
        // 配置默认路由，当页面从根目录打开时显示的页面
        { name: 'default', path: '/', redirect: '/admin' },
        { name: 'login', path: '/login', component: login },
        {
            name: 'layout',
            path: '/admin',
            component: layout,
            // layout的子路由
            children: [
                { name: 'goodslist', path: '/goodslist', component: goodslist },
                { name: 'goodslist02', path: '/goodslist02', component: goodslist02 },
                { name: 'goodsAdd', path: '/goodsAdd', component: goodsAdd }
            ]
        }
    ]
});

// 将vueRouter与vue绑定起来
Vue.use(vueRouter);

// 导入axios包
import axios from 'axios';
// 设定axios的基本的url请求前缀
axios.defaults.baseURL = "http://157.122.54.189:9095";
// 将axios对象挂载到vue的原型属性$http上
Vue.prototype.$http = axios;

// 将axios绑定至Vue上
Vue.use(axios);

// 导入elementUI框架
import elementUI from 'element-ui';


// 导入elementui原型的css样式
// import 'element-ui/lib/theme-default/index.css';

// 导入自行修改后的elementui的css样式
import '../statics/theme_rms/index.css';
// 导入此项目的全局样式,需在导入elementui样式之后再导入
import '../statics/css/site.css';


// 设置时间格式化的全局过滤器
Vue.filter('datefmt', (input) => {
    // 获取当前数据的时间
    var date = new Date(input);
    // 获取年月日
    var yy = editDate(date.getFullYear());
    var mm = editDate(date.getMonth() + 1);
    var dd = editDate(date.getDate());
    // 获取时分秒
    var hh = editDate(date.getHours());
    var m = editDate(date.getMinutes());
    var ss = editDate(date.getSeconds());

    return yy + "-" + mm + "-" + dd + " " + hh + ":" + m + ":" + ss;
    // 对时间进行补位
    function editDate(i) {
        return i < 10 ? '0' + i : i;
    }
})

// 将elementui绑定至vue中
Vue.use(elementUI);

// 创建vue对象
new Vue({
    el: '#app',
    // 引用路由
    router,
    render: create => create(App)
})