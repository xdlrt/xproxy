# dn-template-react-chrome-extension

一个用于 dawn 工程化工具的极简模板，使用 React 构建用户 chrome 浏览器插件。

## 技术栈说明
默认使用 mota 管理数据流，使用 styled-components 管理样式。
其中模板只提供了最简的项目文件及目录，数据流和样式管理方案可根据喜好自行修改。

## 起步

使用这个模板需要先安装好 [Dawn](https://github.com/alibaba/dawn)

### 初始化
```
mkdir demo && cd demo
dn init -t react-chrome-extension
```

通过如上命令便可以完成项目的初始化

### 开发
```
dn dev
```

### 构建
```
dn build
```

## 调试

打开 `chrome://extensions/` 加载未打包的插件，选择 build 目录即可。

### 调试 popup.html

把下面网址中的id部分替换为你的扩展程序id即可，直接在浏览器中打开 `chrome-extension://{id}/popup.html`。

tips: background 页需要手动刷新应用更改
