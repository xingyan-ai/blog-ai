export const aboutData = {
  // 个人信息 (用于头像和主/副标题)
  profile: {
    name: "星彦", // 会显示在 "你好！我是 星彦"
    title: "产品经理", // 之前的用法，现在可能不用或用于其他地方
    bio: "一直在路上", // 之前的用法
    avatar: "/avatar.jpg",
    location: "中国，深圳", // 之前的用法
    greeting: "你好！我是", // 新增：问候语
    mainTitle: "关于我", // 新增：页面主标题
    subTitle: "生活明朗，万物可爱✨" // 新增：页面副标题
  },

  // 环绕头像的标签/卡片
  surroundingTags: [
    {
      id: 1, icon: "🤖️", text: "数码科技爱好者",
      // 精确调整：更靠外，轻微逆时针旋转
      positionClasses: "absolute top-[8%] left-[-8%] md:top-[10%] md:left-[-10%]", // 调整百分比更靠外
      transformClasses: "transform -translate-x-1/2 -translate-y-1/2 rotate-[-6deg]", // 调整旋转角度
      colorClasses: "bg-sky-100 dark:bg-sky-800/70 text-sky-700 dark:text-sky-200 backdrop-blur-sm" // 添加背景模糊
    },
    {
      id: 2, icon: "🔍", text: "分享与热心帮助",
      // 精确调整：更靠外，轻微顺时针旋转
      positionClasses: "absolute top-[42%] left-[-18%] md:top-[45%] md:left-[-22%]", // 调整百分比更靠外
      transformClasses: "transform -translate-x-1/2 -translate-y-1/2 rotate-[4deg]", // 调整旋转角度
      colorClasses: "bg-lime-100 dark:bg-lime-800/70 text-lime-700 dark:text-lime-200 backdrop-blur-sm"
    },
    {
      id: 3, icon: "🏠", text: "智能家居小能手",
      // 精确调整：更靠外，更明显的逆时针旋转
      positionClasses: "absolute top-[78%] left-[-12%] md:top-[80%] md:left-[-15%]", // 调整百分比更靠外
      transformClasses: "transform -translate-x-1/2 -translate-y-1/2 rotate-[-8deg]", // 调整旋转角度
      colorClasses: "bg-amber-100 dark:bg-amber-800/70 text-amber-700 dark:text-amber-200 backdrop-blur-sm"
    },
    {
      id: 9, icon: "✨", text: "预留标签位",
      // 大致在头像左下方，与 id 8 对称
      positionClasses: "absolute top-[96%] left-[15%] md:top-[102%] md:left-[10%]", // 与 id 8 的 right 对应
      transformClasses: "transform -translate-x-1/2 translate-y-1/2 rotate-[5deg]", // 与 id 8 的旋转方向相反
      colorClasses: "bg-teal-100 dark:bg-teal-800/70 text-teal-700 dark:text-teal-200 backdrop-blur-sm" // 使用一个新颜色
    },
    {
      id: 4, icon: "🔨", text: "设计开发一条龙",
      // 精确调整：更靠下，轻微顺时针旋转
      positionClasses: "absolute top-[110%] left-[5%] md:top-[115%] md:left-[2%]", // 调整百分比更靠下和左
      transformClasses: "transform -translate-x-1/2 -translate-y-1/2 rotate-[5deg]", // 调整旋转角度
      colorClasses: "bg-violet-100 dark:bg-violet-800/70 text-violet-700 dark:text-violet-200 backdrop-blur-sm"
    },
    {
      id: 5, icon: "🤝", text: "专修交互与设计",
      // 大致在头像右上方
      positionClasses: "absolute top-[12%] right-[3%] md:top-[18%] md:right-[8%]",
      transformClasses: "translate-x-1/2 -translate-y-1/2 transform md:rotate-[4deg]",
      colorClasses: "bg-fuchsia-100 dark:bg-fuchsia-700 text-fuchsia-700 dark:text-fuchsia-200"
    },
    {
      id: 6, icon: "🏃", text: "脚踏实地行动派",
      // 大致在头像右中
      positionClasses: "absolute top-[42%] right-[-8%] md:top-[48%] md:right-[-2%]",
      transformClasses: "translate-x-1/2 -translate-y-1/2 transform md:rotate-[-2deg]",
      colorClasses: "bg-emerald-100 dark:bg-emerald-700 text-emerald-700 dark:text-emerald-200"
    },
    {
      id: 7, icon: "🧱", text: "团队小组发动机",
      // 大致在头像右下
      positionClasses: "absolute top-[72%] right-[0%] md:top-[78%] md:right-[3%]",
      transformClasses: "translate-x-1/2 -translate-y-1/2 transform md:rotate-[3deg]",
      colorClasses: "bg-rose-100 dark:bg-rose-700 text-rose-700 dark:text-rose-200"
    },
    {
      id: 8, icon: "💢", text: "壮汉人狠话不多",
      // 大致在头像正下方偏右
      positionClasses: "absolute top-[96%] right-[15%] md:top-[102%] md:right-[10%]",
      transformClasses: "translate-x-1/2 translate-y-1/2 transform md:rotate-[-5deg]", // 注意这里是translate-y-1/2
      colorClasses: "bg-orange-100 dark:bg-orange-700 text-orange-700 dark:text-orange-200"
    }
  ],
  
  // 技能标签 (保留之前的结构，后续按需调整样式和布局)
  skills: [
    { name: "产品设计", level: 90 },
    { name: "用户体验", level: 85 },
    { name: "数据分析", level: 80 },
    { name: "项目管理", level: 85 },
    { name: "团队协作", level: 90 }
  ],
  
  // 个人介绍 (这部分内容可以考虑如何融入新的布局)
  introduction: {
    title: "Hello there!", // anzhiyu页面此处是大标题
    content: `我叫 陈志伟
    是一名 前端工程师、学生、独立开发者、博主
    追求 源于 热爱而去 感受 学习生活程序 体验`
  },
  
  // 兴趣爱好 (保留)
  hobbies: [
    { icon: "🎮", name: "游戏" },
    { icon: "📚", name: "阅读" },
    { icon: "🎵", name: "音乐" },
    { icon: "✈️", name: "旅行" }
  ],
  
  // 联系方式 (保留)
  social: [
    { icon: "icon-github", link: "https://github.com/yourusername" },
    { icon: "icon-twitter", link: "https://twitter.com/yourusername" },
    { icon: "icon-zhihu", link: "https://zhihu.com/people/yourusername" }
  ],

  // 性格特征 (保留)
  personality: {
    type: "ESFJ-A",
    title: "执政官",
    description: "在 16personalities 了解更多关于 执政官"
  },

  // 心路历程 (保留，思考如何展示)
  journey: {
    title: "心路历程",
    content: `欢迎来到我的博客 😝，这里是我记笔记的地方 🙌，
    虽然有时候常常会忘记更新笔记，咕咕 ✋~ 
    但是记笔记真的是一个很棒的习惯 💪，
    能把学下来的知识进行积累，沉淀，
    有一句话说的好，能教给别人的知识，才是真正学会了的知识 ⚡`
  }
} 