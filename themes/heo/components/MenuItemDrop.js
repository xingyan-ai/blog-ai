import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import SafeArea from '@/components/SafeArea'

export const MenuItemDrop = ({ link, textWhite }) => {
  const [show, changeShow] = useState(false)
  const [borderColor, setBorderColor] = useState('#425AEF')
  const submenuRef = useRef(null)
  const menuItemRef = useRef(null)
  const hasSubMenu = link?.subMenus?.length > 0
  const timeoutRef = useRef(null)
  const mousePositionRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 })
  const [mouseX, setMouseX] = useState(0)
  const [submenuBounds, setSubmenuBounds] = useState(null)

  useEffect(() => {
    const updateBorderColor = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setBorderColor(isDark ? '#FFC748' : '#425AEF')
    }
    
    updateBorderColor()
    
    // 监听主题变化
    const observer = new MutationObserver(updateBorderColor)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  // 更新鼠标位置并计算移动方向
  const updateMousePosition = (event) => {
    const current = mousePositionRef.current
    current.prevX = current.x
    current.prevY = current.y
    current.x = event.clientX
    current.y = event.clientY
  }

  // 计算移动方向和距离
  const getMovementDirection = () => {
    const { x, y, prevX, prevY } = mousePositionRef.current
    const deltaX = Math.abs(x - prevX)
    const deltaY = Math.abs(y - prevY)
    
    // 如果移动距离太小，认为是静止
    if (deltaX < 2 && deltaY < 2) {
      return 'static'
    }
    
    // 判断主要移动方向
    if (deltaX > deltaY * 1.5) {
      return 'horizontal'
    } else if (deltaY > deltaX * 1.5) {
      return 'vertical'
    } else {
      return 'diagonal'
    }
  }

  // 鼠标进入时立即显示菜单 - 提升响应速度
  const handleMouseEnter = (event) => {
    updateMousePosition(event)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    // 立即显示，无延迟
    changeShow(true)
  }

  // 智能延迟：根据鼠标移动方向决定延迟时间
  const handleMouseLeave = (event) => {
    updateMousePosition(event)
    const direction = getMovementDirection()
    
    let delay = 0
    
    // 根据移动方向设置不同的延迟
    switch (direction) {
      case 'horizontal':
        delay = 0 // 左右移动：立即隐藏
        break
      case 'vertical':
        delay = 80 // 上下移动：较长延迟，给安全区域时间
        break
      case 'diagonal':
        delay = 40 // 对角线移动：中等延迟
        break
      default:
        delay = 20 // 静止或微小移动：短延迟
        break
    }
    
    if (delay === 0) {
      changeShow(false)
    } else {
      timeoutRef.current = setTimeout(() => {
        changeShow(false)
      }, delay)
    }
  }

  // 处理子菜单内的鼠标移动 - 磁性效果
  const handleSubmenuMouseMove = (event) => {
    if (!submenuRef.current) return
    
    const rect = submenuRef.current.getBoundingClientRect()
    setMouseX(event.clientX)
    setSubmenuBounds(rect)
  }

  // 计算每个菜单项的磁性缩放效果
  const getMagneticScale = (itemIndex, totalItems) => {
    if (!submenuBounds || !mouseX) return 1
    
    const { left, width } = submenuBounds
    const relativeX = mouseX - left
    const normalizedX = Math.max(0, Math.min(1, relativeX / width)) // 0-1之间
    
    // 计算每个项目的中心位置（0-1之间）
    const itemCenter = (itemIndex + 0.5) / totalItems
    
    // 计算距离（0-1之间，0表示鼠标正好在项目中心）
    const distance = Math.abs(normalizedX - itemCenter) * totalItems
    
    // 根据距离计算缩放（距离越近缩放越大）
    const maxScale = 1.08 // 最大缩放 - 调小放大倍数，使hover效果更柔和
    const minScale = 0.98  // 最小缩放 - 稍微提高，避免过度缩小
    const influence = 1.2  // 影响范围
    
    if (distance < influence) {
      const factor = (influence - distance) / influence
      return minScale + (maxScale - minScale) * factor
    }
    
    return minScale
  }

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  if (!link || !link.show) {
    return null
  }

  return (
    <div
      ref={menuItemRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {/* 不含子菜单 */}
      {!hasSubMenu && (
        <Link
          target={link?.target}
          href={link?.href}
          className={`menu-item-simple group/link flex justify-center items-center px-4 py-0.5 no-underline tracking-widest transition-all duration-75 ${textWhite ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}
          style={{
            borderRadius: '50px',
            fontSize: '18px',
            fontWeight: '700'
          }}>
          {link?.icon && <i className={link?.icon + ' mr-2'} />}{link?.name}
          {/* 外链图标：如果链接是外链（target="_blank" 或 href 以 http/https 开头），显示外链图标 */}
          {(link?.target === '_blank' || (link?.href && (link.href.startsWith('http://') || link.href.startsWith('https://')))) && (
            <i className={`fas fa-external-link-alt ml-1.5 transition-all duration-75 ${textWhite ? 'text-white opacity-100' : 'text-gray-800 dark:text-gray-200 opacity-60 group-hover/link:text-white group-hover/link:opacity-100'}`} style={{ fontSize: '0.7em' }} />
          )}
        </Link>
      )}
      
      {/* 含子菜单的按钮 */}
      {hasSubMenu && (
        <div 
          className={`menu-item-dropdown cursor-pointer flex justify-center items-center px-4 py-0.5 no-underline tracking-widest transition-all duration-75 relative ${textWhite ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}
          style={{
            borderRadius: '50px',
            fontSize: '18px',
            fontWeight: '700'
          }}>
          {link?.icon && <i className={link?.icon + ' mr-2'} />}{link?.name}
          
          {/* Linear 风格的安全区域 - 三角形区域让用户可以对角线移动鼠标 */}
          {show && <SafeArea subMenuRef={submenuRef} />}
          
          {/* 主菜单下方的基础安全区域 */}
          {show && (
            <div className='absolute w-full h-4 -bottom-4 left-0 bg-transparent z-30'></div>
          )}
        </div>
      )}
      
      {/* 子菜单 */}
      {hasSubMenu && (
        <ul
          ref={submenuRef}
          className={`${show ? 'visible opacity-100 top-14 pointer-events-auto' : 'invisible opacity-0 top-20 pointer-events-none'} drop-shadow-lg bg-white dark:bg-gray-800 z-20 absolute flex flex-row whitespace-nowrap min-w-max`}
          style={{
            backdropFilter: 'blur(3px)',
            borderWidth: '2px', 
            borderStyle: 'solid',
            borderRadius: '50px',
            borderColor: borderColor,
            left: '50%',
            transform: `translateX(-50%) ${show ? 'scale(1)' : 'scale(0.95)'}`,
            transformOrigin: 'top center',
            padding: '8px 12px', // 进一步增加容器内边距，让紫色胶囊与外边框有更大的距离
            // 弹簧动画效果
            transition: show 
              ? 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' // 进入时的弹簧效果
              : 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)' // 退出时的平滑效果
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleSubmenuMouseMove}>
          {link.subMenus.map((sLink, index) => {
            const scale = getMagneticScale(index, link.subMenus.length)
            return (
              <li
                key={index}
                className='flex-shrink-0'
                style={{
                  margin: '4px 6px', // 适当减少外边距，配合容器内边距调整，保持整体紧凑但留有呼吸空间
                  transform: `scale(${scale})`,
                  transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transformOrigin: 'center'
                }}>
                <Link 
                  href={sLink.href} 
                  target={sLink?.target || link?.target}
                  className='menu-item-sub group/sublink cursor-pointer text-gray-700 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-200 tracking-widest transition-all duration-200 block hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95'
                  style={{
                    borderRadius: '50px',
                    padding: '3px 10px', // 按比例减少内边距，使紫色胶囊更小
                    fontSize: '13px',    // 减小字体大小，与整体尺寸协调
                    fontWeight: '500'    // 保持字体粗细
                  }}>
                  <span className='text-sm text-nowrap font-medium'>
                    {sLink?.icon && <i className={sLink?.icon + ' mr-2'} />}
                    {sLink.title}
                    {/* 外链图标：如果子菜单链接是外链，显示外链图标 */}
                    {(sLink?.target === '_blank' || (sLink?.href && (sLink.href.startsWith('http://') || sLink.href.startsWith('https://')))) && (
                      <i className="fas fa-external-link-alt ml-1.5 text-gray-700 dark:text-gray-200 opacity-60 group-hover/sublink:text-white group-hover/sublink:opacity-100 transition-all duration-200" style={{ fontSize: '0.7em' }} />
                    )}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
