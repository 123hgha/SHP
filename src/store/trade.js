import {reqAddressInfo,reqOrderInfo} from '@/api'

const state = {
    address:[],
    orderInfo:{}
};
const mutations = {
    GETUSERADDRESS(state,address){
        state.address = address
    },
    GETORDER(state,orderInfo){
        state.orderInfo = orderInfo
    }
};
const actions = {
    // 获取用户地址信息
    async getUserAddress({commit}){
       let result = await reqAddressInfo();
       if(result == 200) {
           commit('GETUSERADDRESS',result.data)
       }
    },
    // 获取商品清单数据
    async getOrder(){
        let result = await reqOrderInfo();
        if(result == 200) {
            commit('GETORDER',result.data)
        }
    }
};
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}