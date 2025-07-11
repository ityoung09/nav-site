import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { codeSnippets } from "@/lib/data"

export default function CodeSnippetsPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Code Snippets</h1>
          <p className="text-muted-foreground mb-4">Ready-to-use code examples in various programming languages</p>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search snippets..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {codeSnippets.map((snippet) => (
            <Card key={snippet.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{snippet.title}</CardTitle>
                  <Badge variant="secondary">{snippet.language}</Badge>
                </div>
                <CardDescription>{snippet.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                  <code>{snippet.code}</code>
                </pre>
                <div className="flex flex-wrap gap-1 mt-3">
                  {snippet.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
