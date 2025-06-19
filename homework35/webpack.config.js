const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin' )
const TerserPlugin = require('terser-webpack-plugin' );
const EslintWebpackPlugin = require('eslint-webpack-plugin');

new EslintWebpackPlugin ({
    extensions: ['js'],
    fix: true
})

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`;

const optimization = () =>
    ({ 
    splitChunks: {chunks: 'all'},
    minimizer: [
    new CssMinimizerWebpackPlugin (),
    new TerserPlugin()
    ]
});

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['./main.js'],
        stat: './statistics.ts'
    },
    mode: 'development',
    target: 'web',
    optimization: optimization (),
    output: {
        filename: filename('js'),
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
            filename: './styles/'+filename('css')
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
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {loader: 'babel-loader',
                options: {presets: [
                '@babel/preset-env',
                '@babel/preset-typescript'
                ]}
                }
            }, 
            {
                test: / \.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource',
            },
            {
                test: /\.css$/,
                use: [{loader: MiniCssExtractPlugin.loader},'css-loader']  // 'style-loader' 
            },
            {
                test: /\.s[ac]ss$/,
                use: [{loader: MiniCssExtractPlugin.loader, options: {publicPath: ''}},
                'css-loader', 'sass-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,              
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        '@babel/plugin-proposal-class-properties'
                    ]
                  }
                }
            }
        ]
    },
    devServer: {
        port: 4200,
        hot: false
    },
}