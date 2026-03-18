"use client"

import React from "react"
import { ThemeProvider } from "@workspace/ui/providers/theme-provider"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (

      <ThemeProvider>{children}</ThemeProvider>
  )
}

export default Providers
