/**
 * 网站字体相关配置
 *
 */
module.exports = {
  // START ************网站字体*****************
  // ['font-serif','font-sans'] 两种可选，分别是衬线和无衬线: 参考 https://www.jianshu.com/p/55e410bd2115
  // 后面空格隔开的字体粗细，留空是默认粗细；参考 https://www.tailwindcss.cn/docs/font-weight
  FONT_STYLE: process.env.NEXT_PUBLIC_FONT_STYLE || 'font-sans font-light',
  // 字体CSS 
  FONT_URL: [
    'https://fonts.googleapis.com/css2?family=Source+Han+Sans+SC:wght@300;400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Helvetica+Neue:wght@300;400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap'
  ],
  // 无衬线字体 - 优先使用思源黑体和Helvetica
  FONT_SANS: [
    '"Source Han Sans SC"',       // 思源黑体 - 主要中文字体
    '"Helvetica Neue"',           // Helvetica字体 - 主要英文字体
    'Helvetica',                  // Helvetica备用
    '-apple-system',              // 苹果系统字体
    'BlinkMacSystemFont',         // Chrome系统字体
    '"Noto Sans SC"',             // 谷歌中文字体
    '"Segoe UI"',                 // Windows UI字体
    'Roboto',                     // Android字体
    '"PingFang SC"',              // 苹果中文字体(备用)
    '"Hiragino Sans GB"',         // 冬青黑体(备用)
    '"Microsoft YaHei"',          // 微软雅黑(备用)
    'Arial',                      // 通用英文字体
    'sans-serif'                  // 系统默认无衬线字体
  ].join(','),

  // 衬线字体 - 保留配置但不使用
  FONT_SERIF: [
    '"Noto Serif SC"',
    'SimSun',
    '"Times New Roman"',
    'serif'
  ].join(','),
  // END ************网站字体*****************
}
