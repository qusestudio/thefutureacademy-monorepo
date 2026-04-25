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
        <View className="w-full gap-y-5 max-w-sm">
          <View className={"mt-4 w-full flex flex-col items-center mb-4"}>
            <Image
              src={"/logo-image.svg"}
              alt={"logo"}
              width={80}
              height={80}
              className="mb-4"
            />
            <Heading level={3} className="text-2xl capitalize font-semibold">
              The Future Academy
            </Heading>
            <p className="mt-2 text-foreground/90">
              Please sign in or sign up to continue.
            </p>
          </View>
          <Separator />
        </View>

      </div>
    )
  },

  SignIn: {
    Footer() {
      const { toSignUp } = useAuthenticator()
      return (
        <View className={"mt-4 text-center"}>
          <p className="text-foreground/90">
            Don&apos;t have an account?{" "}
            <button
              onClick={toSignUp}
              className="border-none bg-transparent p-0 font-medium text-[#1F329D] hover:underline"
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
import Image from "next/image"
import { Separator } from "@workspace/ui/components/separator"

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
