const { THEME } = require('./blog.config')
const fs = require('fs')
const path = require('path')
const BLOG = require('./blog.config')
const { extractLangPrefix } = require('./lib/utils/pageId')

// 确保构建时环境变量正确设置
if (process.env.npm_lifecycle_event === 'build' || process.env.VERCEL === '1') {
  process.env.NODE_ENV = 'production'
  if (!process.env.VERCEL_ENV) {
    process.env.VERCEL_ENV = 'production'
  }
}

// 打包时是否分析代码
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: BLOG.BUNDLE_ANALYZER
})

// 扫描项目 /themes下的目录名
const themes = scanSubdirectories(path.resolve(__dirname, 'themes'))
// 检测用户开启的多语言
const locales = (function () {
  // 根据BLOG_NOTION_PAGE_ID 检查支持多少种语言数据.
  // 支持如下格式配置多个语言的页面id xxx,zh:xxx,en:xxx
  const langs = [BLOG.LANG]
  if (BLOG.NOTION_PAGE_ID.indexOf(',') > 0) {
    const siteIds = BLOG.NOTION_PAGE_ID.split(',')
    for (let index = 0; index < siteIds.length; index++) {
      const siteId = siteIds[index]
      const prefix = extractLangPrefix(siteId)
      // 如果包含前缀 例如 zh , en 等
      if (prefix) {
        if (!langs.includes(prefix)) {
          langs.push(prefix)
        }
      }
    }
  }
  return langs
})()

// 编译前执行
// eslint-disable-next-line no-unused-vars
const preBuild = (function () {
  if (
    !process.env.npm_lifecycle_event === 'export' &&
    !process.env.npm_lifecycle_event === 'build'
  ) {
    return
  }
  // 删除 public/sitemap.xml 文件 ； 否则会和/pages/sitemap.xml.js 冲突。
  // 临时注释以解决构建问题
  // const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml')
  // if (fs.existsSync(sitemapPath)) {
  //   fs.unlinkSync(sitemapPath)
  //   console.log('Deleted existing sitemap.xml from public directory')
  // }

  // const sitemap2Path = path.resolve(__dirname, 'sitemap.xml')
  // if (fs.existsSync(sitemap2Path)) {
  //   fs.unlinkSync(sitemap2Path)
  //   console.log('Deleted existing sitemap.xml from root directory')
  // }
})()

/**
 * 扫描指定目录下的文件夹名，用于获取所有主题
 * @param {*} directory
 * @returns
 */
function scanSubdirectories(directory) {
  const subdirectories = []

  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file)
    const stats = fs.statSync(fullPath)
    if (stats.isDirectory()) {
      subdirectories.push(file)
    }

    // subdirectories.push(file)
  })

  return subdirectories
}

