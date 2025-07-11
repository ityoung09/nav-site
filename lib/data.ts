export interface Category {
  id: string
  name: string
  description: string
  icon: string
  count: number
}

export interface Resource {
  id: string
  name: string
  description: string
  url: string
  category: string
  tags: string[]
  featured?: boolean
  icon?: string
  type?: string
}

export interface CodeSnippet {
  id: string
  title: string
  description: string
  language: string
  code: string
  tags: string[]
}

// 静态数据 - 用于客户端渲染，服务器端会从数据库获取
const staticCategories: Category[] = [
  {
    id: "code-snippets",
    name: "代码片段",
    description: "即用代码示例",
    icon: "Code",
    count: 150,
  },
  {
    id: "documentation",
    name: "文档资料",
    description: "官方文档和指南",
    icon: "Book",
    count: 85,
  },
  {
    id: "tools",
    name: "开发工具",
    description: "开发和调试工具",
    icon: "Wrench",
    count: 120,
  },
  {
    id: "community",
    name: "社区论坛",
    description: "论坛和社交平台",
    icon: "Users",
    count: 45,
  },
  {
    id: "ui-ux",
    name: "UI/UX设计",
    description: "界面设计和用户体验",
    icon: "Palette",
    count: 78,
  },
  {
    id: "databases",
    name: "数据库",
    description: "数据库相关资源",
    icon: "Database",
    count: 65,
  },
  {
    id: "apis",
    name: "API接口",
    description: "API开发和接口文档",
    icon: "Globe",
    count: 92,
  },
  {
    id: "performance",
    name: "性能优化",
    description: "性能分析和优化",
    icon: "Zap",
    count: 43,
  },
  {
    id: "articles",
    name: "技术文章",
    description: "技术博客和教程",
    icon: "FileText",
    count: 156,
  },
  {
    id: "frameworks",
    name: "框架库",
    description: "前后端框架和库",
    icon: "Layers",
    count: 89,
  },
]

const staticFeaturedResources: Resource[] = [
  {
    id: "1",
    name: "VS Code",
    description: "免费的源代码编辑器，支持调试、语法高亮和Git集成",
    url: "https://code.visualstudio.com",
    category: "编辑器",
    tags: ["编辑器", "微软", "免费"],
    featured: true,
    icon: "VS",
  },
  {
    id: "2",
    name: "GitHub",
    description: "基于Web的版本控制和协作平台",
    url: "https://github.com",
    category: "版本控制",
    tags: ["git", "协作", "托管"],
    featured: true,
    icon: "GH",
  },
  {
    id: "3",
    name: "Stack Overflow",
    description: "程序员问答平台，分享知识和解决问题",
    url: "https://stackoverflow.com",
    category: "社区",
    tags: ["问答", "社区", "帮助"],
    featured: true,
    icon: "SO",
  },
  {
    id: "4",
    name: "MDN Web 文档",
    description: "Web开发者的综合资源，包含文档和教程",
    url: "https://developer.mozilla.org",
    category: "文档",
    tags: ["web", "javascript", "css", "html"],
    featured: true,
    icon: "MD",
  },
  {
    id: "5",
    name: "CodePen",
    description: "在线代码编辑器和前端开发学习环境",
    url: "https://codepen.io",
    category: "在线编辑器",
    tags: ["前端", "html", "css", "javascript"],
    featured: true,
    icon: "CP",
  },
  {
    id: "6",
    name: "Figma",
    description: "协作界面设计工具，用于创建用户界面和原型",
    url: "https://figma.com",
    category: "设计",
    tags: ["设计", "ui", "原型"],
    featured: true,
    icon: "FG",
  },
]

const staticCodeSnippets: CodeSnippet[] = [
  {
    id: "1",
    title: "数组洗牌",
    description: "使用Fisher-Yates算法随机打乱数组元素",
    language: "JavaScript",
    code: `function shuffle(array) {
for (let i = array.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [array[i], array[j]] = [array[j], array[i]];
}
return array;
}`,
    tags: ["数组", "随机", "算法"],
  },
  {
    id: "2",
    title: "防抖函数",
    description: "延迟函数执行直到指定时间后",
    language: "JavaScript",
    code: `function debounce(func, delay) {
let timeoutId;
return function (...args) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => func.apply(this, args), delay);
};
}`,
    tags: ["性能", "优化", "工具"],
  },
]

// 导出静态数据（客户端安全）
export const categories = staticCategories
export const featuredResources = staticFeaturedResources
export const codeSnippets = staticCodeSnippets
export const developerTools = staticFeaturedResources.filter(r => r.category === '工具')
export const documentationResources = staticFeaturedResources.filter(r => r.category === '文档')
export const communityResources = staticFeaturedResources.filter(r => r.category === '社区')
