const path = require('path');

module.exports = {
  webpack(config, options) {
    config.resolve = {
      alias: {
        '@src': path.join(__dirname, 'src'),
        '@components': path.join(__dirname, 'src', 'components'),
        '@core': path.join(__dirname, 'src', 'core'),
        '@api': path.join(__dirname, 'src', 'core', 'api'),
        '@config': path.join(__dirname, 'src', 'core', 'config'),
        '@util': path.join(__dirname, 'src', 'core', 'util'),
        '@hooks': path.join(__dirname, 'src', 'hooks'),
        '@pages': path.join(__dirname, 'src', 'pages'),
        '@store': path.join(__dirname, 'src', 'store'),
        '@types': path.join(__dirname, 'src', 'types')
      },
      ...config.resolve
    };

    return config;
  }
};
