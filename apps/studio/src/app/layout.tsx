import type { Metadata } from "next"
import { Geist, Geist_Mono, Raleway } from "next/font/google"
import "@workspace/ui/styles/globals.css"
import Providers from "@/app/providers"
import React from "react"
import { chillax } from "@/lib/fonts"


const raleway = Raleway({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "The Future Academy",
  description: "@thefutureacademy",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${chillax.variable}  flex w-full flex-col items-center ${geistMono.variable} ${raleway.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
