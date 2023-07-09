import ts from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import {
    nodeResolve
} from '@rollup/plugin-node-resolve';
import {
    defineConfig
} from 'rollup';
import {
    terser
} from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

const extensions = ['.ts', '.less'];

export default defineConfig([{
    input: './src/index.ts',
    output: [{
            file: './dist/player.cjs.js',
            format: 'cjs',
        },
        {
            file: './dist/player.min.cjs.js',
            format: 'cjs',
            plugins: [terser()],
        },
        {
            file: './dist/player.es.js',
            format: 'es',
        },
        {
            file: './dist/player.min.es.js',
            format: 'es',
            plugins: [terser()],
        },
        {
            file: './dist/player.umd.js',
            format: 'umd',
            name: 'Player',
        },
        {
            file: './dist/player.min.umd.js',
            format: 'umd',
            name: 'Player',
            plugins: [terser()],
        },
    ],
    plugins: [
        ts(),
        nodeResolve({
            extensions,
        }),
        babel(),
        commonjs(),
        postcss({
            plugins: [
                autoprefixer(),
            ],
            extract: 'css/index.css',
        }),
    ],
}, ]);