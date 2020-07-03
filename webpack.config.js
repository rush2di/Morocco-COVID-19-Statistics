const webpack = require('webpack');
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path")

const devMode = process.env.NODE_ENV !== 'production';


module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "bundle.js",
		publicPath: './',
	},
	module: {
		rules: [
		{
			test: /\.js?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		},
		{
      test: /\.(scss|sass|css)$/,
      exclude: /(node_modules)/,
      loaders: [
        MiniCssExtractPlugin.loader,
      'css-loader',
      'sass-loader',
      ]
    },	
    {
      test: /\.(png|j?g|svg|gif)?$/,
      // use: 'file-loader'
      use: [
            {
              loader: 'file-loader',
              options: {
              name: '[name].[ext]',
              outputPath: 'assets',
              }
            }
          ]
    },
    {
      test: /\.(html)$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'html-loader',
        options: {minimize: true}
      }
    }
		]
	},
	devtool: "eval-cheap-module-source-map",
	devServer: {
		historyApiFallback: true,
    // contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 3000
  },
  plugins: [
    new HtmlWebPackPlugin({template: 'index.html'}),
    new CopyWebpackPlugin({
    	patterns: [
         	{ from: 'public/locales/ar/translation.json', to: path.resolve(__dirname, "dist/locales/ar/translation.json") },
         	{ from: 'public/locales/fr/translation.json', to: path.resolve(__dirname, "dist/locales/fr/translation.json") },
         ]}),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
}

// const webpack = require('webpack');
// const HtmlWebpackPlugin = require("html-webpack-plugin")
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const path = require('path')

// const devMode = process.env.NODE_ENV !== 'production';

// module.exports = {
// 	output:{
// 		path: path.resolve(__dirname, 'public'),
// 		publicPath: '/'
// 		},
// 	module: {
// 		rules: [
// 			{ test: /\.js$/ , exclude: /node_modules/ , loader: 'babel-loader'},
//       {
//       test: /\.(scss|sass|css)$/,
//       exclude: /(node_modules)/,
//       loaders: [
//         MiniCssExtractPlugin.loader,
//       'css-loader',
//       'sass-loader',
//       ]
//     },	
//       {
//       test: /\.(png|j?g|svg|gif)?$/,
//       use: [
//             {
//               loader: 'file-loader',
//               options: {
//               name: '[name].[ext]',
//               outputPath: 'assets',
//               }
//             }
//           ]
//     },
//     {
//       test: /\.(html)$/,
//       exclude: /(node_modules)/,
//       use: {
//         loader: 'html-loader',
//         options: {minimize: true}
//       }
//     }
// 		]
// 	},
// 	plugins: [
// 		new HtmlWebpackPlugin({
// 			template: 'index.html'
// 		}),
// 		new MiniCssExtractPlugin({
//       filename: devMode ? '[name].css' : '[name].[hash].css',
//       chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
//     })
// 	],
// 	devtool: "cheap-module-source-map",
// 	devServer: { historyApiFallback: true },
// }