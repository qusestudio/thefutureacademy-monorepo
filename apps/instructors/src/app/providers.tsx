"use client"

import React from "react"
import { ThemeProvider } from "@workspace/ui/providers/theme-provider"
import StoreProvider from "@/state/redux"
import { Toaster } from "sonner"
import { Authenticator } from "@aws-amplify/ui-react"
import Auth from "@/app/(auth)/Auth"
import InstructorGuard from "@/app/(auth)/InstructorGuard"


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <ThemeProvider>
        <Authenticator.Provider>
          <Auth>
            <InstructorGuard>
              {children}
              <Toaster richColors theme={"system"} position={"bottom-right"} />
            </InstructorGuard>
          </Auth>
        </Authenticator.Provider>
      </ThemeProvider>
    </StoreProvider>
  )
}

export default Providers
