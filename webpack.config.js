const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let config =  {
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
      ]
    },
    optimization: {
        splitChunks: { chunks: "all" }
    },
}
module.exports = (env, argv) => {
    let mode = (argv.mode === 'production') ? 'production': 'development'
    return {
        ...config,
        devtool: mode==='development' ? 'eval' : false,
        mode: mode
    }
};