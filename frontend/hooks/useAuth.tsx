"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => void
  register: (name: string, email: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  register: () => {},
  logout: () => {},
})

const MOCK_USERS = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password123",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage", error)
      }
    }
  }, [])

  const login = (email: string, password: string) => {
    const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (!foundUser) {
      throw new Error("Invalid credentials")
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = foundUser

    setUser(userWithoutPassword)
    localStorage.setItem("user", JSON.stringify(userWithoutPassword))
  }

  const register = (name: string, email: string, password: string) => {
    if (MOCK_USERS.some((u) => u.email === email)) {
      throw new Error("User with this email already exists")
    }

    const newUser = {
      id: String(MOCK_USERS.length + 1),
      name,
      email,
      password,
    }

    MOCK_USERS.push(newUser)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser

    setUser(userWithoutPassword)
    localStorage.setItem("user", JSON.stringify(userWithoutPassword))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

