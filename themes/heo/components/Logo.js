import { siteConfig } from '@/lib/config'
import LazyImage from '@/components/LazyImage'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Logo = props => {
  const { textWhite } = props
  return (
    <Link href='/' passHref legacyBehavior>
      <div className='flex flex-nowrap items-center cursor-pointer font-extrabold'>
        <span className={`iconfont icon-caidan text-2xl mr-4 ${textWhite ? 'text-white' : 'text-black dark:text-white'}`}></span>
        <div id='logo-container' className='group rounded-2xl flex-none relative'>
          {/* 默认显示的logo图片 */}
          <div className='logo group-hover:opacity-0 opacity-100 visible group-hover:invisible duration-200 flex items-center'>
            <LazyImage 
              src="/logo.jpg" 
              alt="Logo" 
              className="h-10 w-auto object-contain rounded"
            />
          </div>
          {/* hover时显示的首页图标 */}
          <div className='flex justify-center rounded-2xl group-hover:bg-indigo-600 dark:group-hover:bg-yellow-600 w-full group-hover:opacity-100 opacity-0 invisible group-hover:visible absolute top-2 py-1 duration-200'>
            <LazyImage 
              src="/home-icon.svg" 
              alt="Home" 
              className="h-5 w-5 object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Logo
