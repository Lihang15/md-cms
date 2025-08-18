# Theia 

Theia支持vscode插件和Theia插件，并可以通过Api的方式，修改Theia的整体布局

vscode插件是不可以修改vscode核心视图的，只能在vscode视图基础上累加

# Theia官方示例代码结构
![](/assets/theia/3.jpg)

# 目前开发遇到的问题

![](/assets/theia/1.jpg)


## 顶端新定义的按钮在浏览器正常，在electron会被隐藏

![](/assets/theia/2.jpg)

## 本地加载vscode插件失败


## theia 的api能力
想通过api去掉，theia的默认编辑菜单目前没能成功，应该不支持
想通过api修改theia的核心布局还是不太行。比如加一个像eclipse那样的二级菜单，很难实现，
如果在一级菜单旁边加菜单，自定义按钮能实现