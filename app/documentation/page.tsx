import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import ResourceCard from "@/components/resource-card"
import { documentationResources } from "@/lib/data"

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Documentation</h1>
              <p className="text-muted-foreground mb-4">
                Official documentation for programming languages, frameworks, and libraries
              </p>

              <div className="flex space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Search documentation..." className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documentationResources.map((doc) => (
                <ResourceCard key={doc.id} resource={doc} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
