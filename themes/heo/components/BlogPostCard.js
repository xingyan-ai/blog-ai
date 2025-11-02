import LazyImage from '@/components/LazyImage'
import NotionIcon from './NotionIcon'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import CONFIG from '../config'
import TagItemMini from './TagItemMini'

const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
  const showPreview =
    siteConfig('HEO_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
  if (
    post &&
    !post.pageCoverThumbnail &&
    siteConfig('HEO_POST_LIST_COVER_DEFAULT', null, CONFIG)
  ) {
    post.pageCoverThumbnail = siteInfo?.pageCover
  }
  const showPageCover =
    siteConfig('HEO_POST_LIST_COVER', null, CONFIG) &&
    post?.pageCoverThumbnail &&
    !showPreview

  const POST_TWO_COLS = siteConfig('HEO_HOME_POST_TWO_COLS', true, CONFIG)
  const POST_THREE_COLS = siteConfig('HEO_HOME_POST_THREE_COLS', false, CONFIG)
  const COVER_HOVER_ENLARGE = siteConfig(
    'HEO_POST_LIST_COVER_HOVER_ENLARGE',
    true,
    CONFIG
  )

  // 根据列数配置调整卡片样式
  const getCardHeight = () => {
    if (POST_THREE_COLS) {
      return 'h-60 min-h-60 md:h-60' // 三列时使用较小高度 240px
    } else if (POST_TWO_COLS) {
      return 'h-72 min-h-72 md:h-72' // 两列时使用原有高度 288px
    } else {
      return 'h-72 min-h-72 md:h-72' // 一列时保持原有高度
    }
  }

  const getTextPadding = () => {
    if (POST_THREE_COLS) {
      return 'px-4 py-4' // 三列时使用较小内边距
    } else if (POST_TWO_COLS) {
      return 'md:px-4 md:py-4' // 两列时保持原有
    } else {
      return 'px-6 py-6' // 一列时保持原有
    }
  }

  const getTextResponsive = () => {
    if (POST_THREE_COLS) {
      return 'md:px-4 md:py-4 md:h-auto md:w-full'
    } else if (POST_TWO_COLS) {
      return 'md:px-4 md:py-4 md:h-auto md:w-full'
    } else {
      return ''
    }
  }

  const getTitleSize = () => {
    if (POST_THREE_COLS) {
      return 'text-sm font-medium' // 三列时使用较小字体
    } else {
      return 'text-base font-medium' // 两列及一列时保持原有大小
    }
  }

  const getSummarySize = () => {
    if (POST_THREE_COLS) {
      return 'text-xs font-light' // 三列时使用较小字体
    } else {
      return 'text-xs font-light' // 保持原有大小
    }
  }

  return (
    <article
      className={` ${COVER_HOVER_ENLARGE} ? ' hover:transition-all duration-150' : ''}`}>
      <div
        data-wow-delay='.2s'
        className={
          (POST_TWO_COLS || POST_THREE_COLS ? 'md:flex-col' : '') +
          ` wow fadeInUp border bg-white dark:bg-[#1e1e1e] flex mb-4 flex-col ${getCardHeight()} md:flex-row group w-full dark:border-gray-600 hover:border-indigo-600 dark:hover:border-yellow-600 duration-300 transition-colors justify-between overflow-hidden rounded-xl`
        }>
        {/* 图片封面 */}
        {showPageCover && (
          <Link href={post?.href} passHref legacyBehavior>
            <div
              className={
                (POST_TWO_COLS || POST_THREE_COLS 
                  ? 'w-full aspect-[7/4]' 
                  : 'w-full md:w-5/12 aspect-[7/4]'
                ) + ' overflow-hidden cursor-pointer select-none'
              }>
              <LazyImage
                priority={index === 0}
                src={post?.pageCoverThumbnail}
                alt={post?.title}
                className='h-full w-full object-cover group-hover:scale-105 group-hover:brightness-75 transition-all duration-500 ease-in-out'
              />
            </div>
          </Link>
        )}

        {/* 文字区块 */}
        <div
          className={
            getTextResponsive() +
            ` flex ${getTextPadding()} flex-col justify-between h-auto md:h-full w-full md:w-7/12`
          }>
          <header>
            {/* 分类 */}
            {post?.category && (
              <div
                className={`flex mb-3 items-center justify-start hidden md:block flex-wrap dark:text-gray-300 text-gray-600 hover:text-indigo-700 dark:hover:text-yellow-500`}>
                <Link
                  passHref
                  href={`/category/${post.category}`}
                  className='cursor-pointer text-xs font-light menu-link '>
                  {post.category}
                </Link>
              </div>
            )}

            {/* 标题和图标 */}
            <Link
              href={post?.href}
              passHref
              className={
                ` group-hover:text-indigo-700 dark:hover:text-yellow-700 dark:group-hover:text-yellow-600 text-black dark:text-gray-100 line-clamp-2 replace cursor-pointer ${getTitleSize()} leading-tight mb-3`
              }>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon
                icon={post.pageIcon}
                className="heo-icon w-6 h-6 mr-1 align-middle transform translate-y-[-8%]" // 专门为 Heo 主题的图标设置样式
              />
              )}
              <span className='menu-link '>{post.title}</span>
            </Link>
          </header>

          {/* 摘要 */}
          {(!showPreview || showSummary) && (
            <main className={`line-clamp-2 replace text-gray-700 dark:text-gray-300 ${getSummarySize()} leading-tight mb-4`}>
              {post.summary}
            </main>
          )}

          <div className='md:flex-nowrap flex-wrap justify-start inline-block'>
            {post.tagItems?.map(tag => (
              <TagItemMini key={tag.name} tag={tag} />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export default BlogPostCard
