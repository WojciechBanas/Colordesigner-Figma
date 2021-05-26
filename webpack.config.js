const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const CopyPlugin = require('copy-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin')
module.exports = (env, argv)=>{
    return {
        entry: {
            main: './src/main.js',
            ui: './src/ui.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: '[name].js',
            publicPath: 'dist',
            clean: true,
        },
        devServer: {
            writeToDisk: true,
            quiet: true,
            hot: false,
            liveReload: false,
        },
        mode: argv.mode == 'production' ? 'production' : 'development',
        devtool: argv.mode == 'production' ? false : 'inline-source-map',
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
                inject: 'body',
                cache: false
            }),
            new HtmlInlineScriptPlugin([
                /ui.js$/
            ])
        ]

    }
}
