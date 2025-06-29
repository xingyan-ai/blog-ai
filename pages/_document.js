// eslint-disable-next-line @next/next/no-document-import-in-page
import BLOG from '@/blog.config'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
      <Html lang={BLOG.LANG}>
        <Head>
        {/* 添加iconfont直接引用链接，确保加载 */}
        <link rel="stylesheet" href="https://at.alicdn.com/t/c/font_4902131_mf5n8tfonf.css" />
        {/* 添加FontAwesome CSS */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
