import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  server: {
    proxy: {
      '^/odp/.*': {
        target: 'https://opentransportdata.swiss/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/odp/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res, options) => {
            proxyReq.setHeader('Referer', 'https://opentransportdata.swiss');
          });
        },
      },
      '^/odp-siri/.*': {
        // Test Environment
        // target: 'https://odpch-api.clients.liip.ch/',
        target: 'https://api.opentransportdata.swiss/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/odp-siri/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res, options) => {
            // load .env file
            const env = loadEnv(mode, process.cwd(), '');
            
            proxyReq.setHeader('Authorization', `Bearer ${env.ODP_TOKEN}`);
          });
        },
      },
    },
  },
}));
