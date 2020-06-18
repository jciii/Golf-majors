const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './client.jsx',
  mode: 'development',
  watch: true,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'public', 'javascript'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        use: ['babel-loader'],
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: true,
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      API_BASE_URL: JSON.stringify('http://localhost:1337/api'),
    })
  ],
}
