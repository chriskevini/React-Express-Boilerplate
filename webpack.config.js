const path = require("path");
// webpack.config.js
const Dotenv = require("dotenv-webpack");

module.exports = {
    mode: "production",
    entry: {
        main: path.resolve(__dirname, "./client/src/index.jsx"),
    },
    module: {
        rules: [{
                test: [/\.jsx$/],
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }],
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "./client/dist"),
        filename: "bundle.js",
    },
    plugins: [new Dotenv()],
};