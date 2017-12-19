module.exports = {
  manifest_version: 2,
  name: 'AIDOU',
  version: '1.0',
  description: '方便搜索表情包并生成图片链接进行斗图',
  background: {
    scripts: [
      'background.js'
    ],
    persistent: true
  },
  permissions: [
    '*://*/',
    'storage',
    'contextMenus',
    'clipboardWrite',
    'clipboardRead'
  ],
  content_scripts: [
    {
      matches: [
        '<all_urls>'
      ],
      js: [
        'content.js'
      ]
    }
  ],
  web_accessible_resources: [
    'content.html'
  ],
  browser_action: {
    default_icon: {
      '19': 'icon.png',
      '38': 'icon.png'
    }
  },
  content_security_policy: `script-src 'self' 'unsafe-eval'; object-src 'self'`
}
