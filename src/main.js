import Vue from 'vue'
import App from './App.vue'

// 全局组件
// 三级联动组件-全局组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
// 第一个参数：组件名字  第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

// 按需引入
import { Button,MessageBox } from 'element-ui'
Vue.component(Button.name,Button)
// 挂载原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert;

// 引入路由
import router from '@/router'
// 引入仓库
import store from './store';
// 引入 elementUI 组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';

// 引入Mock
import '@/mock/mockServe';

// 引入swiper样式
import "swiper/css/swiper.css"

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Element, { size: 'small', zIndex: 3000 });

// // 测试
// import {reqCategoryList} from '@/api';
// reqCategoryList();

// 统一接口api文件夹里面的全部请求函数(绕开vuex)
import * as API from '@/api';
import ljz from '@/assets/品优购.png'

// 图片懒加载
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload,{
  loading:ljz
});

// 表单验证插件
import "@/plugins/validate";

new Vue({
  render: h => h(App),
  // 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由
  router,
  // 注册仓库
  store
}).$mount('#app')
