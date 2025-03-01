import type React from "react"
import type { Metadata } from "next"
import { Jua } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ThemeToggle from "@/components/theme-toggle"

const jua = Jua({ subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
  title: "To-Do List",
  description: "A simple to-do list application",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={jua.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'