module.exports = {
  presets: [
    '@babel/typescript',
    '@babel/env',
    [
      '@babel/react',
      {
        runtime: 'automatic'
      }
    ]
  ]
}
