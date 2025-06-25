import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const [borderColor, setBorderColor] = useState('#425AEF')
  const submenuRef = useRef(null)
  const hasSubMenu = link?.subMenus?.length > 0

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

  if (!link || !link.show) {
    return null
  }

  return (
    <div
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}>
      {/* 不含子菜单 */}
      {!hasSubMenu && (
                <Link
          target={link?.target}
          href={link?.href}
          className='menu-item-simple flex justify-center items-center px-4 py-1.5 no-underline tracking-widest transition-all duration-75 text-gray-800 dark:text-gray-200'
          style={{
            borderRadius: '50px'
          }}>
          {link?.icon && <i className={link?.icon + ' mr-2'} />}{link?.name}
        </Link>
      )}
      {/* 含子菜单的按钮 */}
      {hasSubMenu && (
        <>
                    <div 
            className='menu-item-dropdown cursor-pointer flex justify-center items-center px-4 py-1.5 no-underline tracking-widest transition-all duration-75 relative text-gray-800 dark:text-gray-200'
            style={{
              borderRadius: '50px'
            }}>
            {link?.icon && <i className={link?.icon + ' mr-2'} />}{link?.name}
            {/* 主菜单下方的安全区域 */}
            {show && (
              <div className='absolute w-full h-4 -bottom-4 left-0 bg-transparent z-30'></div>
            )}
          </div>
        </>
      )}
      {/* 子菜单 */}
      {hasSubMenu && (
        <ul
          ref={submenuRef}
          style={{
            backdropFilter: 'blur(3px)',
            borderWidth: '2px', 
            borderStyle: 'solid',
            borderRadius: '50px',
            borderColor: borderColor,
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          className={`${show ? 'visible opacity-100 top-14 pointer-events-auto' : 'invisible opacity-0 top-20 pointer-events-none'} drop-shadow-lg bg-white dark:bg-gray-800 transition-all duration-100 z-20 absolute flex flex-row whitespace-nowrap min-w-max`}>
          {link.subMenus.map((sLink, index) => {
            return (
              <li
                key={index}
                className='flex-shrink-0'
                style={{
                  margin: '5px'
                }}>
                <Link 
                  href={sLink.href} 
                  target={link?.target}
                  className='menu-item-sub cursor-pointer text-gray-700 dark:text-gray-200 tracking-widest transition-all duration-75 block'
                  style={{
                    borderRadius: '50px',
                    padding: '6px 16px'
                  }}>
                  <span className='text-sm text-nowrap font-medium'>
                    {sLink?.icon && <i className={sLink?.icon + ' mr-2'} />}
                    {sLink.title}
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
