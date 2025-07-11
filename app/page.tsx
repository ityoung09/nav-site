import { Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ResourceCard from "@/components/resource-card";
import { featuredResources, categories } from "@/lib/data";
import { getIconComponent } from "@/lib/icons";

export default function HomePage() {
  return (
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* 主要介绍区域 */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            开发者资源中心
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            您的开发资源、工具和社区连接的综合平台
          </p>

          {/* 搜索栏 */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="搜索资源..." className="pl-10" />
          </div>
        </div>

        {/* 快速访问分类 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {categories.map((category) => {
            const IconComponent = getIconComponent(category.icon);
            return (
              <Link key={category.id} href={`/${category.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">{category.count} 个资源</Badge>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* 精选资源 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">精选资源</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>

        {/* 本周热门 */}
        <div>
          <h2 className="text-2xl font-bold mb-4">本周热门</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredResources.slice(0, 6).map((resource) => (
              <ResourceCard
                key={`popular-${resource.id}`}
                resource={resource}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
