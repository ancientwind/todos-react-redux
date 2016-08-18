import base from "./webpack.config.base.babel";
const {path, extend} = base.utils;

export default extend({}, base, {
    devtool: "cheap-module-eval-source-map",
    entry: {
        bundle: path.resolve(__dirname, "../index")
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/dist"
    }
});
