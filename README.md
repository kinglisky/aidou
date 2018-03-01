# aidou

一款便于在 github、gitlab、与各技术社区评论发表情包斗图的插件，可快速搜索生成表情包链接所需的表情链接。

![](https://kinglisky.github.io/aidou/demo.png)


插件地址：https://chrome.google.com/webstore/detail/aidou/kidfkhcacngpkgkagdmbkncecbnadajb?hl=zh-CN

商店访问不了可以直接[下载](https://kinglisky.github.io/aidou/extension.zip)，然后解压出来，然后打开浏览器的扩展设置，加载已解压的扩展程序。

![](https://kinglisky.github.io/aidou/install.png)

> 默认快捷键为：

快捷键 `command + shift + \` 设置可以更改。


> 支持链接格式为：

`Markdown` `UBB` `HTML` `普通的图片链接`


> 使用的表情包服务为：

http://pic.sogou.com/pic/emo


> 用到的图床服务为：

https://sm.ms/ (公开不稳定)

http://picupload.service.weibo.com/interface/pic_upload.php （不公开相对稳定，需要用户登录微博使用）


最早想写个在方便在 `github` 上面发表情的 `chrome` 插件，这样喷代码和小伙伴讨论的时候也会好玩点。

找了几个表情包服务，最后感觉搜狗表情包的质量比较好，然后选择了搜狗表情。

搜到的表情可以直接点击，然后会生成复制链接。

但搜狗表情生成图片的链接不能直接往 `github` 上面粘贴，因为搜狗表情生成链接只是个资源链接，响应头里面没带有 `content-type:image/jpeg`，所以比较蛋疼，需要图床转换一下。

`github` 网站需要配置一下 👇。

![](https://i.loli.net/2018/03/01/5a97c8ed0eab0.png)

--------------------

## electron 版本

https://github.com/ywwhack/aidou-electron

小伙伴用 `electron` 开发了个 mac 桌面版的斗图，可以直接往微信上贴图，来吧！

![](https://i.loli.net/2018/03/01/5a97c89301756.jpg)

