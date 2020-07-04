import axios from 'axios'
// import { config } from 'vue/types/umd'
import { Message } from 'element-ui'

//设置请求拦截 
axios.interceptors.request.use(confing=>{
    if(localStorage.eleToken){
        confing.headers.Authorization = localStorage.eleToken
    }
    return confing
},error=>{
    return Promise.reject(error)
})

//响应拦截 
axios.interceptors.response.use(response=>{
    return response
},error=>{
    console.log(error);
    Message.error(error.response.data)
    const {status} = error.response 
    if(status==401) {
		Message.error('token值无效,请重新登陆')
		// 清除token  
		localStorage.removeItem('eleToken')
		//页面跳转 
		router.push('/login')
	}
	return Promise.reject(error)
})


export default axios