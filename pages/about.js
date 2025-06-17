import { useState, useEffect } from 'react';
import { getGlobalData } from '@/lib/db/getSiteData';
import { DynamicLayout } from '@/themes/theme';
import { siteConfig } from '@/lib/config';
import BLOG from '@/blog.config';

const AboutPageWithIframe = (props) => {
  // 使用你提供的张博贤个人博客关于页面的 URL
  const aboutUrl = 'https://about.xingyan.me/'; 

  const [iframeHeight] = useState('calc(100vh - 64px)'); // 减去导航栏高度，无需减去底部因为已隐藏

  // 强制使用浅色模式
  useEffect(() => {
    // 移除暗色模式类
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    // 确保body背景是白色
    document.body.style.backgroundColor = '#f7f9fe';
  }, []);

  // 获取主题配置
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG);

  return (
    <>
      {/* 强制浅色模式样式 */}
      <style jsx global>{`
        html {
          background-color: #f7f9fe !important;
        }
        body {
          background-color: #f7f9fe !important;
        }
        .dark {
          background-color: #f7f9fe !important;
        }
      `}</style>

      {/* 使用主布局，但传递特殊的layoutName */}
      <DynamicLayout theme={theme} layoutName='LayoutAbout' {...props}>
        {/* iframe嵌入内容 */}
        <div className="w-full overflow-hidden" style={{ height: iframeHeight }}>
          <iframe
            src={aboutUrl}
            title="张博贤的关于页面"
            style={{
              width: '100%',
              height: '100%',
              border: 'none', // 移除边框
            }}
            loading="lazy" // 懒加载 iframe
          />
        </div>
      </DynamicLayout>
    </>
  );
};

/**
 * SSG 获取数据 - 和首页一样获取完整的菜单数据
 * @returns
 */
export async function getStaticProps(req) {
  const { locale } = req;
  const from = 'about';
  const props = await getGlobalData({ from, locale });

  // 标记这是about页面，用于隐藏暗色模式按钮
  props.isAboutPage = true;

  return {
    props,
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          BLOG.NEXT_REVALIDATE_SECOND,
          props.NOTION_CONFIG
        )
  };
}

export default AboutPageWithIframe; 