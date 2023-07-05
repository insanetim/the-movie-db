module.exports = {
  presets: [
    [
      '@babel/env',
      {
        corejs: '3.31',
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
