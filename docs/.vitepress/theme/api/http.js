// src/plugins/axios.js  
  
import axios from 'axios';  
import { ElNotification } from 'element-plus'
// 创建一个 axios 实例  

console.log('当前环境',import.meta.env.VITE_API_ENV)

// baseURL: 'http://localhost:3001' 用于本地开发调试
const service = axios.create({  
  baseURL: import.meta.env.VITE_API_ENV==='dev'?'http://localhost:7001': '', // api 的 base_url  
  timeout: 5000 // 请求超时时间  
});  
  
// 请求拦截器  
service.interceptors.request.use(  
  config => {  
    // 在发送请求之前做些什么  
    // 例如，设置请求头  
    const token = localStorage.getItem('token');
    config.headers['authorization'] = `Bearer ${token}`
    return config;  
  },  
  error => {  
    // 对请求错误做些什么  
    console.error('请求拦截器捕获到错误：', error); // for debug
    ElNotification({
      title: 'Error',
      message: '服务端返回错误',
      type: 'error',
    })
    Promise.reject(error);  
  }  
);  
  
// 响应拦截器  
// service.interceptors.response.use(  
//   response => {  
//     // 对响应数据做点什么  
//     // 例如，检查响应状态码  
//     const res = response.data;  
//     if (res.code !== 200) {  
//       Message.error({  
//         message: res.message || 'Error',  
//         type: 'error',  
//         duration: 5 * 1000  
//       });  
//       // 50008:非法的token; 50012:其他客户端触发的异常  
//       if (res.code === 50008 || res.code === 50012) {  
//         // 重新登录  
//         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {  
//           confirmButtonText: '重新登录',  
//           cancelButtonText: '取消',  
//           type: 'warning'  
//         }).then(() => {  
//           store.dispatch('user/resetToken').then(() => {  
//             location.reload();  
//           });  
//         });  
//       }  
//       return Promise.reject(new Error(res.message || 'Error'));  
//     } else {  
//       return res;  
//     }  
//   },  
//   error => {  
//     // 对响应错误做点什么  
//     console.error('响应拦截器捕获到错误：', error); // for debug  
//     return Promise.reject(error);  
//   }  
// );  
  
export default service;