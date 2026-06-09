1. workspace  state. 用于存储指定项目的数据

context.workspaceState.update("lastFile", "/src/index.ts")

2. global  state  用于存储所有项目共享的数据

context.globalState.update("token", "xxxxx")
const token = context.globalState.get("token")

3. VSCode 会给每个扩展一个 可写的磁盘目录，ai-task的历史数据可存文件到这个目录，用于恢复

const storagePath = context.globalStorageUri.fsPath

