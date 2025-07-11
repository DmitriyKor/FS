const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    //context: path.resolve(__dirname, 'src'),
    entry: './src/main.ts',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build[fullhash].js',
        clean: true
    },
    target: 'web',
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new MiniCssExtractPlugin({ filename: './styles/styles[fullhash].css'})
    ],
    devServer: {
        port: 4200,
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        devMiddleware: {
            writeToDisk: true
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,'css-loader']   
            },
            {
                 test: /\.js$/,
                 exclude: /node_modules/,  
                 use: {
                    loader: 'babel-loader', 
                    options: {
                        presets: ['@babel/preset-env']
                    }
                 }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {loader: 'babel-loader',
                options: {presets: [
                '@babel/preset-env',
                '@babel/preset-typescript'
                ]}
                }
            }, 
        ]
    },

}