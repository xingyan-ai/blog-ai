import { useState } from 'react'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import CONFIG from '../config'

/**
 * 公众号卡片
 * 精确复刻图片中的设计样式
 * @returns
 */
export default function TouchMeCard() {
  if (!JSON.parse(siteConfig('HEO_SOCIAL_CARD', null, CONFIG))) {
    return <></>
  }

  // 状态控制悬停效果
  const [isHovered, setIsHovered] = useState(false)
  
  // 卡片配置
  const cardTitle = siteConfig('HEO_SOCIAL_CARD_TITLE_1', '公众号', CONFIG)
  const cardTag = siteConfig('HEO_SOCIAL_CARD_TAG', '微信', CONFIG)
  const cardSubtitle = siteConfig('HEO_SOCIAL_CARD_SUBTITLE_1', '快人一步获取最新文章 ▶', CONFIG)
  const cardBgColor = siteConfig('HEO_SOCIAL_CARD_BG_COLOR_1', '#36B37E', CONFIG)
  const cardLink = siteConfig('HEO_SOCIAL_CARD_URL_1', 'https://docs.tangly1024.com/article/wechat-mp', CONFIG)
  const wechatIcon = siteConfig('HEO_SOCIAL_CARD_WECHAT_ICON', '/images/wechat.png', CONFIG)
  const qrcodeImage = siteConfig('HEO_SOCIAL_CARD_QRCODE', '/qrcode.png', CONFIG)

  return (
    <Link href={cardLink} className="block">
      <div 
        className="relative h-[100px] text-white rounded-[14px] overflow-hidden cursor-pointer"
        style={{ backgroundColor: cardBgColor }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 内容容器 */}
        <div className="absolute inset-0 p-[18px_20px] flex items-center">
          {/* 文字内容区 */}
          <div className="z-10 flex-1">
            <div className="flex items-center gap-[6px] mb-[8px]">
              <h2 className="text-[22px] leading-[1.2] font-bold">{cardTitle}</h2>
              <span className="text-[12px] border border-white/80 rounded-[3px] px-[4px] py-[1px]">{cardTag}</span>
            </div>
            <p className="text-[14px] leading-[1.4] opacity-90">{cardSubtitle}</p>
          </div>
          
          {/* 右侧微信图标 - 半透明水印 */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-[80px] h-[80px] opacity-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={wechatIcon} alt="WeChat" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* 悬停时覆盖层 - 使用绝对定位完全覆盖 */}
        <div 
          className={`absolute inset-0 bg-white flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex flex-col items-center">
            <div className="w-[75px] h-[75px] mb-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrcodeImage} alt="QR Code" className="w-full h-full object-contain" />
            </div>
            <p className="text-[13px] font-medium text-gray-700">扫一扫 | 获取最新文章</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
