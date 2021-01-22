const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
require("@babel/polyfill");

module.exports = {
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
        filename: "bundle.[contenthash].js",
        path: path.resolve(__dirname, "../build")
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: "/node_modules",
                use: ['babel-loader'],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: true}
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'] //use에 있는 loader 순서는 오른쪽에서 왼쪽 순서로 실행이 됩니다.
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.xlsx$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'downloads/'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html', // public/index.html 파일을 읽는다.
            filename: 'index.html', // output으로 출력할 파일은 index.html 이다.
            favicon : './public/favicon.ico'
        }),
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
        new CleanWebpackPlugin()
    ]
};