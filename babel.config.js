module.exports = {
  presets: [
    [
      '@babel/env',
      {
        corejs: '3.34.0',
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
