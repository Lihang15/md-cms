# 定制一个自己的Ai-IDE
类似Cursor，Kiro，Trae，Qoder等知名Ai-IDE，都是基于Vscode源码，
编程语言Typescript

## 我的产品名字为菠萝猫，已经开发完成，效果如下，教程补充中todo...
![alt text](/assets/ai/image11.png)
![alt text](/assets/ai/image10.png)
### 这里的的模式参考的cursor，功能已实现
![alt text](/assets/ai/image12.png)
## vscode源码仓库
https://github.com/microsoft/vscode

```
浅克隆，拉取最新代码
git clone --branch main --single-branch --depth 1 git@github.com:microsoft/vscode.git
```


### 直接跑源码
```
在源码目录直接执行如下命令
npm install
npm run compile 第一次跑要全量编译
./scripts/code.sh   这个命令会把vscode的客户端直接跑起来

开发阶段推荐如下命令，可以不用全量编译，增量编译模式
1.终端 A：npm run watch（一直开着）
2.终端 B：./scripts/code.sh 启动本地 VS Code
3.改代码后，watch 自动产出到 out/，重启窗口/重载即可看效果
简单说：watch 提升迭代速度，compile 做最终验收。

```
```
开始修改源代码，通过页面关键字定位到源代码，在欢迎页面加修改源码加一句 `我是菠萝猫,你的AI助手,我来帮你写代码`
```
![alt text](/assets/ai/image7.png)

### 来开始定制试试效果
```
在欢迎页面加修改源码加一句 我是菠萝猫
改完后在命令行窗口执行，重新编译运行
开发阶段执行
npm run watch    这个可以热更新，不过改了代码还要去执行./scripts/code.sh
./scripts/code.sh

全量编译项目
npm run compile
./scripts/code.sh


```
![alt text](/assets/ai/image8.png)
### 开发阶段加载vscode插件

执行如下命令可以在开发阶段在vscode中看到你的插件
```
./scripts/code.sh --extensionDevelopmentPath=/Users/lihang/Documents/projects/你的插件源码/src

```

### 打包制品
#### 1.打包成mac-arm芯片的dmg包
```
1、编译vscode插件，如果有的情况
   先将vscode插件打包成.vsix文件
   计算校验和，打包进vscode中要用到
   shasum -a 256 /Users/lihang/Documents/projects/boluomao/bin/*.vsix 
2、把插件写进 VS Code 内置扩展列表
   编辑 vscode/product.json 的 builtInExtensions，在现有条目后面增加（路径和 sha256 按你实际文件改）
   {
			"name": "lihang.boluomao",
			"version": "1.0.0",
			"sha256": "e99d0a2e7088aaa096b986ea85a1813204d5f22c9fc5177a24c2b9f1e570dc",
			"vsix": "../boluomao-Code/bin/boluomao-1.0.0.vsix",
			"metadata": {
			  "id": "lihang.boluomao",
			  "publisherId": {
				"publisherId": "lihang",
				"publisherName": "lihang",
				"displayName": "lihang",
				"flags": ""
			  },
			  "publisherDisplayName": "lihang"
			}
		  },
3、打包 macOS 应用（耗时最长）
    环境（参考 How to Contribute）：

    Node.js（与仓库 package.json engines 一致）
    Xcode Command Line Tools
    Python ≥ 3.10（做 DMG 时需要）
    磁盘空间建议 30GB+
    cd /Users/lihang/Documents/projects/vscode
    npm ci   # 若还没装依赖

    # Apple Silicon (M 系列)
    npm run gulp vscode-darwin-arm64-min

    # Intel Mac 用
    # npm run gulp vscode-darwin-x64-min
    完成后应用一般在上一级目录：

    /Users/lihang/Documents/projects/VSCode-darwin-arm64/菠萝猫.app
4、打出dmg包，暂时不上架，上架需走苹果的认证
    cd /Users/lihang/Documents/projects/vscode

    export VSCODE_ARCH=arm64          # 你当前是 Apple Silicon
    export VSCODE_QUALITY=stable      # 对应 build/darwin/dmg-background-stable.tiff

    mkdir -p /Users/lihang/Documents/projects/dmg-out

    node build/darwin/create-dmg.ts \
    "/Users/lihang/Documents/projects" \
    "/Users/lihang/Documents/projects/dmg-out"

    产物：
    /Users/lihang/Documents/projects/dmg-out/VSCode-darwin-arm64.dmg

    可改名：

    mv /Users/lihang/Documents/projects/dmg-out/VSCode-darwin-arm64.dmg \
    /Users/lihang/Documents/projects/菠萝猫-1.0.0-arm64.dmg

5、发给别人时候注意
   
    当前包是 arm64，仅适用于 M 系列 Mac；Intel Mac 需另打 vscode-darwin-x64-min

    首次打开
    未公证时可能提示「无法验证开发者」→ 右键 → 打开，或 系统设置 → 隐私与安全性 → 仍要打开

    隔离属性
    若从网盘/微信下载，可让对方执行：xattr -cr /Applications/菠萝猫.app

    不必上架
    内部分发不需要 App Store；公证（notarize） 可选，没做也能用，只是首次打开多一步确认
```



#### 2.打包成windows的包
```
  mac上无法交叉编译出windows的产物，需要一台windows电脑或者虚拟机
  cd C:\path\to\vscode 
  npm run gulp vscode-win32-x64-min

  产物目录
  ..\VSCode-win32-x64\
  boluomiaomiao.exe    # applicationName 来自 product.json
  resources\app\...

  打包成zip文件
  Compress-Archive -Path ..\VSCode-win32-x64 -DestinationPath boluomao-win32-x64.zip

  若要 安装程序（可选，需要 Inno Setup）
  npm run gulp vscode-win32-x64-system-setup
```

### 遇到的问题

1.拉取electron失败，因为网络
```

export ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
cd /Users/lihang/Documents/projects/vscode
npm run electron
./scripts/code.sh

```

2.打包插件,如果文件不全，需要手动解包
```
    cd /Users/lihang/Documents/projects/vscode

    rm -rf .build/builtInExtensions/lihang.boluomao
    mkdir -p /tmp/bm-unzip
    unzip -q ../buoluomao/bin/boluomao-1.0.0.vsix -d /tmp/bm-unzip
    mv /tmp/bm-unzip/extension .build/builtInExtensions/lihang.boluomao

    # 必须能 ls 到这两个文件
    ls .build/builtInExtensions/lihang.boluomao/dist/extension.js
    ls .build/builtInExtensions/lihang.boluomao/webview-ui/build/assets/index.js

    # 再打包（Apple Silicon）
    npm run gulp vscode-darwin-arm64-min
```