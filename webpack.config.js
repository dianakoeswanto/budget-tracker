const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
  entry: '/public/index.js',
  output: {
    path: __dirname + '/public/dist',
    filename: 'bundle.js',
    publicPath: ""
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new WebpackPwaManifest({
      fingerprints: false,
      name: 'Budget Tracker',
      short_name: 'Budget Tracker',
      description: 'An application that allows you to track your transactions',
      background_color: '#01579b',
      theme_color: '#ffffff',
      'theme-color': '#ffffff',
      start_url: '/',
      icons: [
        {
          src: path.resolve(
            __dirname,
            "public/icons/icon-512x512.png"
            ),
          size: [96, 128, 144, 152, 192, 384, 512]
        }
      ]
    }),
  ],
};

module.exports = config;
