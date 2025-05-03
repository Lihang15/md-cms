import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Login from './components/Login.vue'
import Info from './components/Info.vue'
import Avatar from './components/Avatar.vue'
import Breadcrumb from "./components/Breadcrumb.vue";
import UserManagement from './components/UserManagement.vue'
// import { getUserInfo } from './api/userinfo'

import { h } from 'vue'
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(Avatar),
      // 'doc-top': ()=>h(pageTopicHeader),
      'doc-before': ()=>h(Breadcrumb)
      // 'sidebar-nav-after': () => h(Avatar),
    })
  },
  enhanceApp({ app, router }: { app: any,router: any }) {
    app.mixin({
      // 钩子守卫，初始化和页面跳转时候调用，控制路由跳转，本地预览注释整个mounted()函数，绕过检查
      // mounted() {
      //   if(import.meta.env.VITE_API_ENV!=='dev'){
      //     const path = window.location.pathname;
      //     if(path==='/User/Login'){
      //       return
      //     }
      //     // 添加浏览器回退，前进，并作出相应操作
      //     if(typeof window !=='undefined'){
      //         window.addEventListener('popstate',()=>{
      //           console.log('点击了返回');
                
      //           const currentUser = getUserInfo()
      //           const { roles } = currentUser
      //           if(roles.includes('Admin')){
      //             return
      //           }
      //           // 如果是 外部用户，访问管理员url，要做路径拦截
      //         if (roles.includes('Outer') && path.indexOf('/Value-added-service')!=-1) {
      //             // window.location.href = '/No-Permission';
      //             router.go('/User/No-Permission')
      //           } 
      //           })
      //     } 
        
      //     const currentUser = getUserInfo()
      //     console.log('测试路由拦截',currentUser);
          
      //     const { roles } = currentUser
      //     if(!currentUser?.username){
      //       router.go('/User/Login');
      //     }
      //       // 如果是 外部用户，访问管理员url，要做路径拦截
      //       if (roles.includes('Outer') && path.indexOf('/Value-added-service')!=-1) {
      //         // window.location.href = '/No-Permission';
      //         router.go('/User/No-Permission')
      //       } 

      //   }
     
      
      // },

    });
    
    app.use(ElementPlus)
    app.component('Login',Login)
    app.component('Info',Info)
    app.component('UserManagement',UserManagement)
  },
}


