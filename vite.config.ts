import path from 'node:path'
import process from 'node:process'
import { loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import { createVitePlugins } from './build/vite'
import { exclude, include } from './build/vite/optimize'

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)

  return {
    base: env.VITE_APP_PUBLIC_PATH,
    plugins: createVitePlugins(mode),

    server: {
      host: true,
      port: 3000,
      proxy: {
        '/api': {
          target: '', // Your backend API base URL
          ws: false,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
        // FineReport 代理配置 - 精确匹配 Nginx 配置
        // 配置1: 处理 /finereport/ 路径
        '/finereport/': {
          target: 'http://localhost:8075/',
          changeOrigin: true,
          // 移除 /finereport/ 前缀
          rewrite: path => path.replace(/^\/finereport\//, ''),
          secure: false,
          ws: true,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              // console.log(`[FineReport] Proxying: ${req.url} -> ${proxyReq.path}`)
              // 设置必要的请求头
              proxyReq.setHeader('X-Forwarded-Host', req.headers.host)
              proxyReq.setHeader('X-Forwarded-Proto', 'http')
            })
            proxy.on('proxyRes', (proxyRes, req, res) => {
              // 处理重定向
              const location = proxyRes.headers.location
              if (location && location.includes('localhost:8075')) {
                proxyRes.headers.location = location.replace(
                  'http://localhost:8075/',
                  '/finereport/',
                )
              }
            })
          },
        },
        // 配置2: 处理 FineReport 内部使用的资源 (js/ccs)
        '^/(webroot|decision|report|res|com|ReportServer)': {
          target: 'http://localhost:8075',
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              // console.log(`[FineReport Resource] Proxying: ${req.url}`)
            })
            proxy.on('proxyRes', (proxyRes, req, res) => {
              console.log(`[Proxy] ${req.url} - Content-Type: ${proxyRes.headers['content-type']}`)
            })
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, './src'),
        '~': path.join(__dirname, './src/assets'),
        '~root': path.join(__dirname, '.'),
      },
    },

    build: {
      cssCodeSplit: false,
      chunkSizeWarningLimit: 2048,
      outDir: env.VITE_APP_OUT_DIR || 'dist',
    },

    optimizeDeps: { include, exclude },
  }
}
