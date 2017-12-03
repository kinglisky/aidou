module.exports = {
  manifest_version: 2,
  name: 'AIDUO',
  version: '1.0',
  description: '斗图插件',
  background: {
    scripts: [
      'vendor.js',
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
        '*://github.com/*',
        // '*://git.elenet.me/*',
        '*://www.baidu.com/*'
        // '*://www.google.com/*'
      ],
      js: [
        'vendor.js',
        'content.js'
      ]
    }
  ],
  web_accessible_resources: [
    'content.html'
  ],
  content_security_policy: `script-src 'self' 'unsafe-eval'; object-src 'self'`
}
