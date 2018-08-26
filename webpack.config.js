const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 2,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                includePaths: [path.join(__dirname, 'src', 'styles')],
                            },
                        },
                    ],
                }),
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new ExtractTextPlugin('styles.css'),
    ],
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0',
        port: 2000,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        open: true,
        proxy: {
          '/imgur': {
            'target': 'https://api.imgur.com',
            'pathRewrite': { '^/imgur': '' },
            'changeOrigin': true,
            'secure': false
          }
        }
    }
};
