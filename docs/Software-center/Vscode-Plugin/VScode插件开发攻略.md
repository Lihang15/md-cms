[[toc]]

# VScode插件开发攻略

## VScode使用什么技术实现的？

vscode底层通过electron开发实现，electron的核心构成分别是：chromium（ui视图）、nodejs（操作文件桌面系统）、native-api（操作系统维度api）

electron多进程（主进程和渲染进程通过ipc来通信）

主进程（main）：每一个Electron应用只会启动一个主进程

渲染进程（render）：主进程会通过Chromium的api创建任意多个web页面，所以每个页面都单独运行在各自的渲染进程中。

## VScode启动后，也会启动插件进程（Extension）

插件进程，fork渲染进程，每个插件都运行在一个NodeJS宿主环境中，即插件间共享进程

## 那么插件都可以扩展VScode哪些地方？

打开vscode如下图所示

![](/assets/vscode-plugin/page.png)

通过写插件我们能做什么？举几个简单的例子

1.比如我想在Activity Bar中再加入一个图标，点击图标来定义我想展示的数据

2.比如我想鼠标右键在Editor的菜单里添加一项，我点击触发自定义的操作

3.比如我现在有一个.binmap结尾的文件，我打开它可以展示我自定义的ui

4.比如我也可以自定义一些快捷键，比如ctrl+f1，来调用插件提供的api来自定义操作

## VScode官网地址

对于插件扩展有详细的讲解 https://code.visualstudio.com/api

插件提供的扩展api非常多，有其他需求参考官网api

## 插件源代码地址

可以下载插件代码，开发攻略围绕当前已上线的插件vscode-plugin-lihang

![](/assets/vscode-plugin/market.png)

代码地址：todo...

# （二）环境搭建

## 安装nodejs（nodejs版本别低于vscode的node版本）

```
npm install --global yo generator-code
```

```
yo code
```

```
终端中出现如下,依次回车确认 我们选择TypeScript来开发
# ? What type of extension do you want to create? New Extension (TypeScript)
# ? What's the name of your extension? HelloWorld
### Press <Enter> to choose default for all options below ###

# ? What's the identifier of your extension? helloworld
# ? What's the description of your extension? LEAVE BLANK
# ? Initialize a git repository? Yes
# ? Bundle the source code with webpack? No
# ? Which package manager to use? npm

# ? Do you want to open the new folder with Visual Studio Code? Open with `code`
```

用VScode打开刚刚生成的helloworld目录，按F5，运行插件

![](/assets/vscode-plugin/page1.png)

按完F5后会新打开一个窗口，这个窗口已经运行了helloworld这个插件，

然后执行Ctrl+Shift+p打开顶部这个对话框，输入Hello World

![](/assets/vscode-plugin/page2.png)

点击Hello World后 底下弹出Hello World from HelloWorld，插件运行成功

![](/assets/vscode-plugin/page3.png)

## 插件的入口文件（演示hello world的执行过程）

![](/assets/vscode-plugin/page4.png)

其中src目录下的extension.ts文件为入口文件，包含 **activate** 和 **deactivate** 分别作为插件启动和插件卸载时的生命周期函数，可以将逻辑直接写在两个函数内也可抽象后在其中调用。

下面两张图 解释hello world的执行过程

在contributes->commands下配置hello world命令

![](/assets/vscode-plugin/page5.png)

在activate函数中，调用vscode 提供的registerCommand来注册命令（这里的helloword.helloWord要和package.json 中command保持一致，title 是用来搜索展示的（Ctrl+shift+p中））

![](/assets/vscode-plugin/page6.png)

在Ctrl+shift+p中输入title Hello World 就会去执行activate中刚刚注册的命令，

vscode.window.showInformationMessage()会在vscode右下角弹出

## package.json解释

![](/assets/vscode-plugin/page7.png)

name：发到应用市场显示的名字

icon：发到应用市场显示的图标

main：指定了插件的入口函数。

activationEvents：指定触发事件，当指定事件发生时才触发插件执行。需额外关注 ***** 这个特殊的插件类型，因为他在初始化完成后就会触发插件执行，并不需要任何自定义触发事件（按需加载插件，用于优化性能，参考官网）

