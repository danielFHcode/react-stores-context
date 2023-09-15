const { transformSync } = require('@babel/core');
const { readFileSync, writeFileSync } = require('node:fs');
const { absolutePath } = require('./utils');

const file = readFileSync(absolutePath('../index.jsx'));

const opts = ({ esm, minified }) => ({
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                corejs: '3.22',
                modules: esm ? false : 'umd',
            },
        ],
        [
            '@babel/preset-react',
            {
                pragma: 'h',
            },
        ],
    ],
    filename: 'react-stores-context.js',
    minified,
});

writeFileSync(
    absolutePath('../dist/index.js'),
    transformSync(file, opts({ esm: false, minified: false })).code
);
writeFileSync(
    absolutePath('../dist/index.minified.js'),
    transformSync(file, opts({ esm: false, minified: true })).code
);
writeFileSync(
    absolutePath('../dist/index.esm.js'),
    transformSync(file, opts({ esm: true, minified: false })).code
);
writeFileSync(
    absolutePath('../dist/index.esm.minified.js'),
    transformSync(file, opts({ esm: true, minified: true })).code
);
