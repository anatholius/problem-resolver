module.exports = {
    extends:       ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaVersion:                 2018,
        sourceType:                  'module',
        ecmaFeatures:                {
            jsx:                          true,
            experimentalObjectRestSpread: true,
        },
        allowImportExportEverywhere: true,
    },
    parser:        "babel-eslint",
    env:           {
        browser:  true,
        commonjs: true,
        es6:      true,
        node:     true,
        jest:     true,
    },
    rules:         {
        "no-console":            0,
        "no-unused-vars":        0,
        "no-prototype-builtins": 0,
        "react/display-name":    [1, {"ignoreTranspilerName": true}],
    },
    globals:       {
        "ReactDOM": true,
    },
    settings:      {
        'import/ignore':     ['node_modules'],
        'import/extensions': ['.js'],
        'import/resolver':   {
            node: {
                extensions: ['.js', '.json'],
            },
        },
    },
};