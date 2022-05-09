import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import store from '@/store';

import routes from './routes'

// 解决编程式路由跳转多次警告问题
//1、先把VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//2、重写push|replace
//第一个参数：告诉原来的push，跳转的目标位置和传递了哪些参数
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

let router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior() {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

// 全局守卫：前置守卫
router.beforeEach(async (to, from, next) => {
    // 获取token
    let token = store.state.user.token
    // 用户信息
    let name = store.state.user.userInfo.name
    if (token) {
        // 用户登录了，login不能去
        if (to.path == '/login') {
            next('/home')
        } else {
            // 用户登录了，去别的
            if (name) {
                next();
            } else {
                // 没有用户信息，派发action让仓库存储
                try {
                    // 获取用户信息成功
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {
                    // token失效了 需要重新登录
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    } else {
        //未登录
        let toPath = to.path;
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            next('/login?redirect='+toPath)
        }else{
            next();
        }
    }
});

export default router;