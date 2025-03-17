import type React from "react"
import { CartProvider } from "@/hooks/useCart"
import { WishlistProvider } from "@/hooks/useWishlist"
import { AuthProvider } from "@/hooks/useAuth"
import { ThemeProvider } from "next-themes"
import "@/app/globals.css"

export const metadata = {
  title: "MyShop - Ecommerce Store",
  description: "A simple ecommerce store with cart and wishlist functionality",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>{children}</WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

