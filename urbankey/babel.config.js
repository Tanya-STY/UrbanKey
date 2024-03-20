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
  };
  