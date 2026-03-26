"use client"

import React, { useEffect } from "react"
import { fetchAuthSession } from "aws-amplify/auth"
import { useRouter } from "next/navigation"
import { useAuthenticator } from "@aws-amplify/ui-react"

const AdminGuard =  ({children} : {children: React.ReactNode}) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();
  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const session = await fetchAuthSession();
        const { idToken } = session.tokens ?? {}
        const userRole = idToken?.payload["custom:role"] as string
        const isAdmin = userRole === "admin"

        if (user && !isAdmin) {
          router.push("/unauthorized")
        }
      } catch (error) {
        console.error("Auth check failed", error)
      }
    }
    checkUserRole().then();
  }, [user])

  return <div>{children}</div>
}

export default AdminGuard
