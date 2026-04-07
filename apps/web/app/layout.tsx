import { Geist_Mono, Raleway } from "next/font/google"

import "@workspace/ui/globals.css"
import { cn } from "@workspace/ui/lib/utils";
import { ThemeProvider } from "@workspace/ui/providers/theme-provider"
import React from "react"
import { archivo, chillax } from "@thefutureacademy/students/src/lib/fonts"


const raleway = Raleway({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, chillax.variable,  `font-sans ${archivo.variable}`, raleway.variable)}
    >
      <body>
        <ThemeProvider>

          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
