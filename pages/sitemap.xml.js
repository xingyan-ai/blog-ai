// pages/sitemap.xml.js
// 这个文件已被临时禁用以避免Vercel构建失败
// 如需sitemap功能，请使用 next-sitemap 包在构建后生成

// 返回404，不渲染任何内容
export const getStaticProps = async () => {
  return {
    notFound: true
  }
}

export default function SitemapXML() {
  return null
}

