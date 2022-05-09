// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'


// const foo = () => {
//     return import("@/pages/Home")
// }
// 简化：在component下：()=>import("@/pages/Home")
//  当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。


export default [
    {
        path: "/center",
        component:Center,
        meta: { show: true },
        children:[
            {
                path: "myorder",
                component:MyOrder,
                meta: { show: true },  
            },
            {
                path: "grouporder",
                component:GroupOrder,
                meta: { show: true },  
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path: "/paysuccess",
        component:PaySuccess,
        meta: { show: true }, 
    },
    {
        path: "/pay",
        component:Pay,
        meta: { show: true }, 
        beforeEnter: (to, from, next) => {
            if(from.path=="/trade"){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: "/trade",
        component:Trade,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if(from.path=="/shopcart"){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: "/shopcart",
        name:'shopcart',
        component:ShopCart,
        meta: { show: true },
    },
    {
        path: "/addcartsuccess",
        name:'addcartsuccess',
        component:AddCartSuccess,
        meta: { show: true },
    },
    {
        path: "/detail/:skuid",
        component: Detail,
        meta: { show: true },
    },
    {
        path: "/home",
        component: ()=>import("@/pages/Home"),
        meta: { show: true }
    },
    {
        path: "/search/:keyword?",
        component: ()=>import("@/pages/Search"),
        meta: { show: true },
        name: "search",
        props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k })
    },
    {
        path: "/login",
        component: Login,
        meta: { show: false }
    },
    {
        path: "/register",
        component: Register,
        meta: { show: false }
    },
    // 重定向，在项目跑起来时，访问/，立马让他定向到首页
    {
        path: '*',
        redirect: "/home"
    },
]
