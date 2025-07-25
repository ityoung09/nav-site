"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { login as authLogin } from "@/lib/auth"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const user = await authLogin(email, password)

  if (user) {
    const cookieStore = await cookies()
    cookieStore.set("user", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 周
    })
    redirect("/")
  } else {
    // 登录失败时重定向到登录页面
    redirect("/login?error=invalid")
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("user")
  redirect("/login")
}
