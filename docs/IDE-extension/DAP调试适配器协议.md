# DAP调试适配器协议浅析

DAP（Debug Adapter Protocol，调试适配器协议）在 VS Code 中的应用场景非常核心。简单说，它是 VS Code 调试功能的底层协议，把 编辑器（VS Code 前端） 和 调试器（后端调试器进程） 解耦，让 VS Code 可以支持多种语言和运行时的调试。
统一调试扩展协议（跨 IDE 使用，DAP 本质是独立于 VS Code 的协议，这样同一个调试适配器可以被多个 IDE 使用，而不是单独适配。

## 原理如下

调试 UI 与调试逻辑分离

VS Code 内置的调试 UI（断点面板、变量面板、调用栈、调试控制台）不依赖具体语言。

UI 通过 DAP 的消息（JSON-RPC）与调试适配器通信。

比如：

用户在 VS Code 中点“单步执行”，VS Code 发送 next 消息给调试适配器。

调试适配器调用底层调试器（如 gdb 的 step），然后再通过 DAP 返回结果，VS Code UI 才更新。

场景：你在调试时点击 Step Over，看到代码逐行跳动，这就是通过 DAP 把 VS Code 的 UI 操作传给后端调试器。




## vscode远程调试是什么？有什么使用场景？和DAP有啥关系

1. vscode支持远程调试，和DAP协议无关，需要安装ssh插件配合
比如打开本地vscode，，直接连接上ssh，就可以直接调试远程电脑的test.cpp文件，这个文件会通过ssh映射回vscode客户端，本质上test.cpp并不在本地磁盘上

### 远程调试使用场景
1.有些程序 只能在特定的硬件/操作系统环境下运行

