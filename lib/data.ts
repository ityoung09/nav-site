import { Code, Book, Wrench, Users } from "lucide-react"

export const categories = [
  {
    id: "code-snippets",
    name: "Code Snippets",
    description: "Ready-to-use code examples",
    icon: Code,
    count: 150,
  },
  {
    id: "documentation",
    name: "Documentation",
    description: "Official docs and guides",
    icon: Book,
    count: 85,
  },
  {
    id: "tools",
    name: "Tools",
    description: "Development and debugging tools",
    icon: Wrench,
    count: 120,
  },
  {
    id: "community",
    name: "Community",
    description: "Forums and social platforms",
    icon: Users,
    count: 45,
  },
]

export const featuredResources = [
  {
    id: "1",
    name: "VS Code",
    description: "Free source-code editor with debugging support, syntax highlighting, and Git integration",
    url: "https://code.visualstudio.com",
    category: "Editor",
    tags: ["editor", "microsoft", "free"],
    featured: true,
    icon: "VS",
  },
  {
    id: "2",
    name: "GitHub",
    description: "Web-based version control and collaboration platform for software developers",
    url: "https://github.com",
    category: "Version Control",
    tags: ["git", "collaboration", "hosting"],
    featured: true,
    icon: "GH",
  },
  {
    id: "3",
    name: "Stack Overflow",
    description: "Q&A platform for programmers and developers to share knowledge",
    url: "https://stackoverflow.com",
    category: "Community",
    tags: ["qa", "community", "help"],
    featured: true,
    icon: "SO",
  },
  {
    id: "4",
    name: "MDN Web Docs",
    description: "Comprehensive resource for web developers with documentation and tutorials",
    url: "https://developer.mozilla.org",
    category: "Documentation",
    tags: ["web", "javascript", "css", "html"],
    featured: true,
    icon: "MD",
  },
  {
    id: "5",
    name: "CodePen",
    description: "Online code editor and learning environment for front-end development",
    url: "https://codepen.io",
    category: "Online Editor",
    tags: ["frontend", "html", "css", "javascript"],
    featured: true,
    icon: "CP",
  },
  {
    id: "6",
    name: "Figma",
    description: "Collaborative interface design tool for creating user interfaces and prototypes",
    url: "https://figma.com",
    category: "Design",
    tags: ["design", "ui", "prototyping"],
    featured: true,
    icon: "FG",
  },
]

export const codeSnippets = [
  {
    id: "1",
    title: "Array Shuffle",
    description: "Randomly shuffle array elements using Fisher-Yates algorithm",
    language: "JavaScript",
    code: `function shuffle(array) {
for (let i = array.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [array[i], array[j]] = [array[j], array[i]];
}
return array;
}`,
    tags: ["array", "random", "algorithm"],
  },
  {
    id: "2",
    title: "Debounce Function",
    description: "Delay function execution until after a specified time",
    language: "JavaScript",
    code: `function debounce(func, delay) {
let timeoutId;
return function (...args) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => func.apply(this, args), delay);
};
}`,
    tags: ["performance", "optimization", "utility"],
  },
  {
    id: "3",
    title: "Quick Sort",
    description: "Efficient sorting algorithm implementation",
    language: "Python",
    code: `def quicksort(arr):
  if len(arr) <= 1:
      return arr
  pivot = arr[len(arr) // 2]
  left = [x for x in arr if x < pivot]
  middle = [x for x in arr if x == pivot]
  right = [x for x in arr if x > pivot]
  return quicksort(left) + middle + quicksort(right)`,
    tags: ["sorting", "algorithm", "recursion"],
  },
  {
    id: "4",
    title: "API Fetch with Error Handling",
    description: "Robust API call with proper error handling",
    language: "JavaScript",
    code: `async function fetchData(url) {
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }
  return await response.json();
} catch (error) {
  console.error('Fetch error:', error);
  throw error;
}
}`,
    tags: ["api", "async", "error-handling"],
  },
  {
    id: "5",
    title: "CSS Flexbox Center",
    description: "Perfect centering with flexbox",
    language: "CSS",
    code: `.center {
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
}`,
    tags: ["css", "flexbox", "centering"],
  },
  {
    id: "6",
    title: "React Custom Hook",
    description: "Custom hook for local storage state management",
    language: "React",
    code: `function useLocalStorage(key, initialValue) {
const [storedValue, setStoredValue] = useState(() => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    return initialValue;
  }
});

const setValue = (value) => {
  try {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

return [storedValue, setValue];
}`,
    tags: ["react", "hooks", "localStorage"],
  },
]

