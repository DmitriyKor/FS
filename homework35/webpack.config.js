const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './main.js',
    mode: 'development',
    target: 'web',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, './src/assets/icon.png'),
                to: path.resolve(__dirname, './dist/assets')
            }]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(png| jpe?g|svg|gif|webp)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[hash].[ext]',
                },
            },
            {
                test: /\.css$/,
                use: [{loader: MiniCssExtractPlugin.loader} ,'css-loader']
            }
        ]
    },
    devServer: {
        port: 4200,
        hot: false
    },
}