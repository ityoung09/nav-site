import { redirect, notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getCategoryById } from "@/lib/server-data";
import CategoryEditForm from "./category-edit-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: PageProps) {
  const user = await getCurrentUser();
  const { id } = await params;

  if (!user || user.role !== "admin") {
    redirect("/login");
  }

  const category = getCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">编辑分类</h1>
          <p className="text-muted-foreground">修改分类信息</p>
        </div>

        <CategoryEditForm category={category} />
      </div>
    </div>
  );
}
