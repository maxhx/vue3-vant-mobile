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
      port: Number(env.VITE_PORT) || 3000,
      proxy: {
        // FineReport 代理配置 - 精确匹配 Nginx 配置
        // 配置1: 处理 /finereport/ 路径 - 优先处理更具体的路径
        '/finereport/': {
          target: env.VITE_FINEREPORT_TARGET || 'http://localhost:8075/',
          changeOrigin: true,
          // 移除 /finereport/ 前缀
          rewrite: path => path.replace(/^\/finereport\//, ''),
          secure: false,
          ws: true,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, _unused) => {
              // 设置必要的请求头
              proxyReq.setHeader('X-Forwarded-Host', req.headers.host)
              proxyReq.setHeader('X-Forwarded-Proto', req.protocol || 'http')
              proxyReq.setHeader('X-Real-IP', req.connection.remoteAddress)
            })
            proxy.on('proxyRes', (proxyRes, _req, _res) => {
              // 处理重定向
              const location = proxyRes.headers.location
              if (location && typeof location === 'string' && location.includes('localhost:8075')) {
                proxyRes.headers.location = location.replace(
                  'http://localhost:8075/',
                  '/finereport/',
                )
              }
              // 移除可能引起问题的 Content-Security-Policy 头部
              if (proxyRes.headers['content-security-policy']) {
                delete proxyRes.headers['content-security-policy']
              }
            })
          },
        },
        // 配置2: 处理 FineReport 内部使用的资源 (js/css/image 等)
        // 注意：这个规则不能与上面的 /finereport/ 规则冲突
        '^/(webroot|decision|report|res|com|ReportServer)': {
          target: env.VITE_FINEREPORT_TARGET || 'http://localhost:8075',
          changeOrigin: true,
          secure: false,
          // 不要添加 rewrite，因为这些路径本身就是完整的
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, _unused) => {
              // 设置必要的请求头
              proxyReq.setHeader('X-Forwarded-Host', req.headers.host)
              proxyReq.setHeader('X-Forwarded-Proto', req.protocol || 'http')
            })
            proxy.on('proxyRes', (proxyRes, req, _unused) => {
              // 根据环境变量控制是否输出调试信息
              if (env.VITE_PROXY_DEBUG === 'true') {
                console.log(`[Proxy] ${req.url} - Content-Type: ${proxyRes.headers['content-type']}`)
              }
              // 修复 MIME 类型问题 - 移除可能存在的 CSP 头部
              if (proxyRes.headers['x-content-type-options']) {
                proxyRes.headers['x-content-type-options'] = 'nosniff'
              }
            })
          },
        },
        // API 代理配置 - 放在最后，避免与其他代理规则冲突
        '/api': {
          target: env.VITE_API_TARGET || 'http://localhost:8080', // 从环境变量获取后端 API 地址
          ws: false,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
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
      cssCodeSplit: true, // 启用 CSS 代码分割以改善加载性能
      chunkSizeWarningLimit: 2048,
      outDir: env.VITE_APP_OUT_DIR || 'dist',
    },

    optimizeDeps: { include, exclude },
  }
}