/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  output: process.env.EXPORT
    ? 'export'
    : process.env.NEXT_BUILD_STANDALONE === 'true'
      ? 'standalone'
      : undefined,
  staticPageGenerationTimeout: 120,
  // 多语言， 在export时禁用
  i18n: process.env.EXPORT
    ? undefined
    : {
        defaultLocale: BLOG.LANG,
        // 支持的所有多语言,按需填写即可
        locales: locales
      },
  images: {
    // 图片压缩
    formats: ['image/avif', 'image/webp'],
    // 允许next/image加载的图片 域名
    domains: [
      'gravatar.com',
      'www.notion.so',
      'avatars.githubusercontent.com',
      'images.unsplash.com',
      'source.unsplash.com',
      'p1.qhimg.com',
      'webmention.io',
      'ko-fi.com'
    ]
  },

  // 默认将feed重定向至 /public/rss/feed.xml
  redirects: process.env.EXPORT
    ? undefined
    : async () => {
        return [
          {
            source: '/feed',
            destination: '/rss/feed.xml',
            permanent: true
          }
        ]
      },
  // 重写url
  rewrites: process.env.EXPORT
    ? undefined
    : async () => {
        // 处理多语言重定向
        const langsRewrites = []
        if (BLOG.NOTION_PAGE_ID.indexOf(',') > 0) {
          const siteIds = BLOG.NOTION_PAGE_ID.split(',')
          const langs = []
          for (let index = 0; index < siteIds.length; index++) {
            const siteId = siteIds[index]
            const prefix = extractLangPrefix(siteId)
            // 如果包含前缀 例如 zh , en 等
            if (prefix) {
              langs.push(prefix)
            }
            console.log('[Locales]', siteId)
          }

          // 映射多语言
          // 示例： source: '/:locale(zh|en)/:path*' ; :locale() 会将语言放入重写后的 `?locale=` 中。
          langsRewrites.push(
            {
              source: `/:locale(${langs.join('|')})/:path*`,
              destination: '/:path*'
            },
            // 匹配没有路径的情况，例如 [domain]/zh 或 [domain]/en
            {
              source: `/:locale(${langs.join('|')})`,
              destination: '/'
            },
            // 匹配没有路径的情况，例如 [domain]/zh/ 或 [domain]/en/
            {
              source: `/:locale(${langs.join('|')})/`,
              destination: '/'
            }
          )
        }

        return [
          ...langsRewrites,
          // 伪静态重写
          {
            source: '/:path*.html',
            destination: '/:path*'
          }
        ]
      },
  headers: process.env.EXPORT
    ? undefined
    : async () => {
        return [
          {
            source: '/:path*{/}?',
            headers: [
              { key: 'Access-Control-Allow-Credentials', value: 'true' },
              { key: 'Access-Control-Allow-Origin', value: '*' },
              {
                key: 'Access-Control-Allow-Methods',
                value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
              },
              {
                key: 'Access-Control-Allow-Headers',
                value:
                  'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
              }
            ]
          }
        ]
      },
  webpack: (config, { dev, isServer }) => {
    // 动态主题：添加 resolve.alias 配置，将动态路径映射到实际路径
    config.resolve.alias['@'] = path.resolve(__dirname)

    if (!isServer) {
      console.log('[默认主题]', path.resolve(__dirname, 'themes', THEME))
      // 在客户端构建时忽略 Node.js 内置模块
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      }
    }
    config.resolve.alias['@theme-components'] = path.resolve(
      __dirname,
      'themes',
      THEME
    )
    // Enable source maps in development mode
    if (process.env.NODE_ENV_API === 'development') {
      config.devtool = 'source-map'
    }
    return config
  },
  experimental: {
    scrollRestoration: true
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    // export 静态导出时 忽略有getServerSideProps的动态页面，避免构建冲突
    const pages = { ...defaultPathMap }
    
    // 删除使用 getServerSideProps 的页面
    delete pages['/sitemap.xml']
    delete pages['/auth']
    delete pages['/auth/result']
    
    // 排除所有可能使用getServerSideProps的页面
    Object.keys(pages).forEach(page => {
      if (page.startsWith('/auth')) {
        delete pages[page]
      }
    })
    
    // 排除可能的多语言版本的auth页面
    const langPrefixes = ['zh-CN', 'en-US', 'en', 'zh']
    langPrefixes.forEach(lang => {
      delete pages[`/${lang}/auth`]
      delete pages[`/${lang}/auth/result`]
      delete pages[`/${lang}/sitemap.xml`]
    })
    
    console.log('Excluded auth pages from static export')
    console.log('Final pages for export:', Object.keys(pages).length)
    
    return pages
  },
  publicRuntimeConfig: {
    // 这里的配置既可以服务端获取到，也可以在浏览器端获取到
    THEMES: themes
  },
  experimental: {
    // 增加页面数据大小限制以支持大型 Notion 页面
    largePageDataBytes: 1024 * 1024 // 1MB (1024KB) - 适合包含数据库的 Notion 页面
  }
}

module.exports = process.env.ANALYZE
  ? withBundleAnalyzer(nextConfig)
  : nextConfig
