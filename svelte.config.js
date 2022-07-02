import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess({
        postcss: true
    }),

    kit: {
        adapter: adapter(),
        vite: {
            server: {
                watch: {
                    usePolling: true
                }
            },
            resolve: {
                alias: {
                    $stores: path.resolve('src/stores'),
                    $src: path.resolve('src')
                }
            },
            build: {
                commonjsOptions: {
                    transformMixedEsModules: true,
                    exclude: ['node_modules/lodash-es/**', 'node_modules/@types/lodash-es/**']
                }
            }
        }
    }
};

export default config;
