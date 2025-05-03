<script setup>
import { useSidebar } from 'vitepress/theme'
const { hasSidebar,sidebar } = useSidebar()

// const pathname = window.location.pathname; // 获取url路径部分（不包括域名和查询参数）
const pathname = 'window.location.pathname'; 
// 拿到当前页url字符串
const pathStr = pathname.split('.')[0]
// 获取全部的的siderbar数据 
const sidebarItems = sidebar._rawValue

let pre = null
let next = null
let currentSidebaritem = null
for(const sidebarItem of sidebarItems){
   if(isLinkInData(sidebarItem,pathStr)){
     currentSidebaritem = sidebarItem
     break
   }   
} 
const currentIndex = sidebarItems.indexOf(currentSidebaritem)

//最新版本
if(currentIndex===0){
  pre = sidebarItems[currentIndex+1]
  next = sidebarItems[currentIndex+2]
}else if(currentIndex===sidebarItems.length-1){
  //最老版本
   pre = sidebarItems[currentIndex-1]
   next = sidebarItems[currentIndex-2]
}else{
  //中间版本
   pre = sidebarItems[currentIndex+1]
   next = sidebarItems[currentIndex-1]
}

let preLink = null
let preVersion = null
let nextLink = null
let nextVersion = null
if(pre){
   const textStr = pre.text
   const {version, content} = parseStrAndUrl(textStr,pathStr)
   preLink = content
   preVersion = version
}
if(next){
   const textStr = next.text
   const {version, content} = parseStrAndUrl(textStr,pathStr)
   nextLink = content
   nextVersion = version
}
console.log('preLink',preLink)
console.log('preVersion',preVersion)
console.log('nextLink',nextLink)
console.log('nextVersion',nextVersion)
// 通过递归对比出pathStr是否在sidebarItem中
function isLinkInData(data, link) {
    if (data.link === link) {
        return true;
    }
    if (data.items) {
        for (let i = 0; i < data.items.length; i++) {
            if (isLinkInData(data.items[i], link)) {
                return true;
            }
        }
    }
    return false;
}
// 拿到要替换的字符串
function parseStrAndUrl(str, url) {
    let versionRegex = /\d+\.\d+\.\d+/; // 匹配版本号的正则表达式
    let contentRegex = /\/sidebar\/\w+\/\w+/; // 匹配链接部分的正则表达式

    let versionMatch = str.match(versionRegex);
    let contentMatch = url.match(contentRegex);

    let version = versionMatch ? versionMatch[0] : null;
    let content = contentMatch ? contentMatch[0] : null;

    // 替换链接部分中的数字部分
    if (version && content) {
        let newContent = content.replace(/\d+/, version.replace(/\./g, ""));
        return { version, content: newContent };
    }

    return { version, content };
}  
</script>


<template>
  <div>View topic in release: <a :href="preLink" target="">{{preVersion}}</a>  | <a :href="nextLink" target="">{{nextVersion}}</a> </div>
</template>