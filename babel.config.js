module.exports = function (api) {
  api.cache(true)

  return {
    plugins: [
      'inline-dotenv',
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ts', '.tsx', '.js'],
          alias: {
            atoms: './src/components/atoms',
            molecules: './src/components/molecules',
            organisms: './src/components/organisms',
            templates: './src/components/templates',
            layouts: './src/components/layouts',
            contexts: './src/contexts',
            hooks: './src/hooks',
            integration: './src/integration',
            navigation: './src/navigation',
            screens: './src/screens',
            src: './src',
            utils: './src/utils',
            'test-utils': './test-utils'
          }
        }
      ],
      // Reanimated plugin has to be the last item in the plugins array
      'react-native-reanimated/plugin'
    ],
    presets: ['babel-preset-expo', '@babel/preset-typescript']
  }
}
