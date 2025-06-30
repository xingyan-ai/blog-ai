import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import CONFIG from '../config'

/**
 * 关联推荐文章
 * @param {prev,next} param0
 * @returns
 */
export default function PostRecommend({ recommendPosts, siteInfo }) {
  const { locale } = useGlobal()

  if (
    !siteConfig('HEO_ARTICLE_RECOMMEND', null, CONFIG) ||
    !recommendPosts ||
    recommendPosts.length === 0
  ) {
    return <></>
  }

  return (
    <div className='pt-8 hidden md:block'>
      {/* 推荐文章 */}
      <div className=' mb-6 px-1 flex flex-nowrap justify-between'>
        <div className='dark:text-gray-300 text-lg font-bold'>
          <i className='mr-2 fas fa-thumbs-up' />
          {locale.COMMON.RELATE_POSTS}
        </div>
      </div>

      {/* 文章列表 */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {recommendPosts.map(post => {
          const headerImage = post?.pageCoverThumbnail
            ? post?.pageCoverThumbnail
            : siteInfo?.pageCover

          return (
            <Link
              key={post?.id}
              title={post?.title}
              href={post?.href}
              passHref
              className='group block overflow-hidden rounded-xl bg-white dark:bg-[#1e1e1e] shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-yellow-500'>
              <div className='relative overflow-hidden'>
                <LazyImage
                  src={headerImage}
                  className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105'
                  alt={post.title}
                />
                {/* 渐变遮罩 */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </div>
              
              {/* 文字内容区 */}
              <div className='p-4 flex flex-col h-28'>
                <h3 className='text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-yellow-500 transition-colors duration-200 leading-snug h-12 flex items-start'>
                  {post.title}
                </h3>
                
                {/* 文章摘要（如果有） */}
                {post.summary && (
                  <p className='mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 flex-1'>
                    {post.summary}
                  </p>
                )}
                
                {/* 阅读更多指示 - 固定在底部 */}
                <div className='mt-auto flex items-center text-sm text-indigo-600 dark:text-yellow-500 group-hover:text-indigo-700 dark:group-hover:text-yellow-400 transition-colors duration-200'>
                  <span>阅读更多</span>
                  <svg className='w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                  </svg>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
