# aidou

一款便于在 github、gitlab、与个技术社区评论发表情包斗图的插件，可快速搜索生成表情包链接所需的表情链接。

插件地址：https://chrome.google.com/webstore/detail/aidou/kidfkhcacngpkgkagdmbkncecbnadajb?hl=zh-CN


> 默认快捷键为：

快捷键 `command + shift + \`


> 支持链接格式为：

`Markdown` `UBB` `HTML` `普通的图片链接`


> 使用的表情包服务为：

http://pic.sogou.com/pic/emo


> 用到的图床服务为：

`https://sm.ms/` (公开不稳定)

`http://picupload.service.weibo.com/interface/pic_upload.php` （不公开相对稳定，需要用户登录微博使用）


最早想写个在方便在 github 上面发表情的 chrome 插件，这样喷代码和小伙伴讨论的时候也会好玩点。找了几个表情包服务，最后感觉搜狗表情包的质量比较好，然后选择了搜狗表情。但搜狗表情生成图片的链接不能直接往 github 上面粘贴，因为搜狗表情生成链接只是个资源链接，响应头里面没带有 `content-type:image/jpeg`，所以比较蛋疼，需要图床转换一下。emmm....