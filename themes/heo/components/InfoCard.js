import { ArrowRightCircle } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import CONFIG from '../config'
import Announcement from './Announcement'
import Card from './Card'

/**
 * 社交信息卡
 * @param {*} props
 * @returns
 */
export function InfoCard(props) {
  const { siteInfo, notice } = props
  const router = useRouter()
  // 在文章详情页特殊处理
  const isSlugPage = router.pathname.indexOf('/[prefix]') === 0
  const url1 = siteConfig('HEO_INFO_CARD_URL1', null, CONFIG)
  const icon1 = siteConfig('HEO_INFO_CARD_ICON1', null, CONFIG)
  const url2 = siteConfig('HEO_INFO_CARD_URL2', null, CONFIG)
  const icon2 = siteConfig('HEO_INFO_CARD_ICON2', null, CONFIG)
  
  // 控制hover状态
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card className={`wow fadeInUp bg-[#4f65f0] dark:bg-yellow-600 text-white flex flex-col overflow-hidden relative ${props.className || 'w-72'}`}>
      
      {/* 中心区域 - 头像和悬停文字 */}
      <div 
        className="relative flex-1 flex items-center justify-center min-h-[200px] cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 头像 - 默认显示 */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
            isHovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          }`}
        >
          <LazyImage
            src={siteInfo?.icon}
            className='rounded-full border-white'
            style={{ borderWidth: '3px' }}
            width={135}
            alt={siteConfig('AUTHOR')}
          />
        </div>
        
        {/* 悬停文字内容 */}
        <div 
          className={`absolute inset-0 flex items-start justify-center pt-4 px-1 transition-all duration-500 ease-in-out ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <p className="text-left text-sm font-medium leading-relaxed">
            这里有关于产品、设计、开发、增长等一站式内容。
            <br />
            <br />
            涉及个人的所思所想以及国内外优秀产品和文章解读。
          </p>
        </div>
      </div>

      {/* 底部区域 */}
      <div className='flex justify-between items-end px-1 pb-1'>
        {/* 左侧 - 名称和副标题 */}
        <div className='flex flex-col justify-center h-8'>
          <h4 className='text-base font-bold leading-tight mb-1'>星彦</h4>
          <p className='opacity-90 whitespace-nowrap leading-none' style={{ fontSize: '12px' }}>助您成为超级个体</p>
        </div>
        
        {/* 右侧 - 社交图标 */}
        <div className='flex space-x-2 mr-1'>
          {/* 个人图标 */}
          {url1 && (
            <div className='w-8 h-8 text-center bg-indigo-400 p-2 rounded-full transition-colors duration-200 dark:bg-yellow-500 dark:hover:bg-black hover:bg-white hover:text-black dark:hover:text-white flex items-center justify-center'>
              <Link href={url1} target="_blank" rel="noopener noreferrer">
                <i className={icon1} />
              </Link>
            </div>
          )}
          {/* GitHub图标 */}
          {url2 && (
            <div className='w-8 h-8 bg-indigo-400 p-2 rounded-full transition-colors duration-200 dark:bg-yellow-500 dark:hover:bg-black hover:bg-white hover:text-black dark:hover:text-white flex items-center justify-center'>
              <Link href={url2} target="_blank" rel="noopener noreferrer">
                <i className={icon2} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
