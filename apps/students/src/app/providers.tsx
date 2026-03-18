"use client"

import React from "react"
import { ThemeProvider } from "@workspace/ui/providers/theme-provider"
import { Authenticator } from "@aws-amplify/ui-react"
import Auth from "@/app/(auth)/Auth"
import { Toaster } from "sonner"
import StoreProvider from "@/state/redux"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <ThemeProvider>
        <Authenticator.Provider>
          <Auth>
            {children}
            <Toaster richColors theme={"system"} position={"bottom-right"} />
          </Auth>
        </Authenticator.Provider>
      </ThemeProvider>
    </StoreProvider>
  )
}

export default Providers
