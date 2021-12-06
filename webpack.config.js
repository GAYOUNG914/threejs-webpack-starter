const path = require('path');

module.exports = {
  mode: 'production',
  entry: [
    'whatwg-fetch',
    path.resolve(__dirname, 'src', 'App.js')
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        // exclude: /\/node_modules\//,
        use: {
          loader: 'file-loader',
        }
      },
      {
        test: /\.css$/,
        use: [ 
            'style-loader',
            'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
   },
};