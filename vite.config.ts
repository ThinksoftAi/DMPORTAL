import { defineConfig } from 'vite';
import { resolve } from 'path';

// Multi-Page Application (MPA) configuration for Deepali Minerals
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: 'all'
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        product: resolve(__dirname, 'product.html'),
        products: resolve(__dirname, 'products/index.html')
      }
    }
  }
});
