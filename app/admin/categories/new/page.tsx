"use client"

import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { createCategory } from "@/app/actions/admin"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import IconPicker from "@/components/icon-picker"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function NewCategoryPage() {
  const user = await getCurrentUser()

  if (!user || user.role !== "admin") {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mb-2">Add New Category</h1>
          <p className="text-muted-foreground">Create a new navigation category</p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Category Details</CardTitle>
            <CardDescription>Fill in the information for the new category</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createCategory} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Category name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Brief description of the category"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <IconPicker
                  onChange={(iconName) => {
                    const input = document.getElementById("icon") as HTMLInputElement
                    if (input) input.value = iconName
                  }}
                />
                <input type="hidden" id="icon" name="icon" required />
              </div>

              <div className="flex space-x-4">
                <Button type="submit">Create Category</Button>
                <Button variant="outline" asChild>
                  <Link href="/admin">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
