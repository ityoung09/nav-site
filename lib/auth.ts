import { cookies } from "next/headers"

export interface User {
  id: string
  email: string
  name: string
  role: "admin"
}

// 管理员用户数据 - 生产环境中应该存储在数据库中
const users: User[] = [
  {
    id: "1",
    email: "admin",
    name: "管理员",
    role: "admin",
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
  // 简单的管理员认证 - 用户名admin，密码admin
  const user = users.find((u) => u.email === email)

  if (user && email === "admin" && password === "admin") {
    return user
  }

  return null
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("user")
}
