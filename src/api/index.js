//1.引入axios模块
import axios from 'axios'

//2.全局配置

// 统一请求接口地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    //1.获取token
    var token = localStorage.getItem('token') || ''
    //2.判断
    if (token) {
        //设置请求头（后期请求接口 http请求头携带Authorization参数）
        config.headers['Authorization'] = token
    }
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

// var token = localStorage.getItem('token') ||  'Bear'
// axios.defaults.headers.common['Authorization'] = token

// 语法
// GET      axios.get(请求路径，{params: 数据对象})   
//          axios.get(请求路径，{params: {uname:'aaa', pwd:'bbb'}})   
// POST     axios.post(请求路径，数据对象)   
// PUT      axios.put(请求路径，数据对象)   
// DELETE   axios.delete(`请求路径/${id}`)   

// 统一：HTTP请求动词+模块名Api
export const postLoginApi = params =>{
    //axios.post返回的http状态码信息 res.data里面是接口数据
    //第一个then结果会交给第二个then继续处理
    //所以：我们直接处理好，后期调用的时候直接使用即可
    return axios.post('login',params).then(res=>res.data);
}
//商品列表
export const getGoodsApi = getParamsData => { // {query pagenum pagesize}
    return axios.get('goods', {
        params: getParamsData
    }).then(res => res.data)
}
export const getUsersApi = getParamsData =>{ // {query pagenum pagesize}
    return axios.get('users',{
        params:getParamsData
    }).then(res=>res.data)

}
export const getRolesApi = () =>{ // {query pagenum pagesize}
    return axios.get('roles').then(res=>res.data)

}
export const getOrdersApi = (getParamsData) =>{ // { pagenum pagesize}
    return axios.get('orders',{
        params:getParamsData
    }).then(res=>res.data)
}
export const getPowersApi = type =>{ // { pagenum pagesize}
return axios.get(`rights/${type}`).then(res=>res.data)
}
export const deleteGoodsApi = id =>{
    return axios.delete(`goods/${id}`).then(res=>res.data)
}
export const deleteUsersApi = id =>{
    return axios.delete(`users/${id}`).then(res=>res.data)
}
export const deleteRolesApi = id =>{
    return axios.delete(`roles/${id}`).then(res=>res.data)
}
export const deleteOrdersApi = id =>{
    return axios.delete(`goods/${id}`).then(res=>res.data)
}
export const postGoodsApi = params =>{
    return axios.post('goods',params).then(res=>res.data)
}
export const postUsersApi = params =>{
    return axios.post('users',params).then(res=>res.data)
}
export const putGoodsApi = params =>{
    return axios.put(`goods/${params.id}`,params).then(res=>res.data)
}
export const putOrdersApi = params =>{
    return axios.put(`orders/${params.id}`,params).then(res=>res.data)
}
export const getGoodsCateApi = (showLevel=3) => { // 形参 默认3层
    return axios.get('categories', {params: {type:showLevel}}).then(res=>res.data)  
}
export const putUsersApi = params =>{
    return axios.put(`users/${params.id}`,params).then(res=>res.data)
}