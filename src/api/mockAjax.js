// 对axios二次封装
import axios from "axios";
// 引入进度条
import nprogress from 'nprogress';
// start：进度条开始   done：进度条结束
import "nprogress/nprogress.css";

const requests = axios.create({
    // 基础路径，发请求的时候，路径当中会出现api
    baseURL:"/mock",
    // 请求超时5s
    timeout: 5000,
})

// 请求拦截器：发送请求前，可以做一些事情
requests.interceptors.request.use((config)=>{
    // 配置对象，headers请求头
    // 进度条开始
    nprogress.start();
    return config;
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功回调函数，相应数据回来后，可以做一些事情
    // 进度条结束
    nprogress.done();
    return res.data;
},(error)=>{
    // 失败
    console.log(error);
    return Promise.reject(new Error('false'))
});


export default requests;