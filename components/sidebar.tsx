"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getIconComponent } from "@/lib/icons";
import { useEffect, useState } from "react";
import type { Category } from "@/lib/data";

export default function Sidebar() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // 动态获取分类数据
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

  return (
    <aside className="hidden md:block w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-4">
        <nav className="space-y-2">
          {categories.map((category) => {
            const isActive =
              pathname === `/${category.id}` ||
              (pathname === "/" && category.id === "code-snippets");
            const IconComponent = getIconComponent(category.icon);

            return (
              <Link
                key={category.id}
                href={`/${category.id}`}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <IconComponent
                  className={cn(
                    "h-4 w-4",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <span>{category.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
