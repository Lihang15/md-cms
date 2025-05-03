# 使用 Node.js 18 的 Alpine Linux 基础镜像
FROM node:18-alpine
 
# 创建一个工作目录（这里我们假设它是 /app/vitepress-docs）
RUN mkdir -p /app/vitepress-docs
WORKDIR /app/vitepress-docs
 
# 复制当前目录的内容到 Docker 容器的 /app/vitepress-docs 目录
COPY . .
 
# 安装项目依赖
RUN npm install
 
# 暴露应用的端口（假设你的 Node.js 应用在 3001 端口上运行）
EXPOSE 3001
 
# 定义容器启动时运行的命令
# 假设 app.js 位于 /app/vitepress-docs/server/ 目录下
CMD ["node", "server/app.js"]