<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
import {login,info} from '../api/auth'

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    callback()
  }
}
const validateEmail = (rule: any, value: string, callback: (error?: Error) => void) => {  
  // 使用正则表达式来验证邮箱格式  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
  
  if (!value) {  
    // 如果邮箱为空，返回错误  
    callback(new Error('Please input the email'));  
  } else if (!emailRegex.test(value)) {  
    // 如果邮箱格式不正确，返回错误  
    callback(new Error('The email format is incorrect'));  
  } else {  
    // 如果邮箱格式正确，不返回错误  
    callback();  
  }  
}; 

const ruleForm = reactive({
  email:'',
  pass: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  email:[{validator: validateEmail}]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      
      console.log('submit!',ruleForm)
      // 调接口
        // 登录
          const result = await login({
            email: ruleForm.email,
            password: ruleForm.pass,
          });
          // const result = {data:{token:'123'}}
          // 跳转登录第三方
          if (result && result.data) {
            const { data } = result.data;
            if(!data?.token){
               ElNotification({
              title: 'Error',
              message: 'The account name or password is incorrect!',
              type: 'error',
            })
            return
            }
            
            localStorage.setItem('token',data.token);
            const resultInfo = await info();
             const { data: user } = resultInfo.data
          //  const data = {url:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',name:'wanglihang'}
            localStorage.setItem('currentUser', JSON.stringify(user));
            // 跳转首页
              location.href = '/'
          }else{
         ElNotification({
         title: 'Error',
         message: 'The account name or password is incorrect!',
         type: 'error',
      })
      }
    
    } else {
      ElNotification({
         title: 'Error',
         message: 'validate incorrect!',
         type: 'error',
      })
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
    <div class="container">
                <div class="content">
                    <el-form
                        ref="ruleFormRef"
                        style="max-width: 600px"
                        :model="ruleForm"
                        status-icon
                        :rules="rules"
                        label-width="auto"
                        class="demo-ruleForm"
                        label-position="top"
                    >
                    <div class="loginHeader">Sign in to Lihang's cms</div>
                      <el-form-item label="Email address" prop="email">
                        <el-input v-model="ruleForm.email" />
                    </el-form-item>
                        <el-form-item label="Password" prop="pass">
                          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
                        </el-form-item>
            
                        <el-form-item>
                          <div class="loginBtn">
                          <el-button type="primary" @click="submitForm(ruleFormRef)">
                                                Sign in
                          </el-button>
                         
                          </div>
                        
                        </el-form-item>
                    </el-form>
                </div>
            </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  height: 100vh;
  margin-top: 30px;
}

::v-deep .el-form-item__label{
  color: black;
  font-weight: 500;
}
.el-button{
     width: 280px;
     margin-bottom: 10px;
     background: oklch(0.511 0.262 276.966);
    }
.el-button+.el-button {
    margin-left: 0px;
}
.el-input{
   width: 280px;
   border: none
  
}

::v-deep .el-input__suffix{
  display: none !important;
}
::v-deep .el-input__wrapper{
   padding: 1px 1px !important;
   border-radius: 0
}
::v-deep .el-input__inner{
  background-color: #fff !important;
  font-size: 12px;
  /* border: 1px solid black */
}
.loginHeader{
  width: 300px;
  word-wrap: break-word;
   margin-bottom: 40px;
   font-size: 20px;
   text-align: center;
   font-weight: 700;
   /* margin-left: -100px; */
}


.VPNav{
  display: none !important;
}

</style>