contributes：描述插件的拓展点，用于定义插件要扩展 vscode 哪部分功能

# （三）命令、菜单、快捷键

![](/assets/vscode-plugin/page8.png)

![](/assets/vscode-plugin/page17.png)

![](/assets/vscode-plugin/page9.png)

![](/assets/vscode-plugin/page10.png)

![](/assets/vscode-plugin/page11.png)

上面注册了4个命令，包括快捷键命令，when是什么情况下展示这个命令

group是 这个操作出现在菜单的什么位置，具体参考官网，下面是这几个命令的结果演示

拿第一个举例，比如打开文件是.js文件，test.js右键，出现is js file 操作，点击后弹窗

![](/assets/vscode-plugin/page12.png)

![](/assets/vscode-plugin/page13.png)

例子二 鼠标右键工作区 test.js 

![](/assets/vscode-plugin/page14.png)

![](/assets/vscode-plugin/page15.png)

例子三  按ctrl+F1

![](/assets/vscode-plugin/page16.png)

例子四 选中文本，鼠标右键

![](/assets/vscode-plugin/page19.png)

![](/assets/vscode-plugin/page20.png)

# （四）跳转定义、自动补全、悬停提示

这里只演示鼠标悬停，调用vscode相关api，触发自己的扩展逻辑，如果在*.js文件上悬停，会弹出触发Hover ，自动补全,跳到定义可以自行查阅官方api

![](/assets/vscode-plugin/new4.png)

![](/assets/vscode-plugin/new5.png)

![](/assets/vscode-plugin/new1.png)



# （五）生成代码片段

![](/assets/vscode-plugin/page24.png)

自定义这个json文件，$是生成代码后，光标的位置

![](/assets/vscode-plugin/new2.png)



![](/assets/vscode-plugin/page26.png)

![](/assets/vscode-plugin/page27.png)

# （六）设置（配置项）

![](/assets/vscode-plugin/config1.png)

![](/assets/vscode-plugin/config2.png)

打开settings可以修改自己插件的配置

![](/assets/vscode-plugin/config3.png)

# （七）WebView

vscode 是允许自己扩展视图的

![](/assets/vscode-plugin/webview2.png)

![](/assets/vscode-plugin/webview3.png)

刚刚的配置中 如果加载欢迎页被打开，就会显示这个webview

![](/assets/vscode-plugin/webview1.png)

下面是一个自定义.binmap文件后缀的webview，动态表格功能，先看效果

![](/assets/vscode-plugin/webview4.png)

鼠标右键的上下文是自己用ui模拟出来的，不能直接改vscode提供的

![](/assets/vscode-plugin/webview5.png)

![](/assets/vscode-plugin/webview6.png)

再看下实现思路，修改package.json添加customEditors配置，

class EditorBinMapProvider implements vscode.CustomTextEditorProvider 实现vscode.CustomTextEditorProvider接口，重写里面的方法，

上下文中 push自定义的视图对象vscode.window.registerCustomEditorProvider(EditorBinMapProvider.viewType, provider);

代码有点多，可以下载这这插件查看 这里只有简单说明

![](/assets/vscode-plugin/webview11.png)

![](/assets/vscode-plugin/webview12.png)

![](/assets/vscode-plugin/webview7.png)

```typescript
webviewPanel.webview.onDidReceiveMessage(e => {
​      switch (e.type) {
​        case 'add':
​          this.addNewScratch(document);
​          return;
}
}); // 接收 webview传过来的消息
```

![](/assets/vscode-plugin/webview8.png)

```typescript
webviewPanel.webview.postMessage({
​        type: 'update',
​        text: document.getText(),
​      });  // 向 webview发送消息
```

![](/assets/vscode-plugin/webview9.png)

```typescript
window.addEventListener('message', event => {
​    const message = event.data; // The json data that the extension sent
​    switch (message.type) {
​      case 'update':
​        const text = message.text;
​        // Update our webview's content
​        updateContent(text);
​        // Then persist state information.
​        // This state is returned in the call to `vscode.getState` below when a webview is reloaded.
​        vscode.setState({ text });
​        return;
​    }
  }); // 接收vscode的消息
```

