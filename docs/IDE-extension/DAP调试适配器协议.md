# DAP调试适配器协议浅析

DAP（Debug Adapter Protocol，调试适配器协议）在 VS Code 中的应用场景非常核心。简单说，它是 VS Code 调试功能的底层协议，把 编辑器（VS Code 前端） 和 调试器（后端调试器进程） 解耦，让 VS Code 可以支持多种语言和运行时的调试。
统一调试扩展协议（跨 IDE 使用，DAP 本质是独立于 VS Code 的协议，这样同一个调试适配器可以被多个 IDE 使用，而不是单独适配。

## 原理如下
```
┌────────────────────────┐
│ VS Code Debug UI       │
│ (断点 / 变量 / 步进)    │
└──────────▲─────────────┘
           │ DAP(JSON-RPC)
┌──────────┴─────────────┐
│ Debug Adapter           │  ← adapter.ts
│ (你写的)                │
└──────────▲─────────────┘
           │ LLDB / fake
┌──────────┴─────────────┐
│ 真正的调试器            │
└────────────────────────┘
```

调试 UI 与调试逻辑分离

VS Code 内置的调试 UI（断点面板、变量面板、调用栈、调试控制台）不依赖具体语言。

UI 通过 DAP 的消息（JSON-RPC）与调试适配器通信。

比如：

用户在 VS Code 中点“单步执行”，VS Code 发送 next 消息给调试适配器。

调试适配器调用底层调试器（如 gdb 的 step），然后再通过 DAP 返回结果，VS Code UI 才更新。

场景：你在调试时点击 Step Over，看到代码逐行跳动，这就是通过 DAP 把 VS Code 的 UI 操作传给后端调试器。

## 实际操作
- 1.vscode官方已经实现DAP-client，《点击断点ui，自动发送事件给到DAP-Server[adapter.ts]》用于接收标准JSON-RPC输出，并自动映射Vscode的调试ui
- 2.告诉 VS Code：debugger 启动哪个程序（adapter.ts）这个文件可分离出去，跨IDE
- 3.用户端，准备一个 launch.json 来触发 

```
debug-adapter-demo/
├─ package.json          (VS Code 插件)
├─ src/
│  ├─ extension.ts
│  └─ adapter.ts         重点：DebugSession
├─ out/
└─ .vscode/
   └─ launch.json


src/adapter.ts
import {
  DebugSession,
  InitializedEvent,
  StoppedEvent,
  Thread,
  StackFrame
} from "@vscode/debugadapter"

import { DebugProtocol } from "@vscode/debugprotocol"

export class KotlinDebugSession extends DebugSession {
  private static THREAD_ID = 1

  constructor() {
    super()
    this.setDebuggerLinesStartAt1(true)
    this.setDebuggerColumnsStartAt1(true)
  }

  /** VS Code -> initialize */
  protected initializeRequest(
    response: DebugProtocol.InitializeResponse
  ): void {
    response.body = {
      supportsConfigurationDoneRequest: true
    }
    this.sendResponse(response)
    this.sendEvent(new InitializedEvent())
  }

  /** VS Code -> launch */
  protected launchRequest(
    response: DebugProtocol.LaunchResponse,
    args: any
  ): void {
    // 这里本来应该启动 LLDB
    // 现在我们 fake 一下
    // args 接收用户launch.json的输入，比如调试的程序路径
    this.sendResponse(response)

    // 关键：主动告诉 VS Code “我停住了”
    setTimeout(() => {
      this.sendEvent(
        new StoppedEvent("breakpoint", KotlinDebugSession.THREAD_ID)
      )
    }, 500)
  }

  /** VS Code -> threads */
  protected threadsRequest(
    response: DebugProtocol.ThreadsResponse
  ): void {
    response.body = {
      threads: [
        new Thread(KotlinDebugSession.THREAD_ID, "Main Thread")
      ]
    }
    this.sendResponse(response)
  }

  /** VS Code -> stackTrace */
  protected stackTraceRequest(
    response: DebugProtocol.StackTraceResponse
  ): void {
    response.body = {
      stackFrames: [
        new StackFrame(
          1,
          "main",
          {
            name: "demo.kt",
            path: "/tmp/demo.kt"
          },
          1,
          1
        )
      ]
    }
    this.sendResponse(response)
  }
}

把 DebugSession 跑起来
src/extension.ts
import * as vscode from "vscode"
import { KotlinDebugSession } from "./adapter"

export function activate(context: vscode.ExtensionContext) {
  const factory: vscode.DebugAdapterDescriptorFactory = {
    createDebugAdapterDescriptor() {
      return new vscode.DebugAdapterInlineImplementation(
        new KotlinDebugSession()
      )
    }
  }

  context.subscriptions.push(
    vscode.debug.registerDebugAdapterDescriptorFactory("kotlin-demo", factory)
  )
}

export function deactivate() {}


package.json
{
  "name": "kotlin-debug-demo",
  "version": "0.0.1",
  "engines": { "vscode": "^1.80.0" },
  "activationEvents": ["onDebug"],
  "main": "./out/extension.js",
  "contributes": {
    "debuggers": [
      {
        "type": "kotlin-demo",
        "label": "Kotlin Demo Debugger"
      }
    ]
  },
  "dependencies": {
    "@vscode/debugadapter": "^1.63.0",
    "@vscode/debugprotocol": "^1.63.0"
  }
}


用户侧 launch.json
{
  "name": "Kotlin Demo",
  "type": "kotlin-demo",
  "request": "launch",
  "program": "${workspaceFolder}/build/bin/app.kexe",
  "cwd": "${workspaceFolder}",
  "args": ["--port", "8080"]
}




```







## vscode远程调试是什么？有什么使用场景？和DAP有啥关系

1. vscode支持远程调试，和DAP协议无关，需要安装ssh插件配合，可以下载cpp插件，里面自带cpp调试器，
比如打开本地vscode，，直接连接上ssh，就可以直接调试远程电脑的test.cpp文件，这个文件会通过ssh映射回vscode客户端，本质上test.cpp并不在本地磁盘上

### 远程调试使用场景
1.有些程序 只能在特定的硬件/操作系统环境下运行

