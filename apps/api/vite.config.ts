import { defineConfig } from 'vite';
import vavite from 'vavite';
import { swc } from 'rollup-plugin-swc3';

export default defineConfig({
  server: {
    open: '/api',
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
});
