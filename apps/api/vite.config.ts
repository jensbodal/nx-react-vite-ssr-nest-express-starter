import { defineConfig } from 'vite';
import vavite from 'vavite';
import { swc } from 'rollup-plugin-swc3';
import react from '@vitejs/plugin-react';
import ssr from 'vite-plugin-ssr/plugin';
import { join } from 'node:path';

const VITE_DO_OPEN = process.env['VITE_DO_OPEN'] === 'true';

const open = (mode: string) => {
  if (mode === 'test') {
    return false;
  }
  if (VITE_DO_OPEN === true) {
    return '/api';
  }
  return false;
};

export default defineConfig(({ command, mode, ssrBuild }) => {
  console.log({ command, mode, ssrBuild });
  return {
    cacheDir: '../../node_modules/.cache/vite/api',

    buildSteps: [
      {
        name: 'client',
      },
      {
        name: 'server',
        config: {
          build: { ssr: true },
        },
      },
    ],

    server: {
      open: open(mode),
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
        // handlerEntry: 'apps/api/src/main.ts',
        // serverEntry: 'apps/api/src/main.ts',
        serveClientAssetsInDev: true,
        // Don't reload when dynamically imported dependencies change
        // reloadOn: 'static-deps-change',
      }),
      react(),
      ssr({ disableAutoFullBuild: true }),
    ],
    test: {
      globals: true,
      cache: {
        dir: '../../node_modules/.cache/vitest',
      },
      environment: 'node',
      include: ['src/**/*.test.ts'],
    },
  };
});
