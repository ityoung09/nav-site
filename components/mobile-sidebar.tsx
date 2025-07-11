"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { getIconComponent } from "@/lib/icons"
import { categories } from "@/lib/data"

export default function MobileSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const sidebarItems = [
    ...categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      icon: cat.icon,
      color: "text-primary",
    })),
    { id: "ui-ux", name: "UI/UX", icon: "Palette", color: "text-purple-500" },
    { id: "databases", name: "Databases", icon: "Database", color: "text-red-500" },
    { id: "apis", name: "APIs", icon: "Globe", color: "text-cyan-500" },
    { id: "performance", name: "Performance", icon: "Zap", color: "text-yellow-500" },
    { id: "articles", name: "Articles", icon: "FileText", color: "text-indigo-500" },
    { id: "frameworks", name: "Frameworks", icon: "Layers", color: "text-pink-500" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-semibold">Navigation</span>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === `/${item.id}` || (pathname === "/" && item.id === "code-snippets")
            const IconComponent = getIconComponent(item.icon)

            return (
              <Link
                key={item.id}
                href={`/${item.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                <IconComponent className={cn("h-4 w-4", isActive ? "text-primary" : item.color)} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
