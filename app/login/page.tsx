import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { loginAction } from "@/app/actions/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default async function LoginPage() {
  const user = await getCurrentUser()

  if (user) {
    redirect("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-lg">DH</span>
          </div>
          <CardTitle className="text-2xl">Welcome to DevHub</CardTitle>
          <CardDescription>Sign in to access your developer resources</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="admin@devhub.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="password" required />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Demo Credentials:</p>
            <div className="text-xs space-y-1">
              <div>
                <strong>Admin:</strong> admin@devhub.com / password
              </div>
              <div>
                <strong>User:</strong> user@devhub.com / password
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
