# Intellij插件开发指南

## 环境准备，我用的mac

1. IntelliJ IDEA 版本
```
2024.3.7 (Community Edition)
下载IDEA-> https://plugins.jetbrains.com/docs/

2.Java 版本
jdk 17
下载java-> https://www.oracle.com/java/technologies/downloads/

3.在IDEA里下载 Plugin DevKit 插件，用于创建插件模版

修改配置如下
3.1. Gradle版本8.11.1

3.2.插件版本
1.17.4  1.x版本 
```

## 开发插件需要注意的点

```
1.目前官方推荐
IDEA2022.3+  Java 17
IDEA 2024.2+  Java 21   

2.插件版本
新版本插件开发 官方模版都是 2.x高版本，但是没跑起来，2.x版本的api起码需要java21

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

## 代码结构
![](/assets/intellij/demo.png)
