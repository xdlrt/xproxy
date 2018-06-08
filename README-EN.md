<div align="center">
  <img src="./assets/overview2.png" width="400" />

![license](https://img.shields.io/badge/license-MIT-blue.svg)
![npm](https://img.shields.io/badge/npm-v5.4.2-blue.svg)
[![Build Status](https://travis-ci.org/xdlrt/xproxy.svg?branch=master)](https://travis-ci.org/xdlrt/xproxy)
[![Coverage Status](https://coveralls.io/repos/github/xdlrt/xproxy/badge.svg?branch=master)](https://coveralls.io/github/xdlrt/xproxy?branch=master)
[![inspired by](https://img.shields.io/badge/inspired%20by-xswitch-lightgrey.svg)](https://github.com/yize/xswitch)

</div>

A Chrome extension for forward requests by rules which was inspired by [xswitch](https://github.com/yize/xswitch) and reconstruct with React.

## The problem

In the daily development and debugging process, due to the file change of the test environment, the static files on the CDN are needed, and they need to be republished after modification. This is very inefficient and cumbersome. Therefore, it is necessary to forward static files such as CSS and JS on the online or test environment to the local server, so you need a convenient tool that can manage url forwarding.

## Features

- Group switch control
- Flexible single-rule switch control
- Redirect request.url by forwarding rules
- Flexible rules, support for string matching and regular expressions
- Disable browser cache when this tool is activated
- A more friendly UI interface
- Complete unit testing to ensure accuracy of forwarding rules

## Install 

You can download the lastest realease and load unpacked extension in Chrome.

## Usage

<p align="center">
  <img src="./assets/usage3.png" width="400" />
</p>

- rule 1:
request `https://baidu.com` and browser will redirect it to `https://taobao.com`.

- rule 2:
request `https://g.alicdn.com/a.js` and browser will redirect it to `https://aliyun.alicdn.com/a.js`.

more details will be find here: [usages](./doc/usages.md)

tips: only support forwarding http(s) request urls

## License

[MIT](https://opensource.org/licenses/MIT) © [yeshu.lrt](https://xdlrt.github.io/)
