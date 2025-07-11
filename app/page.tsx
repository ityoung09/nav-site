import { Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import ResourceCard from "@/components/resource-card"
import { featuredResources, categories } from "@/lib/data"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">Developer Navigation Hub</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Your one-stop destination for development resources, tools, and community links
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search resources..." className="pl-10" />
              </div>
            </div>

            {/* Quick Access Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {categories.map((category) => (
                <Link key={category.id} href={`/${category.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-2">
                        <category.icon className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                      </div>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary">{category.count} resources</Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Featured Resources */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Featured Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </div>

            {/* Popular Tools */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Popular This Week</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredResources.slice(0, 6).map((resource) => (
                  <ResourceCard key={`popular-${resource.id}`} resource={resource} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
