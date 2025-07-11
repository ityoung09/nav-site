"use server"

import { getCurrentUser } from "@/lib/auth"
import {
  addCategory,
  updateCategory,
  deleteCategory,
  addResource,
  updateResource,
  deleteResource,
  addCodeSnippet,
  updateCodeSnippet,
  deleteCodeSnippet,
} from "@/lib/data"
import { revalidatePath } from "next/cache"

async function requireAdmin() {
  const user = await getCurrentUser()
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized")
  }
  return user
}

// Category actions
export async function createCategory(formData: FormData) {
  await requireAdmin()

  const category = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    icon: formData.get("icon") as string,
    count: 0,
  }

  addCategory(category)
  revalidatePath("/")
  revalidatePath("/admin")
}

export async function editCategory(id: string, formData: FormData) {
  await requireAdmin()

  const updates = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    icon: formData.get("icon") as string,
  }

  updateCategory(id, updates)
  revalidatePath("/")
  revalidatePath("/admin")
}

export async function removeCategory(id: string) {
  await requireAdmin()

  deleteCategory(id)
  revalidatePath("/")
  revalidatePath("/admin")
}

// Resource actions
export async function createResource(type: "featured" | "tools" | "documentation" | "community", formData: FormData) {
  await requireAdmin()

  const resource = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    url: formData.get("url") as string,
    category: formData.get("category") as string,
    tags: (formData.get("tags") as string).split(",").map((tag) => tag.trim()),
    featured: formData.get("featured") === "on",
    icon: formData.get("icon") as string,
  }

  addResource(resource, type)
  revalidatePath("/")
  revalidatePath("/admin")
}

export async function editResource(
  id: string,
  type: "featured" | "tools" | "documentation" | "community",
  formData: FormData,
) {
  await requireAdmin()

  const updates = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    url: formData.get("url") as string,
    category: formData.get("category") as string,
    tags: (formData.get("tags") as string).split(",").map((tag) => tag.trim()),
    featured: formData.get("featured") === "on",
    icon: formData.get("icon") as string,
  }

  updateResource(id, updates, type)
  revalidatePath("/")
  revalidatePath("/admin")
}

export async function removeResource(id: string, type: "featured" | "tools" | "documentation" | "community") {
  await requireAdmin()

  deleteResource(id, type)
  revalidatePath("/")
  revalidatePath("/admin")
}

// Code snippet actions
export async function createCodeSnippet(formData: FormData) {
  await requireAdmin()

  const snippet = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    language: formData.get("language") as string,
    code: formData.get("code") as string,
    tags: (formData.get("tags") as string).split(",").map((tag) => tag.trim()),
  }

  addCodeSnippet(snippet)
  revalidatePath("/code-snippets")
  revalidatePath("/admin")
}

export async function editCodeSnippet(id: string, formData: FormData) {
  await requireAdmin()

  const updates = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    language: formData.get("language") as string,
    code: formData.get("code") as string,
    tags: (formData.get("tags") as string).split(",").map((tag) => tag.trim()),
  }

  updateCodeSnippet(id, updates)
  revalidatePath("/code-snippets")
  revalidatePath("/admin")
}

export async function removeCodeSnippet(id: string) {
  await requireAdmin()

  deleteCodeSnippet(id)
  revalidatePath("/code-snippets")
  revalidatePath("/admin")
}
