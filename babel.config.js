module.exports = {
  presets: [
    [
      '@babel/env',
      {
        corejs: '3.35.0',
        useBuiltIns: 'usage',
      },
    ],
    ['@babel/typescript'],
    [
      '@babel/react',
      {
        runtime: 'automatic',
      },
    ],
  ],
}
