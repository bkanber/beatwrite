var path = require("path");
var webpack = require('webpack')
var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");


var config = {

    externals: {
        'Config': JSON.stringify(process.env.ENV === 'production' ? {
            serverUrl: "http://www.beatwrite.com",
            isProduction: true
        } : {
            serverUrl: "http://localhost:5000",
            isProduction: false

        })
    },
    entry: SRC_DIR + "/app/index.js",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            }
        ]
    }
};


console.log('process.env.NODE_ENV is', process.env.ENV)
module.exports = config;