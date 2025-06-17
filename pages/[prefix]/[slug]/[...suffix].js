import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { getGlobalData, getPost } from '@/lib/db/getSiteData'
import { checkSlugHasMorThanTwoSlash, processPostData } from '@/lib/utils/post'
import { idToUuid } from 'notion-utils'
import Slug from '..'

/**
 * 根据notion的slug访问页面
 * 解析三级以上目录 /article/2023/10/29/test
 * @param {*} props
 * @returns
 */
const PrefixSlug = props => {
  return <Slug {...props} />
}

/**
 * 编译渲染页面路径
 * @returns
 */
export async function getStaticPaths() {
  // 更完善的生产环境检测，确保在 Vercel 构建时正确识别
  const isProd = process.env.VERCEL_ENV === 'production' || 
                 process.env.VERCEL_ENV === 'preview' || 
                 process.env.NODE_ENV === 'production' || 
                 process.env.VERCEL === '1' || 
                 process.env.npm_lifecycle_event === 'build' || 
                 process.env.EXPORT || 
                 BLOG.isProd

  if (!isProd) {
    return {
      paths: [],
      fallback: true
    }
  }

  const from = 'slug-paths'
  const { allPages } = await getGlobalData({ from })
  
  // 添加错误处理和数据验证
  if (!allPages || !Array.isArray(allPages)) {
    console.warn('allPages is not available or not an array')
    return {
      paths: [],
      fallback: true
    }
  }

  const paths = allPages
    ?.filter(row => {
      // 添加更严格的数据验证
      if (!row || !row.slug || typeof row.slug !== 'string') {
        return false
      }
      return checkSlugHasMorThanTwoSlash(row)
    })
    .map(row => {
      const slugParts = row.slug.split('/')
      if (slugParts.length >= 3) {
        return {
          params: {
            prefix: slugParts[0],
            slug: slugParts[1],
            suffix: slugParts.slice(2)
          }
        }
      }
      return null
    })
    .filter(Boolean) // 移除 null 值
    
  console.log(`Generated ${paths?.length || 0} paths for [prefix]/[slug]/[...suffix] route`)
    
  return {
    paths: paths || [],
    fallback: true
  }
}

/**
 * 抓取页面数据
 * @param {*} param0
 * @returns
 */
export async function getStaticProps({
  params: { prefix, slug, suffix },
  locale
}) {
  const fullSlug = prefix + '/' + slug + '/' + suffix.join('/')
  const from = `slug-props-${fullSlug}`
  const props = await getGlobalData({ from, locale })

  // 在列表内查找文章
  props.post = props?.allPages?.find(p => {
    return (
      p.type.indexOf('Menu') < 0 &&
      (p.slug === suffix ||
        p.slug === fullSlug.substring(fullSlug.lastIndexOf('/') + 1) ||
        p.slug === fullSlug ||
        p.id === idToUuid(fullSlug))
    )
  })

  // 处理非列表内文章的内信息
  if (!props?.post) {
    const pageId = fullSlug.slice(-1)[0]
    if (pageId.length >= 32) {
      const post = await getPost(pageId)
      props.post = post
    }
  }

  if (!props?.post) {
    // 无法获取文章
    props.post = null
  } else {
    await processPostData(props, from)
  }
  return {
    props,
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          BLOG.NEXT_REVALIDATE_SECOND,
          props.NOTION_CONFIG
        )
  }
}

export default PrefixSlug
