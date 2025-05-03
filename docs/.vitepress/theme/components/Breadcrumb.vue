<script setup>
import { computed, watchEffect, ref } from "vue";
import { useData, withBase } from "vitepress";

import { useSidebar } from 'vitepress/theme'
const { hasSidebar,sidebar } = useSidebar()

// const pathname = window.location.pathname; // 获取url路径部分（不包括域名和查询参数）
const pathname = 'window.location.pathname'; 
// 拿到当前页url字符串
const pathStr = pathname.split('.')[0]
// 获取全部的的siderbar数据 
const sidebarItems = sidebar._rawValue

console.log('Bread',sidebarItems);


const { page } = useData();
const pathSegments = ref([]);

watchEffect(() => {
  const segments = page.value.relativePath.split("/").filter(Boolean);
//   if(segments.length>1){
//     segments.shift()
//   }
  if(segments.length>0&&segments[segments.length-1]==='index.md'){
    segments.pop()
  }
  if(segments[segments.length-1].endsWith(".md")){
    segments[segments.length-1] = segments[segments.length-1].replace(".md", "")
  }
  pathSegments.value = segments;
  
  
});
</script>

<template>
<div class="pageheader">
 <nav class="breadcrumb">
    <a href="/"></a>
     
    <template v-for="(segment, index) in pathSegments" :key="index">
        <span> / </span>
          <template v-if="index===0">
            <span class="no-link"> {{ segment.replace(".md", "") }} </span>
               
          </template>
        <template v-else>
           
                <!-- <a :href="withBase('/' + pathSegments.slice(0, index + 1).join('/'))">
                    {{ segment.replace(".md", "") }}
                     
                </a> -->
                 {{ segment.replace(".md", "") }}
        </template>
    
    </template>
  </nav>
   <!-- <div class="release">View topic in release: x.x.x  | x.x.x</div> -->

</div>
 
   
</template>

<style>
.pageheader{
  margin-bottom: 15px;
}
.breadcrumb {
  font-size: 14px;
  margin-bottom: 5px;
}

.breadcrumb a {
  color: black;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
  
}
.release{
   font-size: 12px;
}
</style>
