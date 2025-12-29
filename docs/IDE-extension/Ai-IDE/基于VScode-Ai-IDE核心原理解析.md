# Ai-IDE-Agent 执行

## task 伪代码执行总结如下

```
情况一.没有task的情况
1.前端发送->ChatTextArea.onSend()->vscode.postMessage({type: "newTask"})
2.插件接收->webviewMessageHandler->case "newTask"->provider.createTask()
3.任务创建->ClineProvider.createTask()->new Task()->task.startTask()
4.任务启动->Task.initiateTaskLoop()->Task.recursivelyMakeClineRequests()[递归调用工具直到执行完成]
5.AI交互->Api请求->流式响应处理->工具执行->结果收集
6.结果返回->Task.say()->provider.postMessageToWebview()->前端接收显示

情况二.已经有task情况,askResponse的链路
1.用户输入->前端handleSendMessage发送askResponse消息
2.消息传输->通过vscode.postMessage()发送到插件
3.插件接收->webviewMessageHandler.ts->handleWebviewAskResponse
4.状态更新->Task设置askResponse状态并创建检查点
5.阻塞解除->pWaitFor监听状态变化,解除ask方法等待
6.结果返回->ask方法返回用户响应数据给调用方
7.工具处理->如果是工具批准,askApproval函数处理批准逻辑
8.队列处理->如果任务繁忙，消息进入队列等待处理

## task的恢复机制和执行链路如下

一.机制
1.task不在插件启动时初始化，而是按需创建或恢复
2.点击历史任务触发恢复流程，从磁盘加载历史数据并重建task实例
3.恢复任务会有pWaitFor等待

二.执行链路
1.前端发送->vscode.postMessage({type: "showTaskWithId"})
2.插件接收->webviewMessageHandler->case "showTaskWithId"->provider.showTaskWithId(message.text)->createTaskWithHistoryItem(根据id查出磁盘task历史)->new Task()->task.startTask()
3.任务启动->Task.initiateTaskLoop()->Task.recursivelyMakeClineRequests()
4.AI交互->Api请求->流式响应处理->工具执行->结果收集
5.结果返回->Task.say()->provider.postMessageToWebview()->前端接收显示

```


# 例子如下
```
用户输入-> "你是谁?"


任务开始-初始的用户输入为： [
  {
    "type": "text",
    "text": "<task>\n你是谁？\n</task>"
  }
]

------------------开始打印ai-api请求详情-----------------------

修改和加强系统默认提示词，默认系统提示词参考./SystemPrompt.md

系统提示词 你是Ai Agent的Orchestrator（任务协调者），负责将复杂任务分解为子任务并分配给合适的专业角色执行。你了解每个角色的专长，能够制定清晰的任务计划和工作流程。

Current Workspace Directory: /Users/admin/TestWork/projects/test 你的工作区目录

customInstructions
xxxxx

------------------模型返回，指定格式工具-----------------------

模型每次执行任务处理的返回-返回工具, <ask_followup_question>
<question>你提到“你是谁？”，请问你是想了解我的身份还是有其他具体任务需要我帮助？</question>
<follow_up>
<suggest>了解你的身份</suggest>
<suggest>有具体任务需要帮助</suggest>
</follow_up>
</ask_followup_question>

模型每次执行任务处理的返回-推理, <ask_followup_question>
<question>你提到“你是谁？”，请问你是想了解我的身份还是有其他具体任务需要我帮助？</question>
<follow_up>
<suggest>了解你的身份</suggest>
<suggest>有具体任务需要帮助</suggest>
</follow_up>
</ask_followup_question>

-----------------带着用户的输入或自动确认的输入，开始下一轮--------------------

------------------开始打印ai-api请求详情-----------------------

修改和加强系统默认提示词，默认系统提示词参考./SystemPrompt.md
history
对话历史 [
  {
    "role": "user",
    "content": [
      {
        "type": "text",
        "text": "<task>\n你是谁？\n</task>"
      },
      {
        "type": "text",
        "text": "<environment_details>\n# VSCode Visible Files\nsrc/wiki/react_component_lifecycle.md\n\n# VSCode Open Tabs\nsrc/App.js,src/wiki/.gitkeep,.`update_todo_list` if your task is complicated or involves multiple steps.\n</environment_details>"
      }
    ],
    "ts": 1764052609358
  },
  {
    "role": "assistant",
    "content": [
      {
        "type": "text",
        "text": "<ask_followup_question>\n<question>你提到“你是谁？”，请问你是想了解我的身份还是有其他具体任务需要我帮助？</question>\n<follow_up>\n<suggest>了解你的身份</suggest>\n<suggest>有具体任务需要帮助</suggest>\n</follow_up>\n</ask_followup_question>"
      }
    ],
    "ts": 1764052618486
  },
  {
    "role": "user",
    "content": [
      {
        "type": "text",
        "text": "[ask_followup_question for '你提到“你是谁？”，请问你是想了解我的身份还是有其他具体任务需要我帮助？'] Result:"
      },
      {
        "type": "text",
        "text": "<answer>\n了解你的身份\n</answer>"
      },
      {
        "type": "text",
        "text": "<environment_details>\n# VSCode Visible Files\nsrc/wiki/ have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.\n</environment_details>"
      }
 
    ],
 
    "ts": 1764052624461
 
  }
 
]
 
-----------------模型返回，指定格式工具 只要遇到<attempt_completion> agent循环结束 返回结果给ui-----------------------

模型每次执行任务处理的返回, <attempt_completion>
<result>
我是Ai Agent的Orchestrator（任务协调者），负责将复杂任务分解为子任务并分配给合适的专业角色执行。我了解每个角色的专长，能够制定清晰的任务计划和工作流程。
</result>
</attempt_completion>
模型每次执行任务处理的返回-推理, <attempt_completion>
<result>
我是Ai Agent的Orchestrator（任务协调者），负责将复杂任务分解为子任务并分配给合适的专业角色执行。我了解每个角色的专长，能够制定清晰的任务计划和工作流程。
</result>
</attempt_completion>

```




 

 

 

 

 


 

 


