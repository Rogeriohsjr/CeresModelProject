const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    return [{
        mode: isDevBuild ? 'development' : 'production',
        stats: { modules: false },
        resolve: { extensions: ['.js'] },
        entry: {
            vendor: [
                'bootstrap',
                'bootstrap/dist/css/bootstrap.min.css',
                'html5-boilerplate/dist/css/main.css',
                'event-source-polyfill',
                'isomorphic-fetch',
                'vue',
                'vue-router',
                'jquery',
            ],
        },
        module: {
            rules: [
                {
                    test: /\.css(\?|$)/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        "css-loader"
                    ]
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/,
                    use: 'url-loader?limit=100000'
                }
            ]
        },
        output: {
            path: path.join(__dirname, 'wwwroot', 'dist'),
            publicPath: 'dist/',
            filename: '[name].js',
            library: '[name]_[hash]'
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "vendor.css"
            }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jquery: "jquery",
                "window.jQuery": "jquery",
                jQuery: "jquery",
                Popper: ['popper.js', 'default']
            }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
            new webpack.DllPlugin({
                path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"'
            }),
        ].concat(isDevBuild ? [] : [
            //new UglifyJsPlugin(),
        ])
    }];
};