![](/assets/vscode-plugin/webview10.png)

```typescript
vscode.postMessage({ type: 'add' }); // 向vscode发消息
```

```typescript
vscode.setState({ text });

const state = vscode.getState();
```

这个相当于sessionStorage用于本地存数据的

# （八）自定义侧边栏、视图

![](/assets/vscode-plugin/view2.png)

![](/assets/vscode-plugin/view1.png)

# （九）颜色、图标、主题

todo...

# （十）SCM（源代码管理，比如git扩展）

todo...

# （十一）Language Server

todo...

# （十二）Debug Adapter

todo... 可以实现远程调试（本地代码和远程代码保持一致，远程机器代码运行中，比如有用户访问远程代码，我现在本地可以在代码指定位置打断点，获取远程代码的状态，1.调试器（连接到远程服务器）->适配器（远程服务器和vscode pai交互））

# （十三）新语言支持

为一门新的编程语言提供代码提示，高亮，转到定义等扩展

# （十四）常用api梳理

弹窗  

```typescript
vscode.window.showInformationMessage('插件已经加载你知道了吧？', '知道', '知道', '不再提示').then(result => {
​    if (result === '知道') {
​      console.log('你选择是');
​    } else if (result === '不再提示') {
​      console.log('不在提示');
​    }
  });
```

底部状态栏

```typescript
 vscode.window.setStatusBarMessage('你好状态栏，我是立航！');
```

获取配置

```typescript
const configName = vscode.workspace.getConfiguration().get('config.yourName');
```

更新配置

```typescript
vscode.workspace.getConfiguration().update('config.yourName', '你好 我修改了你', true);
```

配置变化后 回调

```typescript
vscode.workspace.onDidChangeConfiguration(() => {
​    const newConfigName = vscode.workspace.getConfiguration().get('config.yourName');
​    if (newConfigName !== configName) {
​      console.log('配置发生变化：' + newConfigName);
​    }
  }));
```

对话框

```typescript
 vscode.window.showInputBox({ prompt: 'Enter the target folder path for the generated template', value: os.homedir() || '' }).then((value) => {
​      if (value) {
​        // 生成代码模板的逻辑
​        generateTemplate(context, value);
​      }
​    });
```

打开工作区文件夹

```typescript
vscode.workspace.updateWorkspaceFolders(workspaceFolders.length, null, { uri: vscode.Uri.file(targetFolderPath) });
```

 这个只能 在工作区 添加 删除 修改，不能直接打开文件夹

```typescript
vscode.workspace.updateWorkspaceFolders(vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders.length : 0, null, { uri: vscode.Uri.file(targetFolderPath) });
```

执行命令

```typescript
vscode.commands.executeCommand('extension.openFileInWebview');
```

 跳转定义 代码高亮都提供了相应的provide 可自己扩展

```typescript
  context.subscriptions.push(vscode.languages.registerHoverProvider('json', {
​    provideHover
  }));
```typescript

获取当前active的editor

```typescript
 const editor = vscode.window.activeTextEditor;
 const document = editor.document;
​      const selection = editor.selection;
​      // Get the word within the selection
​      const word = document.getText(selection); //获取到了选中的文本
```

新打开一个文件

```typescript
 vscode.window.showTextDocument(vscode.Uri.file(`${dirName}/test.txt`)).then(editor => {

}）
```

# （十五）打包、发布

1.注册微软登陆账号（vscode官网有详细的发布流程）

2.https://dev.azure.com/vscode 在这个网站登录微软账号，拿到用户token

3.

```
npm install -g @vscode/vsce
```

   在当前插件目录下执行 vsce package 打包当前插件，会生成.vsix结尾的包

4. https://marketplace.visualstudio.com/manage/publishers/lihang 打开这个网站把包拖拽上去
5. 发布成功，可以去VScode的marketplace下载

![](/assets/vscode-plugin/market.png)

