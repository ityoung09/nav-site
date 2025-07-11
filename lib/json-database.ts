// JSON文件数据库 - 替代SQLite
import fs from 'fs'
import path from 'path'
import type { Category, Resource, CodeSnippet } from './data'

interface Database {
  categories: Category[]
  resources: Resource[]
  code_snippets: CodeSnippet[]
}

const dbPath = path.join(process.cwd(), 'data', 'db.json')
const dataDir = path.dirname(dbPath)

// 确保数据目录存在
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// 初始化数据
const initialData: Database = {
  categories: [
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
  ],
  resources: [
    {
      id: "1",
      name: "VS Code",
      description: "免费的源代码编辑器，支持调试、语法高亮和Git集成",
      url: "https://code.visualstudio.com",
      category: "编辑器",
      tags: ["编辑器", "微软", "免费"],
      featured: true,
      icon: "VS",
      type: "featured",
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
      type: "featured",
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
      type: "featured",
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
      type: "featured",
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
      type: "featured",
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
      type: "featured",
    },
    {
      id: "7",
      name: "Postman",
      description: "API开发和测试工具",
      url: "https://www.postman.com",
      category: "API工具",
      tags: ["api", "测试", "开发"],
      featured: false,
      icon: "PM",
      type: "tools",
    },
    {
      id: "8",
      name: "Docker",
      description: "容器化平台，简化应用部署",
      url: "https://www.docker.com",
      category: "容器",
      tags: ["容器", "部署", "devops"],
      featured: false,
      icon: "DK",
      type: "tools",
    },
  ],
  code_snippets: [
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
    {
      id: "3",
      title: "深拷贝对象",
      description: "递归深度复制对象",
      language: "JavaScript",
      code: `function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const cloned = {};
    Object.keys(obj).forEach(key => {
      cloned[key] = deepClone(obj[key]);
    });
    return cloned;
  }
}`,
      tags: ["对象", "拷贝", "工具"],
    },
  ],
}

function readDatabase(): Database {
  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('读取数据库失败:', error)
  }
  
  // 如果文件不存在或读取失败，创建初始数据
  writeDatabase(initialData)
  return initialData
}

function writeDatabase(data: Database): void {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('写入数据库失败:', error)
    throw error
  }
}

// 分类操作
export function getCategories(): Category[] {
  const db = readDatabase()
  return db.categories
}

export function getCategoryById(id: string): Category | null {
  const db = readDatabase()
  return db.categories.find(cat => cat.id === id) || null
}

export function addCategory(category: Omit<Category, "id">): Category {
  const db = readDatabase()
  const newCategory: Category = {
    id: Date.now().toString(),
    ...category,
  }
  db.categories.push(newCategory)
  writeDatabase(db)
  return newCategory
}

export function updateCategory(id: string, updates: Partial<Category>): Category | null {
  const db = readDatabase()
  const index = db.categories.findIndex(cat => cat.id === id)
  if (index === -1) return null
  
  db.categories[index] = { ...db.categories[index], ...updates }
  writeDatabase(db)
  return db.categories[index]
}

export function deleteCategory(id: string): boolean {
  const db = readDatabase()
  const index = db.categories.findIndex(cat => cat.id === id)
  if (index === -1) return false
  
  db.categories.splice(index, 1)
  writeDatabase(db)
  return true
}

// 资源操作
export function getResources(type?: string): Resource[] {
  const db = readDatabase()
  if (type) {
    return db.resources.filter(r => r.type === type)
  }
  return db.resources
}

export function getResourceById(id: string): Resource | null {
  const db = readDatabase()
  return db.resources.find(r => r.id === id) || null
}

export function addResource(
  resource: Omit<Resource, "id">,
  type: "featured" | "tools" | "documentation" | "community" = "featured"
): Resource {
  const db = readDatabase()
  const newResource: Resource = {
    id: Date.now().toString(),
    ...resource,
    type,
  }
  db.resources.push(newResource)
  writeDatabase(db)
  return newResource
}

export function updateResource(
  id: string,
  updates: Partial<Resource>,
  type?: "featured" | "tools" | "documentation" | "community"
): Resource | null {
  const db = readDatabase()
  const index = db.resources.findIndex(r => r.id === id)
  if (index === -1) return null
  
  db.resources[index] = { ...db.resources[index], ...updates }
  if (type) {
    db.resources[index].type = type
  }
  writeDatabase(db)
  return db.resources[index]
}

export function deleteResource(id: string): boolean {
  const db = readDatabase()
  const index = db.resources.findIndex(r => r.id === id)
  if (index === -1) return false
  
  db.resources.splice(index, 1)
  writeDatabase(db)
  return true
}

// 代码片段操作
export function getCodeSnippets(): CodeSnippet[] {
  const db = readDatabase()
  return db.code_snippets
}

export function getCodeSnippetById(id: string): CodeSnippet | null {
  const db = readDatabase()
  return db.code_snippets.find(cs => cs.id === id) || null
}

export function addCodeSnippet(snippet: Omit<CodeSnippet, "id">): CodeSnippet {
  const db = readDatabase()
  const newSnippet: CodeSnippet = {
    id: Date.now().toString(),
    ...snippet,
  }
  db.code_snippets.push(newSnippet)
  writeDatabase(db)
  return newSnippet
}

export function updateCodeSnippet(id: string, updates: Partial<CodeSnippet>): CodeSnippet | null {
  const db = readDatabase()
  const index = db.code_snippets.findIndex(cs => cs.id === id)
  if (index === -1) return null
  
  db.code_snippets[index] = { ...db.code_snippets[index], ...updates }
  writeDatabase(db)
  return db.code_snippets[index]
}

export function deleteCodeSnippet(id: string): boolean {
  const db = readDatabase()
  const index = db.code_snippets.findIndex(cs => cs.id === id)
  if (index === -1) return false
  
  db.code_snippets.splice(index, 1)
  writeDatabase(db)
  return true
} 