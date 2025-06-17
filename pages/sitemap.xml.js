// pages/sitemap.xml.js
// 这个文件已被修复以避免Vercel构建失败
// 实际的sitemap生成在 lib/sitemap.xml.js 中进行

import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { extractLangId, extractLangPrefix } from '@/lib/utils/pageId'

// 将动态路由改为静态生成，返回404避免构建错误
export const getStaticProps = async () => {
  return {
    notFound: true
  }
}

export default function SitemapXML() {
  return null
}

