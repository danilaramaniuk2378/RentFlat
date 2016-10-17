var webpack = require('webpack');
var path = require('path');

config = {
    context: path.resolve(__dirname, 'client'),
    entry: './index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    plugins: [
        new webpack.OldWatchingPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'ng-annotate?add=true!babel?presets[]=es2015',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'raw'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(wav|mp3)$/,
                loader: 'file-loader'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }
        ]
    },
    devServer: { // TODO: explain for yourself
        hot: true,
        proxy: {
            '*': 'http://localhost:3000'
        }
    }
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
    config.devtool = null;
}

module.exports = config;
