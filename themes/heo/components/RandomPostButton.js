import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'

/**
 * 随机跳转到一个文章
 */
export default function RandomPostButton(props) {
  const { latestPosts, textWhite } = props
  const router = useRouter()
  const { locale } = useGlobal()
  /**
   * 随机跳转文章
   */
  function handleClick() {
    const randomIndex = Math.floor(Math.random() * latestPosts.length)
    const randomPost = latestPosts[randomIndex]
    router.push(`${siteConfig('SUB_PATH', '')}/${randomPost?.slug}`)
  }

  return (
        <div title={locale.MENU.WALK_AROUND} className={`cursor-pointer hover:bg-indigo-600 dark:hover:bg-yellow-600 hover:text-white rounded-full w-8 h-8 flex justify-center items-center duration-200 transition-all opacity-100 visible ${textWhite ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`} onClick={handleClick}>
            <i className="fa-solid fa-podcast opacity-100 visible text-current"></i>
        </div>
  )
}
