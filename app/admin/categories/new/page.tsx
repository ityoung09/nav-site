"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { createCategory } from "@/app/actions/admin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import IconPicker from "@/components/icon-picker";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewCategoryPage() {
  const router = useRouter();
  const [selectedIcon, setSelectedIcon] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    if (!selectedIcon) {
      alert("请选择一个图标");
      return;
    }

    setIsSubmitting(true);
    try {
      // 设置选中的图标
      formData.set("icon", selectedIcon);

      await createCategory(formData);
      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      console.error("创建分类失败:", error);
      alert("创建分类失败，请重试");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/admin/categories">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回分类管理
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mb-2">添加新分类</h1>
          <p className="text-muted-foreground">创建一个新的导航分类</p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>分类详情</CardTitle>
            <CardDescription>填写新分类的信息</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">分类名称</Label>
                <Input id="name" name="name" placeholder="分类名称" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">描述</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="分类的简要描述"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>图标</Label>
                <IconPicker value={selectedIcon} onChange={setSelectedIcon} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="count">初始资源数量</Label>
                <Input
                  id="count"
                  name="count"
                  type="number"
                  defaultValue="0"
                  placeholder="初始资源数量"
                  min="0"
                />
              </div>

              <div className="flex space-x-4">
                <Button type="submit" disabled={isSubmitting || !selectedIcon}>
                  {isSubmitting ? "创建中..." : "创建分类"}
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/admin/categories">取消</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
