import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
import { defineConfig } from 'vite'
const srcPath = path.resolve(__dirname, './src')
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __EXTERNAL_SERVER_URL__: JSON.stringify(process.env.EXTERNAL_SERVER_URL),
    __INTERNAL_SERVER_URL__: JSON.stringify(process.env.INTERNAL_SERVER_URL),
  },
  build: {
    outDir: path.join(__dirname, 'dist/client'),
  },
  ssr: {
    format: 'cjs',
    noExternal: ['@gravity-ui/uikit'],
  },
  resolve: {
    alias: {
      '@app': path.join(srcPath, 'app'),
      '@pages': path.join(srcPath, 'pages'),
      '@widgets': path.join(srcPath, 'widgets'),
      '@features': path.join(srcPath, 'features'),
      '@entities': path.join(srcPath, 'entities'),
      '@shared': path.join(srcPath, 'shared'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  plugins: [react()],
})
