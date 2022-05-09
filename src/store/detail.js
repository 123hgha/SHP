import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api"
import { getUUID }from '@/utils/uuid_token'

const state = {
    goodsInfo: {},
    // 游客临时身份
    uuid_token:getUUID()
}

const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    },
}

const actions = {
    // 通过api里面的接口函数调用，向服务器发请求，获取服务器资源
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit("GETGOODSINFO", result.data);
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({ commit },  {skuId,skuNum} ){
        let result = await reqAddOrUpdateShopCart(skuId,skuNum);
        // 服务器加入购物车成功
        if(result.code == 200){
            return "ok"
        }else{
            // 加入失败
            return Promise.reject(new Error('faile'));
        }
    }
}
// 简化数据
const getters = {
    // 路径导航
    categoryView(state) {
        return state.goodsInfo.categoryView || {};
    },
    // 产品信息
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {};
    },
    // 产品售卖属性
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || {};
    },
}

export default {
    actions,
    mutations,
    state,
    getters
}