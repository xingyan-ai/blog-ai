# 基于Notion API的AI增强博客平台

## 项目介绍

blog-ai 是一个基于 Notion API 和 NextJS 实现的、具有 AI 增强功能的静态博客系统。我们在 NotionNext 的基础上进行了改进和扩展，加入了多种AI功能，为内容创作者提供更智能的写作辅助和用户交互体验。

> 本项目为免费、开源资源，仅限个人学习和非商业使用。禁止用于发布非法内容或进行违法活动。使用过程中请遵守相关法律法规。

## 项目状态 🚀

✅ **已完成功能**
- 🎵 **音乐播放器** - 集成酷狗音乐平台，支持播放列表
- 📱 **图标系统** - 集成阿里巴巴图标库，支持自定义图标
- 📄 **关于页面** - 嵌入式个人展示页面，完整UI优化
- 🎨 **HEO主题** - 精美的英雄区布局，支持分类标签导航
- 🔧 **页面定制** - 支持页面级UI元素隐藏和样式覆盖
- 📝 **通知系统** - 可配置的顶部通知滚动条

🔄 **开发中功能**
- 🤖 AI内容生成和智能摘要
- 🎯 AI智能推荐系统
- 🌐 多语言AI翻译
- 📊 访问统计和分析面板

## 主要特性

- **Notion作为CMS**：利用Notion作为内容管理系统，无需数据库，零门槛搭建网站
- **音乐播放器**：内置音乐播放器，支持酷狗、网易云等平台
- **图标系统**：集成阿里巴巴图标库，丰富的图标选择
- **关于页面**：支持嵌入式个人展示页面，完美适配主题
- **多主题支持**：提供多种精美主题，满足不同风格需求
- **SEO优化**：针对搜索引擎优化，提高网站可见性
- **响应式设计**：完美适配各种设备屏幕尺寸
- **页面级定制**：支持细粒度的UI元素控制

## 当前版本亮点

### 🎵 音乐播放器
- 支持酷狗音乐平台
- 可配置播放列表ID
- 歌词显示功能
- 关闭自动播放，优化用户体验

### 📱 图标系统 
- 集成阿里巴巴图标库
- 支持菜单图标：icon-caidan
- 支持博客图标：icon-blog
- 完整的CSS样式支持

### 📄 关于页面优化
- 嵌入 https://about.xingyan.me/ 
- 移除重复导航栏和footer
- 隐藏搜索、随机文章等按钮
- 强制浅色模式，保持一致性
- 自适应高度布局

### 🎨 HEO主题增强
- 英雄区三个分类标签：必看精选、热门文章、实用教程
- 可配置的通知条系统
- 完整的响应式布局

## 预览

在线演示：[https://blog.xingyan.me/](https://blog.xingyan.me/)
关于页面：[https://about.xingyan.me/](https://about.xingyan.me/)

## 快速开始

### 环境准备

- Node.js >= 14
- 一个Notion账号和数据库

### 安装步骤

1. 复制Notion模板：[获取模板](https://xingyan.notion.site/02ab3b8678004aa69e9e415905ef32a5)
2. 获取Notion页面ID和Integration Token
3. 克隆仓库
```bash
git clone https://github.com/xingyan-ai/blog-ai.git
cd blog-ai
```

4. 安装依赖
```bash
yarn install
# 或
npm install
```

5. 配置环境变量
复制`.env.example`文件为`.env.local`并填写必要的配置信息：
```
NOTION_PAGE_ID=your-notion-page-id
```

6. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

现在你可以访问 `http://localhost:3000` 查看你的博客。

## 功能配置

### 音乐播放器配置
在 `conf/widget.config.js` 中配置：
```javascript
MUSIC_PLAYER: true, // 启用音乐播放器
MUSIC_PLAYER_METING_SERVER: 'kugou', // 音乐平台
MUSIC_PLAYER_METING_ID: '你的播放列表ID', // 播放列表ID
```

### HEO主题配置
在 `themes/heo/config.js` 中配置：
```javascript
// 通知条配置
HEO_NOTICE_BAR: [
  { title: '通知内容', url: '跳转链接' }
],

// 英雄区分类标签
HEO_HERO_CATEGORY_1: { title: '标签名', url: '链接地址' },
```

### 图标配置
在 `conf/font.config.js` 中配置阿里巴巴图标库CDN链接。

## 项目部署

### 使用Vercel部署

1. Fork本仓库
2. 在Vercel中导入该项目：[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fxingyan-ai%2Fblog-ai&env=NOTION_PAGE_ID,NOTION_ACCESS_TOKEN&project-name=blog-ai&repository-name=blog-ai)
3. 配置环境变量
4. 部署

详细文档请参考：[完整安装文档](https://docs.xingyan.me/blog-ai)

## 自定义配置

你可以通过修改以下配置文件来自定义博客：
- `blog.config.js` - 主配置文件
- `themes/heo/config.js` - HEO主题配置
- `conf/widget.config.js` - 组件配置
- `conf/font.config.js` - 字体和图标配置

## 技术栈

- **框架**: [Next.js](https://nextjs.org)
- **样式**: [Tailwind CSS](https://www.tailwindcss.cn/)
- **图标**: [阿里巴巴图标库](https://www.iconfont.cn/), [Fontawesome](https://fontawesome.com/v6/icons/)
- **音乐**: [MetingJS](https://github.com/metowolf/MetingJS)
- **动画**: [Framer Motion](https://www.framer.com/motion/)
- **渲染**: [React-notion-x](https://github.com/NotionX/react-notion-x)
- **评论**: [Twikoo](https://github.com/imaegoo/twikoo), [Giscus](https://giscus.app/zh-CN)

## 更新日志

### v1.1.0 (2025-01-17)
- ✅ 新增音乐播放器功能，支持酷狗音乐平台
- ✅ 集成阿里巴巴图标库，丰富图标选择
- ✅ 创建关于页面，支持嵌入式展示
- ✅ 优化HEO主题，完善英雄区布局
- ✅ 实现页面级UI定制功能
- ✅ 配置通知系统和分类导航

### v1.0.0 (2025-01-16)  
- ✅ 基础项目框架搭建
- ✅ Notion API集成
- ✅ 多主题支持

## 贡献

欢迎提交PR、Issue或功能建议！任何形式的贡献都将受到高度重视。

## 许可证

The MIT License.

## 致谢

本项目基于 [NotionNext](https://github.com/tangly1024/NotionNext) 进行开发，感谢原作者的杰出工作。
