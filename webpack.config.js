const webpack = require('webpack')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const CopyPlugin = require('copy-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin')
module.exports = {
    entry: {
        main: './src/main.js',
        ui: './src/ui.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: 'dist'
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        quiet: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new CopyPlugin({
            patterns: [{ from: 'static', to: '' }]
        }),
        new HtmlWebpackPlugin({
            template: './src/ui.html',
            filename: 'ui.html',
            inlineSource: '.(js)$',
            chunks: ['ui'],
            inject: 'body'
        }),
        new HtmlInlineScriptPlugin([
            /ui.js$/
        ])
    ]
}
