"use client"

import { Amplify } from "aws-amplify"
import {
  Authenticator,
  Heading,
  View,
  useAuthenticator,
} from "@aws-amplify/ui-react"

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId:
        process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
})

const components = {
  Header() {
    return (
      <div className="flex w-full justify-center">
        <View className="w-full max-w-sm">
          <View className={"mt-4 mb-7"}>
            <Heading level={3} className="text-2xl uppercase font-bold">
              The Future Academy
            </Heading>
            <p className="mt-2 text-muted-foreground">
              <span className="font-bold">Welcome!</span> Please sign in to
              continue
            </p>
          </View>
        </View>
      </div>
    )
  },
}
const formFields = {
  signIn: {
    username: {
      placeholder: "Enter your email",
      label: "Email",
      isRequired: true,
    },
    password: {
      placeholder: "Enter your password",
      label: "Password",
      isRequired: true,
    },
  },
}

import React, { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

const Auth = ({children}: {children: React.ReactNode}) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname.match(/^\/(signin|signup)$/);

  useEffect(() => {
    if (user && isAuthPage) {
      router.push("/");
    }
    // if (!user && !isAuthPage) {
    //   router.push("/signin")
    // }
  }, [router, user, isAuthPage]);

  return (
    <div className="h-full w-full">
      <Authenticator
        components={components}
        formFields={formFields}
        initialState={"signIn"}
      >
        {() => <>{children}</>}
      </Authenticator>
    </div>
  )
}

export default Auth
