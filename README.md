<div align="center">
  <img src="./assets/overview2.png" width="400" />

![license](https://img.shields.io/badge/license-MIT-blue.svg)
![npm](https://img.shields.io/badge/npm-v5.4.2-blue.svg)
[![Build Status](https://travis-ci.org/xdlrt/xproxy.svg?branch=master)](https://travis-ci.org/xdlrt/xproxy)
[![Coverage Status](https://coveralls.io/repos/github/xdlrt/xproxy/badge.svg?branch=master)](https://coveralls.io/github/xdlrt/xproxy?branch=master)
[![inspired by](https://img.shields.io/badge/inspired%20by-xswitch-lightgrey.svg)](https://github.com/yize/xswitch)

</div>

[English README](./README-EN.md)

一个通过制定的规则来重定向请求的 Chrome 浏览器插件，灵感来源于[xswitch](https://github.com/yize/xswitch)，并且利用 React 重构整个项目。

## 特点

- 规则组开关控制
- 灵活的单个规则开关控制
- 通过规则来控制请求的url重定向
- 规则灵活，支持字符串匹配和正则表达式
- 当此插件生效时禁用浏览器缓存
- UI 界面更加简洁易用
- 完备的单元测试来保障重定向规则的准确性

## 安装 

你可以下载最新的发行版并在 Chrome 浏览器中以未打包的形式安装。

## 使用

<p align="center">
  <img src="./assets/usage3.png" width="400" />
</p>

- 规则1：
请求 `https://baidu.com` 时，浏览器会将它重定向为 `https://taobao.com`.

- 规则2：
请求 `https://g.alicdn.com/a.js` 时，浏览器会将它重定向为 `https://aliyun.alicdn.com/a.js`

详细用法请见：[wiki/usages](https://github.com/xdlrt/xproxy/wiki/usages)

tips: 目前只支持 http(s) 协议请求的转发

## License
[MIT](https://opensource.org/licenses/MIT) © [yeshu.lrt](https://xdlrt.github.io/)
