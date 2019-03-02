const path = require('path');

module.exports = {
  mode: 'development',
  context: path.join(__dirname, './'),
  entry: './app/app.jsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx$/, 
        exclude: /node_modules/,
        loader: "babel-loader" 
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader', options: { hmr: true } },
          'css-loader'
        ]
      }
    ],
  },
};