import Database from 'better-sqlite3'
import path from 'path'

// 数据库文件路径
const dbPath = path.join(process.cwd(), 'data.db')

// 创建或连接数据库
const db = new Database(dbPath)

// 启用外键约束
db.pragma('foreign_keys = ON')

// 创建表结构
export function initDatabase() {
  // 分类表
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL,
      count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // 资源表
  db.exec(`
    CREATE TABLE IF NOT EXISTS resources (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      url TEXT NOT NULL,
      category TEXT NOT NULL,
      tags TEXT NOT NULL, -- JSON格式存储
      featured BOOLEAN DEFAULT 0,
      icon TEXT,
      type TEXT NOT NULL DEFAULT 'featured', -- featured, tools, documentation, community
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // 代码片段表
  db.exec(`
    CREATE TABLE IF NOT EXISTS code_snippets (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      language TEXT NOT NULL,
      code TEXT NOT NULL,
      tags TEXT NOT NULL, -- JSON格式存储
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // 插入初始数据（如果表为空）
  const categoryCount = db.prepare('SELECT COUNT(*) as count FROM categories').get() as { count: number }
  
  if (categoryCount.count === 0) {
    insertInitialData()
  }

  console.log('数据库初始化完成')
}

// 插入初始数据
function insertInitialData() {
  const insertCategory = db.prepare(`
    INSERT INTO categories (id, name, description, icon, count) 
    VALUES (?, ?, ?, ?, ?)
  `)

  const insertResource = db.prepare(`
    INSERT INTO resources (id, name, description, url, category, tags, featured, icon, type) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const insertCodeSnippet = db.prepare(`
    INSERT INTO code_snippets (id, title, description, language, code, tags) 
    VALUES (?, ?, ?, ?, ?, ?)
  `)

  // 插入分类数据
  const categories = [
    ['code-snippets', '代码片段', '即用代码示例', 'Code', 150],
    ['documentation', '文档资料', '官方文档和指南', 'Book', 85],
    ['tools', '开发工具', '开发和调试工具', 'Wrench', 120],
    ['community', '社区论坛', '论坛和社交平台', 'Users', 45],
    ['ui-ux', 'UI/UX设计', '界面设计和用户体验', 'Palette', 78],
    ['databases', '数据库', '数据库相关资源', 'Database', 65],
    ['apis', 'API接口', 'API开发和接口文档', 'Globe', 92],
    ['performance', '性能优化', '性能分析和优化', 'Zap', 43],
    ['articles', '技术文章', '技术博客和教程', 'FileText', 156],
    ['frameworks', '框架库', '前后端框架和库', 'Layers', 89],
  ]

  // 插入资源数据
  const resources = [
    ['1', 'VS Code', '免费的源代码编辑器，支持调试、语法高亮和Git集成', 'https://code.visualstudio.com', '编辑器', JSON.stringify(['编辑器', '微软', '免费']), 1, 'VS', 'featured'],
    ['2', 'GitHub', '基于Web的版本控制和协作平台', 'https://github.com', '版本控制', JSON.stringify(['git', '协作', '托管']), 1, 'GH', 'featured'],
    ['3', 'Stack Overflow', '程序员问答平台，分享知识和解决问题', 'https://stackoverflow.com', '社区', JSON.stringify(['问答', '社区', '帮助']), 1, 'SO', 'featured'],
    ['4', 'MDN Web 文档', 'Web开发者的综合资源，包含文档和教程', 'https://developer.mozilla.org', '文档', JSON.stringify(['web', 'javascript', 'css', 'html']), 1, 'MD', 'featured'],
    ['5', 'CodePen', '在线代码编辑器和前端开发学习环境', 'https://codepen.io', '在线编辑器', JSON.stringify(['前端', 'html', 'css', 'javascript']), 1, 'CP', 'featured'],
    ['6', 'Figma', '协作界面设计工具，用于创建用户界面和原型', 'https://figma.com', '设计', JSON.stringify(['设计', 'ui', '原型']), 1, 'FG', 'featured'],
  ]

  // 插入代码片段数据
  const codeSnippets = [
    ['1', '数组洗牌', '使用Fisher-Yates算法随机打乱数组元素', 'JavaScript', `function shuffle(array) {
for (let i = array.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [array[i], array[j]] = [array[j], array[i]];
}
return array;
}`, JSON.stringify(['数组', '随机', '算法'])],
    ['2', '防抖函数', '延迟函数执行直到指定时间后', 'JavaScript', `function debounce(func, delay) {
let timeoutId;
return function (...args) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => func.apply(this, args), delay);
};
}`, JSON.stringify(['性能', '优化', '工具'])],
  ]

  // 执行插入
  const insertCategoryBatch = db.transaction((cats: (string | number)[][]) => {
    for (const cat of cats) {
      insertCategory.run(...cat)
    }
  })

  const insertResourceBatch = db.transaction((resources: (string | number)[][]) => {
    for (const resource of resources) {
      insertResource.run(...resource)
    }
  })

  const insertCodeSnippetBatch = db.transaction((snippets: string[][]) => {
    for (const snippet of snippets) {
      insertCodeSnippet.run(...snippet)
    }
  })

  insertCategoryBatch(categories)
  insertResourceBatch(resources)
  insertCodeSnippetBatch(codeSnippets)

  console.log('初始数据插入完成')
}

export default db 