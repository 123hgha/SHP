import Mock from 'mockjs';

// webpack默认对外暴露：图片、JSON数据格式
import banner from './banners.json';
import floor from './floor.json';

// 第一个参数：请求地址   第二个参数：请求数据
Mock.mock("/mock/banner",{code:200,data:banner});
Mock.mock("/mock/floor",{code:200,data:floor});