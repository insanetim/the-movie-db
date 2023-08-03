module.exports = {
  presets: [
    [
      '@babel/env',
      {
        corejs: '3.32',
        useBuiltIns: 'usage'
      }
    ],
    ['@babel/typescript'],
    [
      '@babel/react',
      {
        runtime: 'automatic'
      }
    ]
  ]
}
