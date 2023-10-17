module.exports = {
  presets: [
    [
      '@babel/env',
      {
        corejs: '3.33',
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
