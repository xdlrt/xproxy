# 使用说明

注意：
- 不填写 redirect url 是不会触发重定向的
- `chrome-extension://` 开头的 url 是不会触发重定向的
- 规则未选中是不会触发重定向的
- 目前只支持 http(s) 的请求转发

## 示例
分为两种模式，一种为全匹配模式，一种为正则表达式模式。

### 全匹配模式
全匹配模式较为简单，当前请求的 url 中包含 origin url 规则时，会将 origin url 的规则对应替换为 redirect url 规则。

例如：
```
url: g.alicdn.com
redirectUrl: g.alicdn.com?t=2
```

对应转发的结果如下：

| origin | redirect |
| ---------- | --- |
| https://g.alicdn.com |  https://g.alicdn.com?t=2 |
| https://g.alicdn.com?t=1 | https://g.alicdn.com?t=2 |
| https://g.alicdn.com#aaaa | https://g.alicdn.com?t=2#aaaa |
| https://g.alicdn.com/??a.js,b.js,c.js | https://g.alicdn.com?t=2/??a.js,b.js,c.js |

### 正则表达式模式
正则表达式模式中，origin url 规则和 rediect url 规则均可使用正则表达式进行转发规则的制订。

例如：
```
url: g.(\\w+).com
redirectUrl: g.alicdn.com?t=2
```

对应的转发结果如下：

| origin | redirect |
| ---------- | --- |
| https://g1.alicdn.com | none |
| https://g.alicdn.com |  https://g.alicdn.com?t=2 |
| https://g.alicdn.com?t=1 | https://g.alicdn.com?t=2 |
| https://g.alicdn.com#aaaa | https://g.alicdn.com?t=2#aaaa |
| https://g.alicdn.com/??a.js,b.js,c.js | https://g.alicdn.com?t=2/??a.js,b.js,c.js |

又例如：

```
url： (.*)g.(.*).com\\?t=1
redirectUrl： $1g.alicdn.com?t=2
```

| origin | redirect |
| ---------- | --- |
| https://g1.alicdn.com | none |
| http://g.alicdn.com?t=1&k=2 |  http://g.alicdn.com?t=2&k=2|
| https://g.alicdn.com?t=1 | https://g.alicdn.com?t=2 |
| https://g.alicdn.com#aaaa | none |
| https://g.alicdn.com?t=1/??a.js,b.js,c.js | https://g.alicdn.com?t=2/??a.js,b.js,c.js |