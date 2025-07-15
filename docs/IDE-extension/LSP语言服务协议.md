# LSP语言服务协议浅析

现代主流IDE通常都是支持多种语言的，以VSCode为例，可以通过安装扩展来满足各种语言特有的高亮、自动补全、语法检查等编辑功能。

当我们要为某种语言提供一些额外的编辑功能时，通常仅提供一种IDE的扩展是不够的，如果你只用VSCode提供的API，扩展只能用于VScode。
如果要对多款IDE开发一款相同功能的扩展，因每款IDE的API及实现的语言不一样，有可能需要实现多次，至少也需要通过抽象和转换才能达到目的

LSP (Language Sever Protocol)定义在工具（客户端）和语言智能提供者（服务端）之间的通信，集成自动完成、跳转到定义、查找所有引用等编辑功能的协议。将语言编辑能力的实现和IDE主体以一种统一的形式组合起来，将原来M(IDE或编辑器)*N(语言或语言扩展)的问题难度转变成M+N级别成为可能。

![](/assets/LSP/lsp-languages-editors.png)

左图为未使用LSP前，每种语言都需要单独针对不同的IDE进行实现；右图为使用LSP之后，一份实现，同时可以在多款IDE中使用。这大大简化了语言类扩展在IDE上的实现成本，这里不仅仅是开发成本，还有很大一部分是学习IDE的API成本。
因LSP采用的是客户端/服务端（不局限于远程服务器）架构，语言特性相关的内容是独立在服务端运行的，在进程上完全独立，不会因为解析时间较长而对IDE本身产生影响。

LSP最初由微软提出，并在VSCode上实现，现包括Codenvy、Red Hat和Sourcegraph在内的多家公司汇聚在一起支持其发展。目前很多常见的IDE或编辑器已经有相应的扩展（或内置）支持了LSP，下面笔者简单列举一些常见的IDE和编辑器，更多内容请参阅官方文档。

Eclipse IDE、Sublime Text、WebStorm、IntelliJ IDEA、Visual Studio Code
## 工作机制

语言服务在自己独立的进程中运行，使用LSP协议和主进程（客户端）进行通信，通信内容主要分为两类通知和请求。通知和请求的差别是：通知是单项的，一方向另一方发送消息；请求是双向的，有一方发起请求（可带参数），大部分时候能等到另一方的回应（Response）。
图为客户端（Visual Studio Code）和语言服务之间使用LSP进行通信的示例：
![](/assets/LSP/proto.png)

1.  用户打开文档，客户端向语言服务发送通知，告知其文档已被打开
2. 用户编辑文档，客户端向语法服务发送通知，告知其文档已被编辑；随后出发语言服务的诊断功能
3. 诊断结束后，语言服务项客户端发送通知，告知检测到的错误和警告信息
4. 用户发起跳转到定义操作，客户端项语言服务发送跳转到定义请求，语言服务经过分析得到具体位置，并回应给客户端
5. 用户关闭文档，客户端向语言服务发送通知，告知其文档已被关闭

通常情况下，不同的扩展或语言服务会监听不同语言文件的操作，且语言服务的实现语言不受工具（客户端）语言的影响。如图：
![](/assets/LSP/lsp-illustration.png)

## LSP内容
LSP使用JSON-RPC语言协议进行通信，基本协议由头部和内容两部分组成，使用“\r\n”分隔进行分割，整体内容形如：

```
Content-Length: ...\r\n
\r\n
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "textDocument/completion",
	"params": {
		...
	}
}
```
LSP提供了服务端生命周期（Server Lifecycle）、文档同步（Text Document Synchronization）、语言能力（Language Features）、工作区能力（Workspace Features）、窗口能力（Window Features）五大方面的协议内容。

### 服务端生命周期（Server Lifecycle）
当前的协议规范定义服务端的生命周期是由客户端进行管理的，即由客户端决定何时启动、关闭进程。具体的内容有：

1. Initialize Request：初始化请求是从客户端发送到服务器的第一个请求
2. Initialized Notification：初始化完成通知，由客户端向服务端发送，此通知只发送一次
3. Register Capability：注册能力请求，从服务端发送到客户端，用于在客户端注册新能力
4. Shutdown Request：关闭请求是从客户端发送到服务器的，要求服务器关闭，但不退出
5. Exit Notification：请求服务器退出其进程通知，客户端应等待收到关闭请求的响应后再发送退出通知

### 文档同步（Text Document Synchronization）

