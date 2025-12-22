# Intellij插件开发指南<推荐用Intellij 2.x>

## Intellij 1.x 环境准备，我用的Mac电脑

```
1. IntelliJ IDEA 版本
2024.3.7 (Community Edition)
下载IDEA-> https://plugins.jetbrains.com/docs/

2.Java 版本
jdk 17
下载java-> https://www.oracle.com/java/technologies/downloads/

3.在IDEA里下载 Plugin DevKit 插件，用于创建插件模版
插件安装好后，会在IDEA左侧出现IDE Plugin的 ui选项，点击即可

-3.1. Gradle版本8.11.1 不需要手动下载并配置全局的gradle，用自带的gradle-wrapper
修改配置如下，如果网络慢可选择手动下载，并指定本地包位置
修改yourPluginProjectRoot/gradle/wrapper/gradle-wrapper.properties
distributionUrl=file:///Users/zhangjingjing/Downloads/gradle-8.11.1-bin.zip


-3.2.插件版本  可修改gradle.build.kts配置
1.17.4  1.x版本 
```
### 运行插件
环境都没问题，点击run plugin，会弹出会根据你的配置启动一个自动运行你的插件的IDEA/Android Studio的调试终端
![](/assets/intellij/run.png)
### 代码结构
![](/assets/intellij/demo.png)

## Intellij 2.x 环境准备，我用的Mac电脑

```
1. IntelliJ IDEA 版本
2025.2.5 (Community Edition)
下载IDEA-> https://plugins.jetbrains.com/docs/

2.Java 版本
jdk 21
下载java-> https://www.oracle.com/java/technologies/downloads/

3.不再通过Plugin DevKit 插件，创建模版，插件模版没更新2.x版本的配置
直接下载官方2.x版本插件
https://github.com/JetBrains/intellij-platform-plugin-template


-3.1. Gradle版本9.2.1 不需要手动下载并配置全局的gradle，用自带gradle-wrapper
修改配置如下，如果网络慢可选择手动下载，并指定本地包位置
修改yourPluginProjectRoot/gradle/wrapper/gradle-wrapper.properties
distributionUrl=file:///Users/zhangjingjing/Downloads/gradle-9.2.1-bin.zip


-3.2.插件版本  可修改gradle.build.kts配置
2.4.0  2.x版本 
```

## 开发插件需要注意的点

```
1.目前官方推荐
IDEA2022.3+  Java 17
IDEA 2024.2+  Java 21   

2.插件版本
新版本插件开发 官方模版都是 2.x高版本，2.x版本的api最好安装java21，避免出现问题
2.x版本的配置项和1.x的配置项有变化，需注意

3.插件开发误区
插件开发 和IDEA的版本没关系，主要是api的兼容
主要配置java和gradle版本，还有插件版本<含插件api>

4.调试方式
插件启动起来会启动一个虚拟的idea客户端，用来调试

5.插件推荐语言
插件开发支持kotlin/java，也可以混合写
官方推荐用kotlin，让开发者在 JVM 上写更安全、更少 Bug、更高效的代码、100% Java 互操作
也就是写java也可以，kotlin的语法更简洁，java语法太啰嗦
```

## gradle/gradlew命令详解
./gradlew build  拉三方依赖 + 编译 + 测试 + 打包  
./gradlew clean  清理yourProject/build build目录下构建产物
./gradlew assemble 只打包
./gradlew tasks 查看所有
./gradlew dependencies 查看依赖项
./gradlew build --refresh-dependencies  强制忽略本地缓存，重新下载所有三方依赖

组合版本
./gradlew clean build --refresh-dependencies  99% 构建问题都能解决


IDEA 插件开发相关
./gradlew runIde 启动一个沙箱 IDEA（调试插件）
./gradlew buildPlugin 构建 IDEA 插件包（zip）
./gradlew verifyPlugin 校验插件兼容性