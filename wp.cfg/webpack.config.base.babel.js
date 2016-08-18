import webpack from "webpack";
import path from "path";
const
    {CommonsChunkPlugin, UglifyJsPlugin} = webpack.optimize,
    {ProvidePlugin, DefinePlugin} = webpack;

export default {
    entry: {
        common: ["react", "react-dom", "lodash"]
    },
    output: {
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },
    module: {
        loaders: [{
            test   : /\.jsx?$/,
            loaders: [
                "react-hot",
                "babel?presets[]=react,presets[]=es2015,presets[]=stage-0"
            ],
            exclude: /node_modules/
        }, {
            test  : /\.s[ac]ss$/,
            loader: "style!css?module&localIdentName=[name]__[local]__[hash:base64:10]!sass",
            exclude: /node_modules/
        }, {
            test  : /\.(jpe?g|svg|png)$/,
            loader: "url?limit=10000&name=/images/[hash:20].[ext]",
            exclude: /node_modules/
        }]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "../src")]
    },
    resolve: {
        extensions: [".jsx", ".js", ".scss", ""],
        fallback  : [
            path.resolve(__dirname, "../src")
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            React   : "react",
            ReactDOM: "react-dom",
            _       : "lodash"
        })
    ],
    devServer: {
        proxy: {
            '/service/*': {
                target: "http://127.0.0.1:9000",
                secure: true
            }
        }
    },
    /*********** utils ************/
    /* nothing to do with webpack */
    utils: {
        webpack,
        path,
        CommonsChunkPlugin,
        UglifyJsPlugin,
        ProvidePlugin,
        DefinePlugin,
        extend(target, ...sources) {
            //notice that the sequcence of sources maters when there is overlap between sources
            //the later one will overwrite the former one
            const ext = (target, source) => {
                for (let key in source) {
                    const val = source[key];
                    if (typeof target[key] !== "object") {
                        target[key] = val;
                        continue;
                    }

                    if (Array.isArray(target[key]) && Array.isArray(val)) {
                        target[key] = target[key].concat(val);
                        continue;
                    }

                    for (let sub_key in val) {
                        const sub_val = val[sub_key];

                        if (typeof target[key][sub_key] !== "object") {
                            target[key][sub_key] = sub_val;
                            continue;
                        }

                        Object.assign(target[key][sub_key], sub_val);
                    }
                }
            }

            sources.forEach(val => ext(target, val));
            return target;
        }
    }
}
