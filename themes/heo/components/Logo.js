import { siteConfig } from '@/lib/config'
import LazyImage from '@/components/LazyImage'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Logo = props => {
  const { textWhite } = props
  const router = useRouter()
  // 判断是否为文章详情页
  const isSlugPage = router.pathname.indexOf('/[prefix]') === 0
  
  return (
    <Link href='/' passHref legacyBehavior>
      <div className='flex flex-nowrap items-center cursor-pointer font-extrabold'>
        <div id='logo-container' className='group rounded-2xl flex-none relative h-8'>
          <div className='logo group-hover:opacity-0 opacity-100 visible group-hover:invisible duration-200 flex items-center h-8'>
            {textWhite ? (
              // 白色文字时（黑色背景/蓝色背景）：使用白色logo
              <LazyImage 
                src="/白改.png" 
                alt="Logo" 
                className="h-8 w-auto object-contain rounded"
              />
            ) : (
              // 黑色文字时（白色背景）：使用黑色logo，但在深色模式下使用白色logo
              <>
                <LazyImage 
                  src="/黑改.png" 
                  alt="Logo" 
                  className="h-8 w-auto object-contain rounded block dark:hidden"
                />
                <LazyImage 
                  src="/白改.png" 
                  alt="Logo" 
                  className="h-8 w-auto object-contain rounded hidden dark:block"
                />
              </>
            )}
          </div>
          <div className='flex justify-center items-center rounded-full group-hover:bg-indigo-600 dark:group-hover:bg-yellow-600 w-8 h-8 group-hover:opacity-100 opacity-0 invisible group-hover:visible absolute top-0 left-0 duration-200'>
            <i className="fas fa-home text-white text-base"></i>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Logo
