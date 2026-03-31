"use client"

import React, { useEffect } from "react"
import { signOut } from "aws-amplify/auth"

const Unauthorized = () => {
  useEffect(() => {
    const handleSignOut = async () => {
      await signOut();
    }
    handleSignOut().then()
  }, [])
  return (
    <div className="w-full font-chillax h-screen flex flex-col items-center justify-center">
      <h1 className="font-semibold uppercase text-xl">Unauthorized</h1>
    </div>
  )
}

export default Unauthorized
