module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current', // important for Jest
        },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    // Add the '@babel/plugin-proposal-optional-chaining' plugin
    '@babel/plugin-proposal-optional-chaining',
  ],
};
