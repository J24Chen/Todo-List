const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {

    /* 
    Standard module.exports arrgs. 
    mode: development | production
    entry: js file path for entry point (initial file that adds everything together)
    output: dist destination.
    */
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist" ),
        clean:true,
    },

    // Used for devTool and webpack-dev-serve 
    /* Used for legible error line messages and 
        to allow live website updates on any code changes 
    */
    devtool: "eval-source-map", 
    devServer: {
        watchFiles: ["./src/template.html"]
    },

    //Used for html-webpack-plugin
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        }),
    ],
    
    // Specifies rules on how to load .css files, .html files, etc.
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },

            {
                test: /\.html/i,
                loader: "html-loader",
            },  
        
        ],
    },
};