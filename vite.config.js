import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import inject from '@rollup/plugin-inject';

export default defineConfig({
  plugins: [
    react(),
    wasm(),
    topLevelAwait(),
    inject({
      Buffer: ['buffer', 'Buffer']
    })
  ],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser global
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
      ],
    },
  },
  resolve: {
    alias: {
      // Polyfill Node.js modules for browser
      crypto: 'crypto-browserify',
      buffer: 'buffer',
    },
  },
});
