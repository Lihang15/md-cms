<script lang="ts" setup>

</script>

<template>
 <!-- <el-avatar
        :src="avatarUrl"
      /> -->
  <el-space direction="vertical">
    <el-text tag="b"><span class="span">roles:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{currentUser.roles}}</span> </el-text>
    
<el-text tag="b"><span class="span">username:  &nbsp;&nbsp;{{currentUser.username}}</span> </el-text>
<el-text tag="b"><span class="span">email:&nbsp;&nbsp;{{currentUser.email}}</span> </el-text>
   
  </el-space>
</template>


<script lang="ts" setup>
const avatarUrl = "/assets/asset8600/logo/accotest_logo.png"
  const currentUserStr = localStorage.getItem('currentUser')
  let currentUser = {avatarUrl:'',username:''};
  
  if(currentUserStr){
    currentUser = JSON.parse(currentUserStr);
  }



</script>

<style scoped>

.span{
  color: rgba(62, 72, 165, 0.911);
  font-size: 20px;
  font-weight: 700; 
}
</style>