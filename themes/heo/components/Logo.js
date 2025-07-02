import { siteConfig } from '@/lib/config'
import LazyImage from '@/components/LazyImage'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Logo = props => {
  const { textWhite } = props
  return (
    <Link href='/' passHref legacyBehavior>
      <div className='flex flex-nowrap items-center cursor-pointer font-extrabold'>
        <div id='logo-container' className='group rounded-2xl flex-none relative h-8'>
          <div className='logo group-hover:opacity-0 opacity-100 visible group-hover:invisible duration-200 flex items-center h-8'>
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
          </div>
          <div className='flex justify-center items-center rounded-2xl group-hover:bg-indigo-600 dark:group-hover:bg-yellow-600 w-full h-8 group-hover:opacity-100 opacity-0 invisible group-hover:visible absolute top-0 duration-200'>
            <i className="fas fa-home text-white text-lg"></i>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Logo
