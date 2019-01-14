const getLoader = function (rules, matcher) {
    var loader;

    rules.some(rule => {
        return loader = matcher(rule) ? rule : getLoader(rule.use || rule.oneOf || [], matcher);
    });

    return loader;
};

function rewireSass(config) {

    const cssLoader = getLoader(
        config.module.rules,
        rule => rule.test && String(rule.test) === String(/\.css$/)
    );

    const sassLoader = {
        test: /\.scss$/,
        use: [...(cssLoader.loader || cssLoader.use), 'sass-loader']
    };

    const oneOf = config.module.rules.find(rule => rule.oneOf).oneOf;
    oneOf.unshift(sassLoader);

    return config;
}

module.exports = function override(config, env) {
    config = rewireSass(config, env);
    return config;
};
