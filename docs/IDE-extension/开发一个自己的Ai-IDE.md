# 定制一个自己的Ai-IDE
类似Cursor，Kiro，Trae，Qoder等知名Ai-IDE，都是基于Vscode源码，
编程语言Typescript

## vscode源码仓库
https://github.com/microsoft/vscode

```
浅克隆，拉取最新代码
git clone --branch main --single-branch --depth 1 git@github.com:microsoft/vscode.git
```

## 开发方式有如下两种，目前推荐第一种
```
第一种，下载vscode，安装docker，并下载Dev Containers插件
第二种，参考官方文档一步一步来，安装c++工具链，python，nodejs等环境，容易出问题并且很难解决
```
![](/assets/ai/image1.png)
注意: docker内存调整到16g
![](/assets/ai/image9.png)

### Dev Containers 使用流程
```
1. 用vscode-ide打开刚刚克隆下来的vscode源码
2. command + shift + p 
3. 选择 Reopen in Container，vscode会构建工作区的代码并加载到虚拟docker环境
```
![](/assets/ai/image2.png)

点击Reopen in Container 可能需要10几分钟的时间，如果失败了，可以command + shift + p 
选择重新构建
![](/assets/ai/image3.png)

正常的话，会切换到这个页面
你需要在终端中输入 ./scripts/code.sh 来启动项目
![alt text](/assets/ai/image4.png)

```
如果是windows电脑，会单独打开一个终端窗口
如果是mac电脑，要在网页输入 http://localhost:6080/
```
![alt text](/assets/ai/image5.png)
```
进去后在网页可以看到，vscode源码跑起来是什么样子
```
![alt text](/assets/ai/image6.png)
```
开始修改源代码，在欢迎页面加修改源码加一句 我是菠萝喵喵
```
![alt text](/assets/ai/image7.png)

### 来开始定制试试效果
```
在欢迎页面加修改源码加一句 我是菠萝喵喵
改完后在命令行窗口执行，重新编译运行
开发阶段执行
npm run watch    这个可以热更新，不过改了代码还要去执行./scripts/code.sh
./scripts/code.sh

全量编译项目
npm run compile
./scripts/code.sh


```
![alt text](/assets/ai/image8.png)