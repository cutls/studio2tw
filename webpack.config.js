const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const configPromise = new Promise(async function (resolve, reject) {
    resolve({
        entry: './src/js/index.js',
        mode: 'production',
        stats: {
            children: true,
        },
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    loader: 'pug-loader',
                    options: {
                        pretty: true,
                        self: true,
                    },
                },
                {
                    test: /\.jpg$/,
                    use: 'file-loader',
                },
                {
                    test: /\.png$/,
                    use: 'file-loader',
                },
                {
                    test: /\.svg$/,
                    use: 'file-loader',
                },
                {
                    test: /\.scss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                },
            ],
        },
        output: {
            path: path.join(__dirname, 'dist'),
            publicPath: '',
            filename: 'main.[contenthash].js',
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'top-style.[contenthash].css',
            }),
            new HtmlWebpackPlugin({
                template: './src/views/index.pug',
                filename: 'index.html',
            }),
            new HtmlWebpackPugPlugin(),
        ],
    })
})

module.exports = configPromise
