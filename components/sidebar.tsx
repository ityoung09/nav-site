"use client"

import { Code, Book, Wrench, Users, Palette, Database, Globe, Zap, FileText, Layers } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const sidebarItems = [
  { id: "code-snippets", name: "Code Snippets", icon: Code, color: "text-blue-500" },
  { id: "documentation", name: "Documentation", icon: Book, color: "text-green-500" },
  { id: "tools", name: "Dev Tools", icon: Wrench, color: "text-orange-500" },
  { id: "ui-ux", name: "UI/UX", icon: Palette, color: "text-purple-500" },
  { id: "databases", name: "Databases", icon: Database, color: "text-red-500" },
  { id: "apis", name: "APIs", icon: Globe, color: "text-cyan-500" },
  { id: "performance", name: "Performance", icon: Zap, color: "text-yellow-500" },
  { id: "articles", name: "Articles", icon: FileText, color: "text-indigo-500" },
  { id: "frameworks", name: "Frameworks", icon: Layers, color: "text-pink-500" },
  { id: "community", name: "Community", icon: Users, color: "text-emerald-500" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-4">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === `/${item.id}` || (pathname === "/" && item.id === "code-snippets")
            return (
              <Link
                key={item.id}
                href={`/${item.id}`}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : item.color)} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
