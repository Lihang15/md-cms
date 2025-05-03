

<template>
<div class="avatar">
<el-dropdown @command="handleCommand">
    <div class="avatar-swap">
 <!-- <el-avatar :src="avatarUrl" :size="40" /> -->
      <span v-if="currentUser?.username">{{ currentUser?.username }}</span>  
      <span v-else class="sign">Sign in</span>  
      </div>
   
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="info">profile</el-dropdown-item>
        <el-dropdown-item command="logout">logout</el-dropdown-item>
          <el-dropdown-item v-if="currentUser?.roles?.includes('Admin')" command="user_management">management</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</div>
  
</template>

<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'
// const avatarUrl = "/assets/asset8600/logo/accotest_logo.png"

const handleCommand = (command: string | number | object) => {
  
  if (command === 'logout') {
        localStorage.removeItem('token')
        localStorage.removeItem('currentUser')
        location.href = `/User/Login`;
        return;
    
    }
    if(command === 'user_management'){
       location.href = `/User/UserManagement`;
       return;
    }
    location.href = `/User/Info`;
  }
        const currentUserStr = localStorage.getItem('currentUser')
      let currentUser = {url:'',username:''};
      
      if(currentUserStr){
        currentUser = JSON.parse(currentUserStr);
      }






</script>
<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.avatar{
    width: 30px;
}

.avatar-swap{
  display: flex;  
  align-items: center; /* 垂直居中对齐 */  
  gap: 4px; /* 间距，根据需要调整 */ 
  font-size: 14px;
  font-weight: 500;
  padding-top: 5px 
}

</style>