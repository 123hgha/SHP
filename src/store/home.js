import {reqCategoryList,reqGetBannerList,reqFloorList} from "@/api"
// home仓库

const state = {
    // 根据接口返回值的类型初始化
    categoryList:[],
    // 轮播图数据
    bannerList:[],
    // floor轮播图数据
    floorList:[]
}

const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
        // console.log("修改数据");
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    },
}

const actions = {
    // 通过api里面的接口函数调用，向服务器发请求，获取服务器资源
    async CategoryList({commit}) {
        let result = await reqCategoryList();
        // console.log(result.data);
        if (result.code == 200){
            commit("CATEGORYLIST",result.data);
        }      
    },
    async getBannerList({commit}) {
        // console.log("发起请求");
        let result = await reqGetBannerList();
        // console.log(result.data);
        if(result.code==200){
            commit("GETBANNERLIST",result.data);
        }        
    },
    async getFloorList({commit}) {
        // console.log("发起请求");
        let result = await reqFloorList();
        // console.log(result.data);
        if(result.code==200){
            commit("GETFLOORLIST",result.data);
        }        
    },
}

const getters = {

}

export default {
    actions,
    mutations,
    state,
    getters
}