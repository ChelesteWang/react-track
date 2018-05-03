/* eslint-disable import/unambiguous, import/no-commonjs */
const {rollup} = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const autoExternal = require('rollup-plugin-auto-external');
const sourcemaps = require('rollup-plugin-sourcemaps');
const babel = require('rollup-plugin-babel');
const eslint = require('rollup-plugin-eslint');
const uglify = require('rollup-plugin-uglify');


const inputOptions = {
    input: 'src/index.js',
    external: ['crypto'],
    plugins: [
        resolve({main: true, module: true}),
        commonjs({include: 'node_modules/**'}),
        autoExternal({dependencies: false}),
        sourcemaps(),
        eslint(),
        babel({exclude: 'node_modules/**'}),
        uglify()
    ]
};

const build = async () => {
    const bundle = await rollup(inputOptions);

    bundle.write({format: 'cjs', file: 'cjs/index.js', sourcemap: true});
    bundle.write({format: 'es', file: 'es/index.js', sourcemap: true});
};

build();