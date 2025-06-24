# 基于Notion API的AI增强博客平台

## 项目介绍

blog-ai 是一个基于 Notion API 和 NextJS 实现的、具有 AI 增强功能的静态博客系统。我们在 NotionNext 的基础上进行了改进和扩展，加入了多种AI功能，为内容创作者提供更智能的写作辅助和用户交互体验。

> 本项目为免费、开源资源，仅限个人学习和非商业使用。禁止用于发布非法内容或进行违法活动。使用过程中请遵守相关法律法规。

## 主要特性

- **Notion作为CMS**：利用Notion作为内容管理系统，无需数据库，零门槛搭建网站
- **AI内容生成**：集成AI辅助写作功能，帮助创作者更高效地创建内容
- **AI智能摘要**：自动为长文章生成摘要，提升读者阅读体验
- **AI内容推荐**：基于用户阅读历史和文章内容，智能推荐相关文章
- **多语言支持**：支持多语言内容自动翻译和展示
- **多主题支持**：提供多种精美主题，满足不同风格需求
- **SEO优化**：针对搜索引擎优化，提高网站可见性
- **响应式设计**：完美适配各种设备屏幕尺寸

## 预览

在线演示：[https://blog.xingyan.me/](https://blog.xingyan.me/)

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
```

5. 配置环境变量
复制`.env.example`文件为`.env.local`并填写必要的配置信息：
```
NOTION_PAGE_ID=your-notion-page-id
```

6. 启动开发服务器
```bash
yarn dev
```

现在你可以访问 `http://localhost:3000` 查看你的博客。

## 项目部署

### 使用Vercel部署

1. Fork本仓库
2. 在Vercel中导入该项目：[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fxingyan-ai%2Fblog-ai&env=NOTION_PAGE_ID,NOTION_ACCESS_TOKEN&project-name=blog-ai&repository-name=blog-ai)
3. 配置环境变量
4. 部署

详细文档请参考：[完整安装文档](https://docs.xingyan.me/blog-ai)

## 自定义配置

你可以通过修改`blog.config.js`文件来自定义博客配置，包括主题、网站信息、插件等。

## 技术栈

- **框架**: [Next.js](https://nextjs.org)
- **样式**: [Tailwind CSS](https://www.tailwindcss.cn/)
- **AI功能**: [OpenAI API](https://openai.com/api/), [LangChain](https://js.langchain.com/)
- **渲染**: [React-notion-x](https://github.com/NotionX/react-notion-x)
- **评论**: [Twikoo](https://github.com/imaegoo/twikoo), [Giscus](https://giscus.app/zh-CN)
- **图标**: [Fontawesome](https://fontawesome.com/v6/icons/)

## 贡献

欢迎提交PR、Issue或功能建议！任何形式的贡献都将受到高度重视。

## 许可证

The MIT License.

## 致谢

本项目基于 [NotionNext](https://github.com/tangly1024/NotionNext) 进行开发，感谢原作者的杰出工作。