1. DidOpenTextDocument Notification：文档打开通知是从客户端发送到服务端，用于通知服务端新打开了文本文档
2. DidChangeTextDocument Notification：文档更改通知是从客户端发送到服务端，用于通知服务端文本文档已被更改
3. DidSaveTextDocument Notification：文档保存通知是从客户端发送到服务端，用于通知服务端文档已被保存
4. Notebook Document Synchronization：Notebook越来越受欢迎，此组协议内容允许Notebook及其Cell复用服务端的语言能力

### 语言特性（Language Features）
笔者认为语言特性是LSP中的关键模块，最初就是为了这些特性而生。这些语言特性基于文档的同步状态进行计算。

1. Document Highlights Request：文本高亮请求是从客户端发送到服务端，用于解析给定文本文档位置的高亮情况
2. Hover Request：浮动请求是从客户端发送到服务端，用于请求给定文本文档位置的悬停信息
3. Folding Range Request：折叠范围请求是从客户端发送到服务端，以返回给定文本文档中所有折叠范围
4. Selection Range Request：选择范围请求是从客户端发送到服务端，以返回给定位置数组处的建议选择范围
5. Completion Request：补全请求是从客户端发送到服务端，以返回光标所在位置的补全建议信息
6. Document Formatting Request：文档格式化请求从客户端发送到服务端，用于格式化整个文档

### 工作区特性（Workspace Features）

1. Configuration Request：配置请求从服务端发送到客户端，用于请求获取配置设置内容
2. DidCreateFiles Notification：已创建文件通知从客户端发送到服务端，用于告知服务端文件已经创建完成
3. DidRenameFiles Notification：文件已重命名通知从客户端发送到服务端，用于告知服务端文件已经被重命名
4. Execute a command：执行命令请求从客户端发送到服务端，用于在服务端触发命令执行

### 窗口特性（Window Features）

1. ShowMessage Notification：显示消息通知从服务端发送到客户端，用于要求客户端显示特定消息
2. ShowMessage Request：显示消息请求从服务端发送到客户端，用于请求客户端显示特定消息，较消息显示通知允许传递操作并等待来自客户端的回应
3. Show Document Request：显示文档请求从服务端发送到客户端，要求客户端显示特定URI指定的资源
4. Create Work Done Progress：显示工作进度条通知从服务端发送到客户端，用于请求客户端显示工作进度条
5. Cancel a Work Done Progress：取消工作进度条显示通知从服务端发送到客户端，用于请求客户端取消工作进度条的显示

所有的协议内容都仅仅只是定义客户端和服务端的通信格式及相关内容，本身并不实现具体功能，这些功能都需在服务端或客户端实现。

## 示例
访问 [VScode官方提供的示例](https://github.com/microsoft/vscode-extension-samples/tree/main/lsp-sample) 获取更多信息。

## 疑问

```
1.补全和代码片段的区别？

补全（Completion）	                            代码片段（Snippet）
自动建议你可能要输入的代码	                       插入预定义的代码模板
通常动态生成	                                  通常是静态模板
输入 cons，提示 console、
const、console.log	                             输入 for，插入整个 for 循环结构
```
### 对比：VS Code API vs LSP

| 功能需求                  | VS Code API（插件前端）  | LSP 服务端（推荐）               |
| --------------------- | ------------------ | ------------------------- |
| ✅ 自定义代码高亮（静态）         | 是（TextMate / 语法规则） | 否（LSP 不管语法染色）             |
| ✅ 悬停提示（Hover）         | 是                  | ✅ 是（标准 LSP 协议）            |
| ✅ 跳转定义                | 是                  | ✅ 是（`onDefinition`）       |
| ✅ 代码补全                | 是                  | ✅ 是（`onCompletion`）       |
| ✅ 诊断/错误检查             | 否（复杂）              | ✅ 是（`publishDiagnostics`） |
| ✅ 多语言共享逻辑             | 否（代码重复）            | ✅ 是（多语言共用一套服务）            |
| ✅ 可用于 Web IDE（Monaco） | 否                  | ✅ 是                       |
| ✅ Copilot、Cursor 类行为  | 只能部分模仿             | ✅ 与 AI 可无缝结合              |

### 实践建议
 你的任务是多个语言/文件后缀 —— 推荐这么做：
1. 写一个语言服务器（LSP 服务），用 TypeScript 或 Node.js 编写；

2. 在这个 LSP 服务中：

    - 根据文件后缀（或语言 ID）实现不同的跳转/补全/提示逻辑；

    - 或共享一套通用逻辑；

    - 写一个 VS Code 插件前端（extension.ts）

3. 启动这个 LSP 服务；

注册所有需要的语言后缀（.abc、.xyz 等）；

每个用一个 documentSelector 指向相同的 LSP 服务；

4. 高亮仍需使用 .tmLanguage.json 或 .plist（TextMate），这是独立于 LSP 的内容；

每个语言可注册自己的语法文件；