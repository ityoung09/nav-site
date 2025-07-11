"use client";

import { Github, Moon, Sun, User, Crown, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MobileSidebar from "./mobile-sidebar";
import { logoutAction } from "@/app/actions/auth";
import type { User as UserType } from "@/lib/auth";

interface HeaderProps {
  user?: UserType | null;
}

export default function Header({ user }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-4 md:space-x-6">
          <MobileSidebar />

          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">开发</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">
              开发者导航
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              首页
            </Link>
            <Link
              href="/code-snippets"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              代码片段
            </Link>
            <Link
              href="/documentation"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              文档资料
            </Link>
            <Link
              href="/tools"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              开发工具
            </Link>
            <Link
              href="/community"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              社区论坛
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hidden sm:flex"
          >
            <Link href="https://github.com" target="_blank">
              <Github className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 bg-transparent"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:block">{user.name}</span>
                  {user.role === "admin" && (
                    <Crown className="h-3 w-3 text-yellow-500" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">个人资料</Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">管理面板</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form action={logoutAction}>
                    <button
                      type="submit"
                      className="flex items-center space-x-2 w-full"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>退出登录</span>
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">
                <User className="h-4 w-4 mr-2" />
                <span className="hidden sm:block">登录</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
