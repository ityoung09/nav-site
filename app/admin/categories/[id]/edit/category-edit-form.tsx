"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { editCategory } from "@/app/actions/admin";
import type { Category } from "@/lib/data";

interface CategoryEditFormProps {
  category: Category;
}

export default function CategoryEditForm({ category }: CategoryEditFormProps) {
  const router = useRouter();
  const [selectedIcon, setSelectedIcon] = useState(category.icon);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      // 设置选中的图标
      formData.set("icon", selectedIcon);

      await editCategory(category.id, formData);
      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      console.error("更新分类失败:", error);
      alert("更新分类失败，请重试");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/admin/categories">
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回分类管理
        </Link>
      </Button>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>分类详情</CardTitle>
          <CardDescription>修改分类信息</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">分类名称</Label>
              <Input
                id="name"
                name="name"
                defaultValue={category.name}
                placeholder="分类名称"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">描述</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={category.description}
                placeholder="分类的简要描述"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>图标</Label>
              <IconPicker value={selectedIcon} onChange={setSelectedIcon} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="count">资源数量</Label>
              <Input
                id="count"
                name="count"
                type="number"
                defaultValue={category.count}
                placeholder="资源数量"
                min="0"
              />
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "更新中..." : "更新分类"}
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin/categories">取消</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
