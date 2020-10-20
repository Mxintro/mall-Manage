//控制console显示插件，开始时显示，上线时移除
const proPlugins = []
if (process.env.NODE_ENV === 'production') {
  proPlugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    ...proPlugins,
    '@babel/plugin-syntax-dynamic-import'
  ]
}
