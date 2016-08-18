import base from "./webpack.config.base.babel";

const {
    webpack,
    path,
    extend,
    CommonsChunkPlugin,
    ProvidePlugin
} = base.utils;

export default extend({}, base, {
    devtool: "source-map",
    entry: {
        bundle: "mocha!./tests/unit/index",
        tests : ["chai", "react-addons-test-utils", "enzyme", "sinon/pkg/sinon"]
    },
    output: {
        path: path.resolve(__dirname, "tests/unit"),
        publicPath: "/"
    },
    module: {
        noParse: [
            /sinon/
        ]
    },
    plugins: [
        new ProvidePlugin({
            chai     : "chai",
            enzyme   : "enzyme",
            TestUtils: "react-addons-test-utils",
            sinon    : "sinon/pkg/sinon"
        })
    ],
    externals: {
        "cheerio": "window",
        "react/lib/ExecutionEnvironment": true,
        "react/lib/ReactContext": true
    }
});