export const developerTools = [
  {
    id: "tool-1",
    name: "Postman",
    description: "API development and testing platform",
    url: "https://postman.com",
    category: "API Testing",
    tags: ["api", "testing", "development"],
    icon: "PM",
  },
  {
    id: "tool-2",
    name: "Chrome DevTools",
    description: "Built-in browser debugging and profiling tools",
    url: "https://developer.chrome.com/docs/devtools/",
    category: "Debugging",
    tags: ["debugging", "browser", "performance"],
    icon: "CD",
  },
  {
    id: "tool-3",
    name: "Webpack Bundle Analyzer",
    description: "Visualize size of webpack output files",
    url: "https://github.com/webpack-contrib/webpack-bundle-analyzer",
    category: "Build Tools",
    tags: ["webpack", "bundle", "optimization"],
    icon: "WB",
  },
  {
    id: "tool-4",
    name: "Lighthouse",
    description: "Automated tool for improving web page quality",
    url: "https://developers.google.com/web/tools/lighthouse",
    category: "Performance",
    tags: ["performance", "audit", "seo"],
    icon: "LH",
  },
  {
    id: "tool-5",
    name: "Docker",
    description: "Platform for developing, shipping, and running applications",
    url: "https://docker.com",
    category: "Containerization",
    tags: ["containers", "deployment", "devops"],
    icon: "DK",
  },
  {
    id: "tool-6",
    name: "Prettier",
    description: "Opinionated code formatter for consistent code style",
    url: "https://prettier.io",
    category: "Code Formatting",
    tags: ["formatting", "code-style", "automation"],
    icon: "PR",
  },
]

export const documentationResources = [
  {
    id: "doc-1",
    name: "React Documentation",
    description: "Official React library documentation and guides",
    url: "https://react.dev",
    category: "Framework",
    tags: ["react", "javascript", "frontend"],
    icon: "RC",
  },
  {
    id: "doc-2",
    name: "Next.js Docs",
    description: "Complete guide to the React framework for production",
    url: "https://nextjs.org/docs",
    category: "Framework",
    tags: ["nextjs", "react", "fullstack"],
    icon: "NX",
  },
  {
    id: "doc-3",
    name: "TypeScript Handbook",
    description: "Comprehensive guide to TypeScript language features",
    url: "https://typescriptlang.org/docs",
    category: "Language",
    tags: ["typescript", "javascript", "types"],
    icon: "TS",
  },
  {
    id: "doc-4",
    name: "Node.js Documentation",
    description: "Official Node.js runtime documentation",
    url: "https://nodejs.org/docs",
    category: "Runtime",
    tags: ["nodejs", "javascript", "backend"],
    icon: "ND",
  },
  {
    id: "doc-5",
    name: "Python Documentation",
    description: "Official Python programming language documentation",
    url: "https://docs.python.org",
    category: "Language",
    tags: ["python", "programming", "language"],
    icon: "PY",
  },
  {
    id: "doc-6",
    name: "Tailwind CSS",
    description: "Utility-first CSS framework documentation",
    url: "https://tailwindcss.com/docs",
    category: "CSS Framework",
    tags: ["css", "tailwind", "styling"],
    icon: "TW",
  },
]

export const communityResources = [
  {
    id: "comm-1",
    name: "Reddit - Programming",
    description: "Large programming community with discussions and resources",
    url: "https://reddit.com/r/programming",
    category: "Forum",
    tags: ["forum", "discussion", "community"],
    icon: "RD",
  },
  {
    id: "comm-2",
    name: "Dev.to",
    description: "Community of software developers sharing articles and discussions",
    url: "https://dev.to",
    category: "Blog Platform",
    tags: ["articles", "community", "learning"],
    icon: "DV",
  },
  {
    id: "comm-3",
    name: "Discord - Programming",
    description: "Real-time chat communities for developers",
    url: "https://discord.gg/programming",
    category: "Chat",
    tags: ["chat", "realtime", "community"],
    icon: "DS",
  },
  {
    id: "comm-4",
    name: "Hacker News",
    description: "Social news website focusing on computer science and entrepreneurship",
    url: "https://news.ycombinator.com",
    category: "News",
    tags: ["news", "startups", "technology"],
    icon: "HN",
  },
  {
    id: "comm-5",
    name: "GitHub Discussions",
    description: "Community discussions on GitHub repositories",
    url: "https://github.com/discussions",
    category: "Discussion",
    tags: ["github", "opensource", "discussion"],
    icon: "GD",
  },
  {
    id: "comm-6",
    name: "Stack Overflow",
    description: "Q&A platform for programming questions and answers",
    url: "https://stackoverflow.com",
    category: "Q&A",
    tags: ["qa", "help", "programming"],
    icon: "SO",
  },
]
