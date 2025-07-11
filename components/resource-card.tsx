import { ExternalLink, Star } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Resource {
  id: string
  name: string
  description: string
  url: string
  category: string
  tags: string[]
  featured?: boolean
  icon?: string
}

interface ResourceCardProps {
  resource: Resource
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {resource.icon && (
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-bold">{resource.icon}</span>
              </div>
            )}
            <div>
              <CardTitle className="text-lg">{resource.name}</CardTitle>
              <Badge variant="secondary" className="text-xs mt-1">
                {resource.category}
              </Badge>
            </div>
          </div>
          {resource.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
        </div>
        <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {resource.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href={resource.url} target="_blank">
                <ExternalLink className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
