import { cookies } from "next/headers"

export interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
}

// Mock user data - in production, this would be in a database
const users: User[] = [
  {
    id: "1",
    email: "admin@devhub.com",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "user@devhub.com",
    name: "Regular User",
    role: "user",
  },
]

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const userCookie = cookieStore.get("user")

  if (!userCookie) {
    return null
  }

  try {
    const userData = JSON.parse(userCookie.value)
    return users.find((user) => user.id === userData.id) || null
  } catch {
    return null
  }
}

export async function login(email: string, password: string): Promise<User | null> {
  // Mock authentication - in production, verify against database
  const user = users.find((u) => u.email === email)

  if (user && password === "password") {
    return user
  }

  return null
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("user")
}
