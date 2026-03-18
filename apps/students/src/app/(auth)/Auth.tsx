"use client"

import { Amplify } from "aws-amplify"
import {
  Authenticator,
  Heading,
  View,
  useAuthenticator,
  RadioGroupField,
  Radio,
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

  SignIn: {
    Footer() {
      const { toSignUp } = useAuthenticator()
      return (
        <View className={"mt-4 text-center"}>
          <p className="text-muted-foreground">
            Don&apos;t have an account?{" "}
            <button
              onClick={toSignUp}
              className="border-none bg-transparent p-0 font-medium text-primary hover:underline"
            >
              Sign up here
            </button>
          </p>
        </View>
      )
    },
  },
  SignUp: {
    FormFields() {
      const { validationErrors } = useAuthenticator()
      return (
        <div className="flex w-full justify-center">
          <View className="w-full max-w-sm">
            <Authenticator.SignUp.FormFields />
            <RadioGroupField
              name="custom:role"
              legend={""}
              defaultValue={"student"}
              errorMessage={validationErrors?.["custom:role"]}
              hasError={!!validationErrors?.["custom:role"]}
              className=""
            >
              <div className="hidden items-start text-sm">
                <Radio
                  value="student"
                  className="flex flex-row-reverse gap-x-2"
                >
                  Student
                </Radio>
              </div>
            </RadioGroupField>
          </View>
        </div>
      )
    },
    Footer() {
      const { toSignIn } = useAuthenticator()
      return (
        <div className="flex w-full font-chillax justify-center">
          <View className="w-full max-w-sm">
            <View className={"mt-4 text-center"}>
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <button
                  onClick={toSignIn}
                  className="border-none bg-transparent p-0 font-medium text-primary hover:underline"
                >
                  Sign in here
                </button>
              </p>
            </View>
          </View>
        </div>
      )
    },
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
  signUp: {
    username: {
      order: 1,
      placeholder: "Choose a username",
      label: "Username",
      isRequired: true,
    },
    email: {
      order: 2,
      placeholder: "Enter your email address",
      label: "Email",
      isRequired: true,
    },
    password: {
      order: 3,
      placeholder: "Create a password",
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
  }, [router, user, isAuthPage]);

  return (
    <div className="h-full w-full">
      <Authenticator
        components={components}
        formFields={formFields}
        initialState={pathname.includes("signup") ? "signUp" : "signIn"}
      >
        {() => <>{children}</>}
      </Authenticator>
    </div>
  )
}

export default Auth
