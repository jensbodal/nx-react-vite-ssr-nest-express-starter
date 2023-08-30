import { defineConfig } from 'vite';
import vavite from 'vavite';
import { join } from 'node:path';
import { swc } from 'rollup-plugin-swc3';

const IS_TEST = process.env['NODE_ENV'] === 'test';

export default defineConfig({
  server: {
    open: IS_TEST ? false : '/api',
    host: 'localhost',
    port: 3333,
  },
  build: {
    emptyOutDir: true,
    outDir: '../../dist/apps/api',
  },
  ssr: {
    external: ['reflect-metadata'],
  },
  esbuild: false,
  plugins: [
    {
      ...swc({
        jsc: {
          baseUrl: join(__dirname, './src'),
          paths: {
            '*': ['*'],
          },
          target: 'es2021',
          transform: {
            decoratorMetadata: true,
            legacyDecorator: true,
          },
        },
      }),
      enforce: 'pre',
    },
    vavite({
      handlerEntry: 'apps/api/src/main.ts',
      serverEntry: 'apps/api/src/main.ts',
      serveClientAssetsInDev: true,
      // Don't reload when dynamically imported dependencies change
      reloadOn: 'static-deps-change',
    }),
  ],
  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.cache/vitest',
    },
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
