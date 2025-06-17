/**
 * 开发人员可能需要关注的配置
 */
module.exports = {
  SUB_PATH: '', // leave this empty unless you want to deploy in a folder
  DEBUG: process.env.NEXT_PUBLIC_DEBUG || false, // 是否显示调试按钮
  // TAILWINDCSS 配置的自定义颜色，作废
  BACKGROUND_LIGHT: '#eeeeee', // use hex value, don't forget '#' e.g #fffefc
  BACKGROUND_DARK: '#000000', // use hex value, don't forget '#'

  // Redis 缓存数据库地址
  REDIS_URL: process.env.REDIS_URL || '',

  ENABLE_CACHE:
    process.env.ENABLE_CACHE ||
    process.env.npm_lifecycle_event === 'build' ||
    process.env.npm_lifecycle_event === 'export', // 在打包过程中默认开启缓存，开发或运行时开启此功能意义不大。
  isProd: process.env.VERCEL_ENV === 'production' || 
          process.env.VERCEL_ENV === 'preview' || 
          process.env.NODE_ENV === 'production' || 
          process.env.VERCEL === '1' || 
          process.env.npm_lifecycle_event === 'build' || 
          process.env.EXPORT, // 更完善的生产环境检测，确保在 Vercel 构建时正确识别
  BUNDLE_ANALYZER: process.env.ANALYZE === 'true' || false, // 是否展示编译依赖内容与大小
  VERSION: (() => {
    try {
      // 优先使用环境变量，否则从package.json中获取版本号
      return (
        process.env.NEXT_PUBLIC_VERSION || require('../package.json').version
      )
    } catch (error) {
      console.warn('Failed to load package.json version:', error)
      return '1.0.0' // 缺省版本号
    }
  })()
}
