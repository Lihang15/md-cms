import fs from 'fs';
import path from 'path';

export function generateSidebar(dir) {
  const fullPath = path.resolve(__dirname, '../', dir);
  const items = fs.readdirSync(fullPath).map(file => {
    const filePath = path.join(fullPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // 处理子目录
      const subFiles = fs.readdirSync(filePath)
      const hasIndex = subFiles.includes('index.md')
      return {
        text: file.replace(/-/g,' '),
        collapsed: true,
        // link: `/${dir}/${file}`, // 目录链接
        ...(hasIndex?{link: `/${dir}/${file}`}:{}),
        items: generateSidebar(path.join(dir, file)) // 递归调用
      };
    } else if (file.endsWith('.md') && file !== 'index.md') {
      
      // 忽略 index.md 文件
      return {
        text: file.replace('.md', ''),
        link: `/${dir}/${file.replace('.md', '')}`
      };
    }
    return null; // 过滤掉不需要的文件
  }).filter(Boolean); // 过滤掉 null 项
  //  console.log('items',items);
   
  return items;
}


