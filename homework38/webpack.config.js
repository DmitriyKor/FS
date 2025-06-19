const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    //context: path.resolve(__dirname, 'src'),
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build[fullhash].js',
        clean: true
    },
    resolve: {
        extensions:['.js', '.jsx', '.ts', '.tsx', '...']
    },
   // target: 'web',
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
        },
        allowedHosts: ['all'],
        //disableHostCheck: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,'css-loader']   
            },
            {
                 test: /\.jsx?$/,
                 exclude: /node_modules/,  
                 use: {
                    loader: 'babel-loader', 
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                 }
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {loader: 'babel-loader',
                options: {presets: ['@babel/preset-env',
                '@babel/preset-typescript', '@babel/preset-react'
                ]}
                }
            }, 
        ]
    },

}